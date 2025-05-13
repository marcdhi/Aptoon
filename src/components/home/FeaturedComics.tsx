import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart, MessageSquare } from "lucide-react";

interface ComicCardProps {
  id: string;
  title: string;
  gameName: string;
  likes: number;
  comments: number;
  imageSrc: string;
}

function ComicCard({ id, title, gameName, likes, comments, imageSrc }: ComicCardProps) {
  return (
    <Link href={`/comic/${id}`} className="block comic-card">
      <div className="image-container">
        <Image
          src={imageSrc}
          alt={title}
          width={437}
          height={240}
          className="object-cover"
          priority
        />
        <div className="comic-stats">
          <div>
            <MessageSquare className="w-4 h-4" />
            <span>{comments}</span>
          </div>
          <div>
            <Heart className="w-4 h-4" />
            <span>{likes}</span>
          </div>
        </div>
      </div>
      <div className="comic-info">
        <h3 className="comic-title">{title}</h3>
        <p className="game-name">{gameName}</p>
      </div>
    </Link>
  );
}

// Mock data for featured comics - in a real app, this would come from an API
const featuredComics: ComicCardProps[] = [
  {
    id: "1",
    title: "Neon Dreams",
    gameName: "Cyberpunk 2077",
    likes: 3458,
    comments: 542,
    imageSrc: "https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg",
  },
  {
    id: "2",
    title: "Last Guardian",
    gameName: "Elden Ring",
    likes: 2893,
    comments: 367,
    imageSrc: "https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg",
  },
  {
    id: "3",
    title: "Starborn",
    gameName: "Starfield",
    likes: 4567,
    comments: 789,
    imageSrc: "https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg",
  },
];

export function FeaturedComics() {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="section-title">FEATURED COMICS</h2>
        <div className="flex gap-2">
          <button className="p-2 border rounded-full">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-2 border rounded-full">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {featuredComics.map((comic) => (
          <ComicCard key={comic.id} {...comic} />
        ))}
      </div>
    </section>
  );
}
