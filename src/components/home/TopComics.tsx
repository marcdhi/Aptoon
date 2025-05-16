'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trophy } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { ComicWithStats } from "@/types/comics";
import { Skeleton } from "../ui/skeleton";
import { LikeButton } from "../LikeButton";

function TopComicCard({ rank, nft_address, title, image_url, likes = 0 }: ComicWithStats & { rank: number }) {
  return (
    <Link href={`/comic/${nft_address}`} className="block comic-card group">
      <div className="relative">
        {/* Rank Badge */}
        <div className="absolute top-2 left-2 z-10 bg-black/80 text-white px-3 py-1 rounded-full flex items-center gap-2">
          <Trophy className="w-4 h-4" />
          <span>#{rank}</span>
        </div>
        
        <div className="image-container">
          <Image
            src={image_url}
            alt={title}
            width={300}
            height={200}
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        
        <div className="p-4 bg-white border-t border-gray-200">
          <h3 className="font-heading text-lg mb-2 truncate">{title}</h3>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{likes} likes</span>
            <LikeButton nftAddress={nft_address} className="!p-0" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function TopComicSkeleton() {
  return (
    <div className="block comic-card">
      <div className="relative">
        <Skeleton className="w-full h-[200px]" />
        <div className="p-4">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    </div>
  );
}

export function TopComics() {
  const [comics, setComics] = useState<ComicWithStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopComics() {
      try {
        // First, get all comics
        const { data: comicsData, error: comicsError } = await supabase
          .from('comics')
          .select('*');

        if (comicsError) throw comicsError;

        // For each comic, get its like count
        const comicsWithLikes = await Promise.all(
          (comicsData || []).map(async (comic) => {
            const { count } = await supabase
              .from('likes')
              .select('*', { count: 'exact' })
              .eq('nft_address', comic.nft_address);

            return {
              ...comic,
              likes: count || 0,
              comments: 0 // TODO: Implement comments
            } as ComicWithStats;
          })
        );

        // Sort by likes in descending order and take top 5
        const topComics = comicsWithLikes
          .sort((a, b) => b.likes - a.likes)
          .slice(0, 5);

        setComics(topComics);
      } catch (error) {
        console.error('Error fetching top comics:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTopComics();
  }, []);

  if (loading) {
    return (
      <section className="mb-12">
        <h2 className="section-title mb-6">TOP COMICS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <TopComicSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (comics.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <h2 className="section-title mb-6">TOP COMICS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {comics.map((comic, index) => (
          <TopComicCard
            key={comic.nft_address}
            rank={index + 1}
            {...comic}
          />
        ))}
      </div>
    </section>
  );
} 