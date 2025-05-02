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

// Sample data for the leaderboard
const leaderboardData = [
  {
    rank: 1,
    likes: 1000,
    views: 100000,
    creator: "username xya",
    game: "League of Legends",
    network: "Solana",
  },
  {
    rank: 2,
    likes: 500,
    views: 2000,
    creator: "username xya",
    game: "League of Legends",
    network: "Solana",
  },
  {
    rank: 3,
    likes: 300,
    views: 3250,
    creator: "username xya",
    game: "League of Legends",
    network: "Solana",
  },
  {
    rank: 4,
    likes: 25,
    views: 102,
    creator: "username xya",
    game: "League of Legends",
    network: "Solana",
  },
];

export function LeaderboardTable() {
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
            <TableHead>GAME</TableHead>
            <TableHead className="text-right">NETWORK</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboardData.map((row) => (
            <TableRow key={row.rank}>
              <TableCell className="font-medium">{row.rank}</TableCell>
              <TableCell>{row.likes}</TableCell>
              <TableCell>{row.views}</TableCell>
              <TableCell>{row.creator}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-300 rounded-full" />
                  {row.game}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <div className="w-6 h-6 bg-gray-300 rounded-full" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
