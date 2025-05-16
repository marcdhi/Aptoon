'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LikeButton } from "@/components/LikeButton";
import { supabase } from "@/lib/supabase";
import type { ComicWithStats } from "@/types/comics";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";

function ComicCard({ nft_address, title, image_url, likes = 0, comments = 0 }: ComicWithStats) {
  return (
    <Link href={`/comic/${nft_address}`} className="block comic-card">
      <div className="image-container">
        <Image
          src={image_url}
          alt={title}
          width={437}
          height={240}
          className="object-cover"
          priority
        />
        <div className="comic-stats">
          <div className="flex items-center gap-1">
            <span>{comments}</span>
            <span className="text-sm">comments</span>
          </div>
          <LikeButton nftAddress={nft_address} className="!p-0" />
        </div>
      </div>
      <div className="comic-info">
        <h3 className="comic-title">{title}</h3>
      </div>
    </Link>
  );
}

function ComicCardSkeleton() {
  return (
    <div className="block comic-card">
      <div className="image-container">
        <Skeleton className="w-full h-[240px]" />
      </div>
      <div className="comic-info">
        <Skeleton className="h-6 w-3/4" />
      </div>
    </div>
  );
}

export function FeaturedComics() {
  const [comics, setComics] = useState<ComicWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const comicsPerPage = 3;

  useEffect(() => {
    async function fetchComics() {
      try {
        setError(null);
        // Fetch comics with their like counts
        const { data: comicsData, error: comicsError } = await supabase
          .from('comics')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(9);

        if (comicsError) {
          console.error('Supabase error:', comicsError);
          throw new Error(comicsError.message);
        }

        if (!comicsData) {
          throw new Error('No comics data received');
        }

        // For each comic, get its like count
        const comicsWithStats = await Promise.all(
          comicsData.map(async (comic) => {
            const { count: likesCount, error: likesError } = await supabase
              .from('likes')
              .select('*', { count: 'exact' })
              .eq('nft_address', comic.nft_address);

            if (likesError) {
              console.error('Error fetching likes for comic:', comic.nft_address, likesError);
            }

            return {
              ...comic,
              likes: likesCount || 0,
              comments: 0, // TODO: Implement comments feature
            } as ComicWithStats;
          })
        );

        setComics(comicsWithStats);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch comics';
        console.error('Error fetching comics:', error);
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    }

    fetchComics();
  }, []);

  const totalPages = Math.ceil(comics.length / comicsPerPage);
  const displayedComics = comics.slice(
    currentPage * comicsPerPage,
    (currentPage + 1) * comicsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="section-title">FEATURED COMICS</h2>
        <div className="flex gap-2">
          <button 
            className="p-2 border rounded-full disabled:opacity-50"
            onClick={prevPage}
            disabled={loading || comics.length <= comicsPerPage}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            className="p-2 border rounded-full disabled:opacity-50"
            onClick={nextPage}
            disabled={loading || comics.length <= comicsPerPage}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <>
            <ComicCardSkeleton />
            <ComicCardSkeleton />
            <ComicCardSkeleton />
          </>
        ) : error ? (
          <div className="col-span-3 text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : displayedComics.length > 0 ? (
          displayedComics.map((comic) => (
            <ComicCard key={comic.nft_address} {...comic} />
          ))
        ) : (
          <div className="col-span-3 text-center py-12">
            <p className="text-gray-500">No comics found. Be the first to create one!</p>
          </div>
        )}
      </div>
    </section>
  );
}
