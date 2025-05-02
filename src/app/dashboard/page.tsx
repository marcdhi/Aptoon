import { SiteLayout } from "@/components/layout/SiteLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Heart, MessageSquare } from "lucide-react";

// Placeholder comic card for the dashboard
function DashboardComicCard() {
  return (
    <div className="comic-card">
      <div className="relative">
        <Image
          src="/images/comic-panel.jpg"
          alt="Comic panel"
          width={400}
          height={300}
          className="object-cover w-full h-48"
        />
        <div className="absolute bottom-2 left-2 flex gap-2">
          <div className="bg-white rounded flex items-center px-2 py-1 text-sm">
            <MessageSquare className="w-3 h-3 mr-1" />
            <span>45</span>
          </div>
          <div className="bg-white rounded flex items-center px-2 py-1 text-sm">
            <Heart className="w-3 h-3 mr-1" />
            <span>102</span>
          </div>
        </div>
      </div>
      <div className="p-3">
        <h3 className="comic-title">TITLE OF THE COMIC GOES HERE</h3>
        <p className="game-name">Game name</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <SiteLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 mb-8 items-start">
          {/* User profile section */}
          <Card className="w-full md:w-1/3">
            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src="/images/profile.jpg" alt="User profile" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">USERNAME</CardTitle>
              <p className="text-gray-500">Joined May 2025</p>
            </CardHeader>
            <CardContent>
              <div className="flex justify-around mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-sm text-gray-500">Comics</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">1.2k</p>
                  <p className="text-sm text-gray-500">Likes</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">36</p>
                  <p className="text-sm text-gray-500">Comments</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="font-semibold">Wallet Balance</p>
                  <p>0.24 SOL</p>
                </div>
                <div>
                  <p className="font-semibold">NFT Cartoons</p>
                  <p>12 owned</p>
                </div>
                <div className="pt-4">
                  <Button className="w-full">Edit Profile</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comics tabs section */}
          <div className="w-full md:w-2/3">
            <Tabs defaultValue="created">
              <TabsList className="mb-6">
                <TabsTrigger value="created">Created Comics</TabsTrigger>
                <TabsTrigger value="liked">Liked Comics</TabsTrigger>
                <TabsTrigger value="commented">Commented</TabsTrigger>
              </TabsList>

              <TabsContent value="created">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <DashboardComicCard />
                  <DashboardComicCard />
                  <DashboardComicCard />
                  <DashboardComicCard />
                </div>
              </TabsContent>

              <TabsContent value="liked">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <DashboardComicCard />
                  <DashboardComicCard />
                </div>
              </TabsContent>

              <TabsContent value="commented">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <DashboardComicCard />
                  <DashboardComicCard />
                  <DashboardComicCard />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
