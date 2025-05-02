import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart, MessageSquare } from "lucide-react";

// Comic card component
function ComicCard() {
  return (
    <Link href="/comic/1" className="block comic-card">
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
    </Link>
  );
}

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ComicCard />
        <ComicCard />
        <ComicCard />
      </div>
    </section>
  );
}
