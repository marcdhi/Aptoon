import { SiteLayout } from "@/components/layout/SiteLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  {
    rank: 5,
    likes: 15,
    views: 82,
    creator: "username xya",
    game: "League of Legends",
    network: "Solana",
  },
  {
    rank: 6,
    likes: 10,
    views: 65,
    creator: "username xya",
    game: "League of Legends",
    network: "Solana",
  },
  {
    rank: 7,
    likes: 8,
    views: 42,
    creator: "username xya",
    game: "League of Legends",
    network: "Solana",
  },
  {
    rank: 8,
    likes: 5,
    views: 30,
    creator: "username xya",
    game: "League of Legends",
    network: "Solana",
  },
];

export default function LeaderboardPage() {
  return (
    <SiteLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">LEADERBOARD</h1>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Time</TabsTrigger>
            <TabsTrigger value="monthly">This Month</TabsTrigger>
            <TabsTrigger value="weekly">This Week</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
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
                        <Avatar className="w-6 h-6">
                          <AvatarFallback>{row.game.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        {row.game}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback>SL</AvatarFallback>
                        </Avatar>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="monthly">
            <div className="p-12 text-center text-gray-500">
              Monthly leaderboard data will appear here
            </div>
          </TabsContent>

          <TabsContent value="weekly">
            <div className="p-12 text-center text-gray-500">
              Weekly leaderboard data will appear here
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SiteLayout>
  );
}
