import { create, mplCore } from '@metaplex-foundation/mpl-core';
import { generateSigner } from '@metaplex-foundation/umi';
import type { createGenericFile, sol } from '@metaplex-foundation/umi';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { base58 } from '@metaplex-foundation/umi/serializers';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import type { WalletContextState } from '@solana/wallet-adapter-react';
import { WebIrys } from '@irys/sdk';
import { supabase } from '@/lib/supabase';

interface MintNFTResult {
  signature: string;
  nftAddress: string;
  explorerUrl: string;
  metaplexUrl: string;
}

async function fetchImageAsBase64(url: string): Promise<{ data: string; contentType: string }> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result as string;
      resolve({
        data: base64data.split(',')[1], // Remove the data URL prefix
        contentType: blob.type || 'image/png'
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function mintComicNFT(
  wallet: WalletContextState,
  imageUrl: string,
  title: string,
  description: string,
  attributes: { trait_type: string; value: string }[]
): Promise<MintNFTResult> {
  // Initialize Umi with wallet adapter
  const umi = createUmi('https://api.devnet.solana.com')
    .use(mplCore())
    .use(walletAdapterIdentity(wallet));

  // Initialize WebIrys
  const webIrys = new WebIrys({
    url: 'https://devnet.irys.xyz',
    token: 'solana',
    wallet: {
      rpcUrl: 'https://api.devnet.solana.com',
      name: 'solana',
      provider: wallet,
    },
  });

  // Connect to Irys
  await webIrys.ready();

  // First, upload the image to Irys if it's not already on Irys/Arweave
  console.log('Uploading image...');
  let finalImageUrl = imageUrl;
  if (!imageUrl.includes('arweave.net') && !imageUrl.includes('irys.xyz')) {
    try {
      // Fetch and convert image to base64
      const { data: base64Data, contentType } = await fetchImageAsBase64(imageUrl);
      
      // Upload to Irys
      const imageTransaction = await webIrys.upload(base64Data, {
        tags: [{ name: 'Content-Type', value: contentType }],
      });
      
      // Use the Irys gateway URL for better compatibility
      finalImageUrl = `https://gateway.irys.xyz/${imageTransaction.id}`;
    } catch (error) {
      console.warn('Failed to upload image to Irys, using original URL:', error);
    }
  }

  // Prepare metadata
  const metadata = {
    name: title,
    description: description,
    image: finalImageUrl,
    attributes: attributes,
    properties: {
      files: [
        {
          uri: finalImageUrl,
          type: 'image/png', // Using png as it's more commonly used for NFTs
        },
      ],
      category: 'image',
    },
  };

  // Upload metadata to Arweave using WebIrys
  console.log('Uploading metadata...');
  const metadataTransaction = await webIrys.upload(JSON.stringify(metadata), {
    tags: [{ name: 'Content-Type', value: 'application/json' }],
  });
  
  // Use the Irys gateway URL for the metadata as well
  const metadataUri = `https://gateway.irys.xyz/${metadataTransaction.id}`;

  // Generate a signer for the NFT
  const asset = generateSigner(umi);

  // Create the NFT
  console.log('Creating NFT...');
  const tx = await create(umi, {
    asset,
    name: title,
    uri: metadataUri,
  }).sendAndConfirm(umi);

  // Get the transaction signature
  const signature = base58.deserialize(tx.signature)[0];

  // Store comic data in Supabase
  try {
    await supabase.from('comics').insert({
      nft_address: asset.publicKey.toString(),
      title,
      description,
      image_url: finalImageUrl,
      creator_address: wallet.publicKey?.toString() || '',
      metadata: {
        attributes,
        metadataUri
      }
    });
  } catch (error) {
    console.error('Failed to store comic data in Supabase:', error);
    // Don't throw error here as NFT is already minted
  }

  return {
    signature,
    nftAddress: asset.publicKey.toString(),
    explorerUrl: `https://explorer.solana.com/tx/${signature}?cluster=devnet`,
    metaplexUrl: `https://core.metaplex.com/explorer/${asset.publicKey}?env=devnet`,
  };
} 