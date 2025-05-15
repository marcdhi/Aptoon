'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/lib/supabase";
import type { ComicWithStats } from "@/types/comics";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingSkeleton() {
  return (
    <TableBody>
      {[...Array(4)].map((_, index) => (
        <TableRow key={`skeleton-${index}`}>
          {[...Array(6)].map((_, cellIndex) => (
            <TableCell key={`cell-${index}-${cellIndex}`}>
              <Skeleton className="h-6 w-24" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}

export function LeaderboardTable() {
  const [comics, setComics] = useState<ComicWithStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboardData() {
      try {
        // First, get all comics
        const { data: comicsData, error: comicsError } = await supabase
          .from('comics')
          .select('*');

        if (comicsError) throw comicsError;

        // For each comic, get its like count and view count
        const comicsWithStats = await Promise.all(
          (comicsData || []).map(async (comic) => {
            const { count: likeCount } = await supabase
              .from('likes')
              .select('*', { count: 'exact' })
              .eq('nft_address', comic.nft_address);

            // TODO: Implement view counting in the future
            const viewCount = 0;

            return {
              ...comic,
              likes: likeCount || 0,
              views: viewCount,
            } as ComicWithStats;
          })
        );

        // Sort by likes in descending order
        const sortedComics = comicsWithStats.sort((a, b) => b.likes - a.likes);
        setComics(sortedComics);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboardData();
  }, []);

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="section-title">LEADERBOARD</h2>
        <Link href="/leaderboard" className="see-more">
          GO TO LEADERBOARD
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">RANK</TableHead>
            <TableHead>LIKES</TableHead>
            <TableHead>VIEWS</TableHead>
            <TableHead>CREATOR</TableHead>
            <TableHead>TITLE</TableHead>
            <TableHead className="text-right">NETWORK</TableHead>
          </TableRow>
        </TableHeader>
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <TableBody>
            {comics.map((comic, index) => (
              <TableRow key={comic.nft_address}>
                <TableCell className="font-medium">#{index + 1}</TableCell>
                <TableCell>{comic.likes}</TableCell>
                <TableCell>{comic.views || 0}</TableCell>
                <TableCell>{comic.creator_address}</TableCell>
                <TableCell>
                  <Link href={`/comic/${comic.nft_address}`} className="hover:underline">
                    {comic.title}
                  </Link>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-6 h-6 bg-gray-300 rounded-full" />
                    Solana
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </section>
  );
}
