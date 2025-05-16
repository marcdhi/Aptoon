import Image from "next/image";
import Link from "next/link";
import { Heart, MessageSquare } from "lucide-react";

interface RelatedComicProps {
  nftAddress: string;
  title: string;
  gameName: string;
  likes: number;
  comments: number;
  imageSrc: string;
}

function RelatedComicCard({ nftAddress, title, gameName, likes, comments, imageSrc }: RelatedComicProps) {
  return (
    <Link href={`/comic/${nftAddress}`} className="block comic-card">
      <div className="relative">
        <Image
          src={imageSrc}
          alt={title}
          width={400}
          height={300}
          className="object-cover w-full h-48"
        />
        <div className="absolute bottom-2 left-2 flex gap-2">
          <div className="bg-white rounded flex items-center px-2 py-1 text-sm">
            <MessageSquare className="w-3 h-3 mr-1" />
            <span>{comments}</span>
          </div>
          <div className="bg-white rounded flex items-center px-2 py-1 text-sm">
            <Heart className="w-3 h-3 mr-1" />
            <span>{likes}</span>
          </div>
        </div>
      </div>
      <div className="p-3">
        <h3 className="comic-title">{title}</h3>
        <p className="game-name">{gameName}</p>
      </div>
    </Link>
  );
}

interface RelatedComicsProps {
  comics: RelatedComicProps[];
}

export function RelatedComics({ comics }: RelatedComicsProps) {
  return (
    <div className="w-full mt-8">
      <h2 className="text-2xl font-bold mb-6">MORE COMICS</h2>

      <div className="grid grid-cols-1 gap-6">
        {comics.map((comic) => (
          <RelatedComicCard
            key={comic.nftAddress}
            nftAddress={comic.nftAddress}
            title={comic.title}
            gameName={comic.gameName}
            likes={comic.likes}
            comments={comic.comments}
            imageSrc={comic.imageSrc}
          />
        ))}
      </div>
    </div>
  );
}
