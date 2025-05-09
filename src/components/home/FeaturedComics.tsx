import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart, MessageSquare } from "lucide-react";

// Comic card component
function ComicCard() {
  return (
    <Link href="/comic/1" className="block comic-card">
      <div className="image-container">
        <Image
          src="/images/comic-panel.jpg"
          alt="Comic panel"
          width={437}
          height={240}
          className="object-cover"
          priority
        />
        <div className="comic-stats">
          <div>
            <MessageSquare className="w-4 h-4" />
            <span>45</span>
          </div>
          <div>
            <Heart className="w-4 h-4" />
            <span>102</span>
          </div>
        </div>
      </div>
      <div className="comic-info">
        <h3 className="comic-title">TITLE OF THE COMIC GOES HERE</h3>
        <p className="game-name">Game name</p>
      </div>
    </Link>
  );
}

export function FeaturedComics() {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="featured-title">FEATURED COMICS</h2>
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
        <ComicCard />
        <ComicCard />
        <ComicCard />
      </div>
    </section>
  );
}
