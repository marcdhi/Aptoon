'use client';

import { useCallback, useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { supabase } from '@/lib/supabase';
import { LikeStatus } from '@/types/likes';
import { toast } from 'sonner';

export const useLikes = (nftAddress: string) => {
  const { publicKey, signMessage } = useWallet();
  const [likeStatus, setLikeStatus] = useState<LikeStatus>({ hasLiked: false, count: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const fetchLikeStatus = useCallback(async () => {
    try {
      // Get total likes count
      const { count } = await supabase
        .from('likes')
        .select('*', { count: 'exact' })
        .eq('nft_address', nftAddress);

      // Check if current user has liked
      if (publicKey) {
        const { data } = await supabase
          .from('likes')
          .select()
          .eq('nft_address', nftAddress)
          .eq('liker_address', publicKey.toBase58())
          .single();

        setLikeStatus({
          hasLiked: !!data,
          count: count || 0,
        });
      } else {
        setLikeStatus({
          hasLiked: false,
          count: count || 0,
        });
      }
    } catch (error) {
      console.error('Error fetching like status:', error);
      toast.error('Failed to fetch like status');
    }
  }, [nftAddress, publicKey]);

  const toggleLike = async () => {
    if (!publicKey || !signMessage) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    try {
      // Create message to sign
      const message = new TextEncoder().encode(
        `Like NFT: ${nftAddress}\nTimestamp: ${Date.now()}`,
      );

      // Sign the message
      const signature = await signMessage(message);
      const signatureString = Buffer.from(signature).toString('base64');

      if (likeStatus.hasLiked) {
        // Unlike
        await supabase
          .from('likes')
          .delete()
          .eq('nft_address', nftAddress)
          .eq('liker_address', publicKey.toBase58());
      } else {
        // Like
        await supabase.from('likes').insert({
          nft_address: nftAddress,
          liker_address: publicKey.toBase58(),
          signature: signatureString,
        });
      }

      // Refresh like status
      await fetchLikeStatus();
      toast.success(likeStatus.hasLiked ? 'NFT unliked' : 'NFT liked');
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to update like status');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLikeStatus();
  }, [fetchLikeStatus]);

  return {
    likeStatus,
    isLoading,
    toggleLike,
    refreshLikes: fetchLikeStatus,
  };
}; 