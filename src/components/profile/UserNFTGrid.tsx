'use client';

import { useEffect, useState } from 'react';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { dasApi } from '@metaplex-foundation/digital-asset-standard-api';
import type { DasApiAsset, GetAssetsByOwnerOutput } from '@metaplex-foundation/digital-asset-standard-api';
import { publicKey } from '@metaplex-foundation/umi';
import Image from 'next/image';
import { Loader2, RefreshCw } from 'lucide-react';
import { LikeButton } from '@/components/LikeButton';

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes?: Array<{
    trait_type: string;
    value: string;
  }>;
}

interface UserNFTGridProps {
  publicKey: string;
}

interface NFTDisplay {
  metadata: NFTMetadata;
  address: string;
}

// Cache keys
const CACHE_KEY_PREFIX = 'nft_cache_';
const CACHE_EXPIRY_KEY_PREFIX = 'nft_cache_expiry_';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function UserNFTGrid({ publicKey: walletPublicKey }: UserNFTGridProps) {
  const [nfts, setNfts] = useState<NFTDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const cacheKey = `${CACHE_KEY_PREFIX}${walletPublicKey}`;
  const cacheExpiryKey = `${CACHE_EXPIRY_KEY_PREFIX}${walletPublicKey}`;

  const fetchNFTs = async (bypassCache = false) => {
    try {
      setError(null);
      if (!bypassCache) {
        // Check cache first
        const cachedData = localStorage.getItem(cacheKey);
        const cacheExpiry = localStorage.getItem(cacheExpiryKey);
        
        if (cachedData && cacheExpiry) {
          const expiryTime = parseInt(cacheExpiry);
          if (Date.now() < expiryTime) {
            const parsedData = JSON.parse(cachedData);
            setNfts(parsedData);
            setLoading(false);
            // Dispatch event for NFT count update
            window.dispatchEvent(new CustomEvent('nftCountUpdate', { 
              detail: { count: parsedData.length } 
            }));
            return;
          }
        }
      }

      // If no cache or bypass cache, fetch from network
      setLoading(true);
      console.log('Starting NFT fetch for wallet:', walletPublicKey);

      const umi = createUmi('https://api.devnet.solana.com').use(dasApi());
      console.log('UMI initialized with DAS API, attempting to fetch NFTs...');

      const assets = (await umi.rpc.getAssetsByOwner({
        owner: publicKey(walletPublicKey),
        limit: 10,
      })) as GetAssetsByOwnerOutput;

      console.log('Raw assets fetched:', assets);

      const nftPromises = assets.items.map(async (asset: DasApiAsset) => {
        try {
          if (!asset.content?.json_uri) {
            console.log('No metadata URI found for asset:', asset);
            return null;
          }

          console.log('Fetching metadata from URI:', asset.content.json_uri);
          const response = await fetch(asset.content.json_uri);
          if (!response.ok) {
            console.error('Failed to fetch metadata:', response.status, response.statusText);
            return null;
          }
          const metadata = await response.json() as NFTMetadata;
          console.log('Successfully fetched metadata for NFT:', metadata);
          return {
            metadata,
            address: asset.id,
          } as NFTDisplay;
        } catch (err) {
          console.error('Error fetching NFT metadata for asset:', asset.id, err);
          return null;
        }
      });

      const nftResults = await Promise.all(nftPromises);
      const validNfts = nftResults.filter((nft): nft is NFTDisplay => nft !== null);
      
      // Update cache
      localStorage.setItem(cacheKey, JSON.stringify(validNfts));
      localStorage.setItem(cacheExpiryKey, (Date.now() + CACHE_DURATION).toString());
      
      setNfts(validNfts);
      
      // Dispatch event for NFT count update
      window.dispatchEvent(new CustomEvent('nftCountUpdate', { 
        detail: { count: validNfts.length } 
      }));

    } catch (err) {
      console.error('Error in main NFT fetch process:', err);
      if (err instanceof Error) {
        console.error('Error details:', {
          message: err.message,
          stack: err.stack,
          name: err.name
        });
      }
      setError('Failed to load NFTs. Please try again later.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (walletPublicKey) {
      console.log('Wallet public key detected, initiating NFT fetch...');
      fetchNFTs();
    } else {
      console.log('No wallet public key provided, skipping NFT fetch');
    }
  }, [walletPublicKey]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchNFTs(true); // Bypass cache on manual refresh
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        {error}
      </div>
    );
  }

  if (nfts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No NFTs found. Start creating your comic NFTs!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2A9D8F]"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {nfts.map((nft) => (
          <div
            key={nft.address}
            className="bg-white rounded-[2px] border border-black shadow-[2px_-2px_0px_0px_#000000] overflow-hidden"
          >
            {/* NFT Image */}
            <div className="aspect-square relative">
              <Image
                src={nft.metadata.image}
                alt={nft.metadata.name}
                fill
                className="object-cover"
              />
            </div>

            {/* NFT Details */}
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-lg font-heading font-medium">{nft.metadata.name}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{nft.metadata.description}</p>
              </div>

              {/* Attributes */}
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {nft.metadata.attributes?.map((attr, index) => (
                    <span
                      key={`${attr.trait_type}-${index}`}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800"
                    >
                      {attr.trait_type}: {attr.value}
                    </span>
                  ))}
                </div>
              </div>

              {/* View Links and Like Button */}
              <div className="pt-4 flex justify-between items-center">
                <div className="flex gap-4">
                  <a
                    href={`https://explorer.solana.com/address/${nft.address}?cluster=devnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#2A9D8F] hover:underline"
                  >
                    View on Explorer
                  </a>
                  <a
                    href={`https://core.metaplex.com/explorer/${nft.address}?env=devnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#2A9D8F] hover:underline"
                  >
                    View on Metaplex
                  </a>
                </div>
                <LikeButton nftAddress={nft.address} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 