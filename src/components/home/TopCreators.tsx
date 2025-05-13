import Image from "next/image";
import Link from "next/link";
import { BookOpen, Heart } from "lucide-react";

interface CreatorCardProps {
  id: string;
  username: string;
  avatarUrl: string;
  comics: number;
  likes: number;
}

function CreatorCard({ id, username, avatarUrl, comics, likes }: CreatorCardProps) {
  return (
    <Link href={`/creator/${id}`} className="creator-profile-card w-[220px]">
      <div className="image-container">
        <Image
          src={avatarUrl}
          alt={username}
          width={220}
          height={280}
          className="object-cover grayscale contrast-125"
          priority
        />
      </div>
      <div className="creator-info">
        <h3 className="username">{username}</h3>
        <div className="stats">
          <div className="stat-item">
            <BookOpen className="w-4 h-4" />
            <span>{comics}</span>
          </div>
          <div className="stat-item">
            <Heart className="w-4 h-4" />
            <span>{likes}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Mock data with more realistic values
const topCreators: CreatorCardProps[] = [
  {
    id: "1",
    username: "Sophia Chen",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2187&auto=format&fit=crop",
    comics: 24,
    likes: 1289,
  },
  {
    id: "2",
    username: "Marcus Rivera",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2187&auto=format&fit=crop",
    comics: 18,
    likes: 956,
  },
  {
    id: "3",
    username: "Aisha Patel",
    avatarUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=2187&auto=format&fit=crop",
    comics: 31,
    likes: 2145,
  },
  {
    id: "4",
    username: "David Kim",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2187&auto=format&fit=crop",
    comics: 15,
    likes: 876,
  },
  {
    id: "5",
    username: "Emma Wilson",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2187&auto=format&fit=crop",
    comics: 28,
    likes: 1567,
  },
];

export function TopCreators() {
  return (
    <section className="mb-12">
      <h2 className="section-title">TOP CREATORS</h2>
      <div className="flex flex-wrap gap-4 justify-start">
        {topCreators.map((creator) => (
          <CreatorCard key={creator.id} {...creator} />
        ))}
      </div>
    </section>
  );
}
