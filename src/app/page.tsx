import { SiteLayout } from "@/components/layout/SiteLayout";
import { FeaturedComics } from "@/components/home/FeaturedComics";
import { TopCreators } from "@/components/home/TopCreators";
import { GamesList } from "@/components/home/GamesList";
import { LeaderboardTable } from "@/components/home/LeaderboardTable";

export default function Home() {
  return (
    <SiteLayout>
      <FeaturedComics />
      <TopCreators />
      <GamesList />
      <LeaderboardTable />
    </SiteLayout>
  );
}
