'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { LikeButton } from '@/components/LikeButton';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar } from '@/components/ui/avatar';
import { CommentForm } from '@/components/comic/CommentForm';
import type { ComicWithStats } from '@/types/comics';

interface Comment {
  id: string;
  user_address: string;
  content: string;
  created_at: string;
  username: string;
}

interface PageProps {
  params: {
    nftAddress: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

function CommentSkeleton() {
  return (
    <div className="flex gap-4 mb-6">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}

export default async function ComicPage({ params, searchParams }: PageProps) {
  const nftAddress = params.nftAddress;
  
  // Initial data fetch
  const [comicData, likesCount, commentsData, relatedComicsData] = await Promise.all([
    // Fetch comic details
    supabase
      .from('comics')
      .select('*')
      .eq('nft_address', nftAddress)
      .single(),
    
    // Fetch like count
    supabase
      .from('likes')
      .select('*', { count: 'exact' })
      .eq('nft_address', nftAddress),
    
    // Fetch comments
    supabase
      .from('comments')
      .select('*')
      .eq('nft_address', nftAddress)
      .order('created_at', { ascending: false }),
    
    // Fetch related comics (we'll get the creator_address from comicData)
    supabase
      .from('comics')
      .select('*')
      .neq('nft_address', nftAddress)
      .limit(3)
  ]);

  if (comicData.error) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Comic Not Found</h2>
          <p className="text-gray-600 mb-4">The comic you're looking for doesn't exist.</p>
          <Link href="/" className="text-blue-500 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const comic: ComicWithStats = {
    ...comicData.data,
    likes: likesCount.count || 0,
    comments: commentsData.data?.length || 0
  };

  // Filter related comics to only show ones from the same creator
  const relatedComics = relatedComicsData.data?.filter(
    (c) => c.creator_address === comic.creator_address
  ) || [];

  // Get like counts for related comics
  const relatedComicsWithStats = await Promise.all(
    relatedComics.map(async (relatedComic) => {
      const [{ count: likeCount }, { count: commentCount }] = await Promise.all([
        supabase
          .from('likes')
          .select('*', { count: 'exact' })
          .eq('nft_address', relatedComic.nft_address),
        supabase
          .from('comments')
          .select('*', { count: 'exact' })
          .eq('nft_address', relatedComic.nft_address)
      ]);

      return {
        ...relatedComic,
        likes: likeCount || 0,
        comments: commentCount || 0
      } as ComicWithStats;
    })
  );

  return (
    <div className="container mx-auto py-8">
      {/* Comic Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="relative aspect-video">
          <Image
            src={comic.image_url}
            alt={comic.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{comic.title}</h1>
          <p className="text-gray-600 mb-6">{comic.description}</p>
          
          <div className="flex items-center gap-8 mb-6">
            <div className="flex items-center gap-2">
              <LikeButton nftAddress={comic.nft_address} />
              <span>{comic.likes} likes</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{comic.comments} comments</span>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Creator</h3>
            <p className="text-sm text-gray-600">{comic.creator_address}</p>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Comments</h2>
        
        {/* Comment Form */}
        <CommentForm nftAddress={nftAddress} />

        {/* Comments List */}
        <div className="space-y-6">
          {commentsData.data?.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No comments yet. Be the first to comment!</p>
          ) : (
            commentsData.data?.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <Avatar>
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                </Avatar>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{comment.username}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600">{comment.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Related Comics */}
      {relatedComicsWithStats.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">More Comics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedComicsWithStats.map((comic) => (
              <Link key={comic.nft_address} href={`/comic/${comic.nft_address}`} className="block group">
                <div className="relative aspect-video mb-4">
                  <Image
                    src={comic.image_url}
                    alt={comic.title}
                    fill
                    className="object-cover rounded-lg transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="font-semibold mb-2">{comic.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{comic.likes} likes</span>
                  <span>{comic.comments} comments</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 