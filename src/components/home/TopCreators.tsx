import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight, BookOpen, Heart } from "lucide-react";

// Creator card component
function CreatorCard() {
  return (
    <div className="creator-card">
      <Avatar className="w-32 h-32 border-2 border-gray-200">
        <AvatarImage src="/images/profile.jpg" alt="User profile" />
        <AvatarFallback>UN</AvatarFallback>
      </Avatar>
      <h3 className="text-lg font-semibold mt-2">USERNAME</h3>
      <div className="creator-stats">
        <div className="flex items-center gap-1">
          <BookOpen className="w-4 h-4" />
          <span>45</span>
        </div>
        <div className="flex items-center gap-1">
          <Heart className="w-4 h-4" />
          <span>102</span>
        </div>
      </div>
    </div>
  );
}

export function TopCreators() {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="section-title">TOP CREATORS</h2>
        <Link
          href="/leaderboard"
          className="see-more"
        >
          GO TO LEADERBOARD
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <CreatorCard />
        <CreatorCard />
        <CreatorCard />
        <CreatorCard />
        <CreatorCard />
      </div>
    </section>
  );
}
