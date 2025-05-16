'use client';

import { useEffect, useState } from 'react';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplCore } from '@metaplex-foundation/mpl-core';
import { mplTokenMetadata, fetchAllDigitalAssetWithTokenByOwner } from '@metaplex-foundation/mpl-token-metadata';
import { publicKey } from '@metaplex-foundation/umi';
import { web3JsEddsa } from '@metaplex-foundation/umi-eddsa-web3js';
import { dasApi } from '@metaplex-foundation/digital-asset-standard-api';

interface UserStatsProps {
  publicKey: string;
}

export function UserStats({ publicKey: walletPublicKey }: UserStatsProps) {
  const [stats, setStats] = useState({
    totalNFTs: 0,
    totalValue: 0,
    lastMinted: null as Date | null,
  });

  useEffect(() => {
    // Listen for NFT count updates from UserNFTGrid
    const handleNFTCountUpdate = (event: CustomEvent<{ count: number }>) => {
      setStats(prev => ({
        ...prev,
        totalNFTs: event.detail.count,
      }));
    };

    window.addEventListener('nftCountUpdate', handleNFTCountUpdate as EventListener);

    return () => {
      window.removeEventListener('nftCountUpdate', handleNFTCountUpdate as EventListener);
    };
  }, []);

  useEffect(() => {
    async function fetchStats() {
      try {
        console.log('Starting stats fetch for wallet:', walletPublicKey);
        
        // Create UMI instance with enhanced configuration
        const umi = createUmi('https://api.devnet.solana.com')
          .use(web3JsEddsa())
          .use(mplCore())
          .use(mplTokenMetadata())
          .use(dasApi());
        
        console.log('UMI initialized with DAS API, attempting to fetch digital assets...');

        // Get all NFTs owned by the wallet using fetchAllDigitalAssetWithTokenByOwner
        const assets = await fetchAllDigitalAssetWithTokenByOwner(
          umi,
          publicKey(walletPublicKey)
        );

        console.log('Digital assets fetch result:', assets);
        
        setStats(prev => ({
          ...prev,
          totalNFTs: assets.length,
          lastMinted: assets.length > 0 ? new Date() : null,
        }));

        console.log('Stats updated:', {
          totalNFTs: assets.length,
          lastMinted: assets.length > 0 ? new Date() : null
        });

      } catch (err) {
        console.error('Error in main stats fetch process:', err);
        if (err instanceof Error) {
          console.error('Error details:', {
            message: err.message,
            stack: err.stack,
            name: err.name
          });
        }
      }
    }

    if (walletPublicKey) {
      console.log('Wallet public key detected, initiating stats fetch...');
      fetchStats();
    } else {
      console.log('No wallet public key provided, skipping stats fetch');
    }
  }, [walletPublicKey]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-[2px] border border-black shadow-[2px_-2px_0px_0px_#000000] p-6">
        <h3 className="text-sm font-medium text-gray-500">Total NFTs</h3>
        <p className="mt-2 text-3xl font-heading">{stats.totalNFTs}</p>
      </div>

      <div className="bg-white rounded-[2px] border border-black shadow-[2px_-2px_0px_0px_#000000] p-6">
        <h3 className="text-sm font-medium text-gray-500">Wallet Address</h3>
        <p className="mt-2 text-sm font-mono break-all">{walletPublicKey}</p>
      </div>

      <div className="bg-white rounded-[2px] border border-black shadow-[2px_-2px_0px_0px_#000000] p-6">
        <h3 className="text-sm font-medium text-gray-500">Last Minted</h3>
        <p className="mt-2 text-lg">
          {stats.lastMinted
            ? stats.lastMinted.toLocaleDateString()
            : 'No NFTs minted yet'}
        </p>
      </div>
    </div>
  );
} 