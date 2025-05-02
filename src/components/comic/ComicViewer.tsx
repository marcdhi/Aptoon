import Image from "next/image";
import { Heart, MessageSquare, Share2, Eye } from "lucide-react";

interface ComicViewerProps {
  title: string;
  description: string;
  likes: number;
  comments: number;
  views: number;
  imageSrc: string;
}

export function ComicViewer({
  title,
  description,
  likes,
  comments,
  views,
  imageSrc
}: ComicViewerProps) {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Stats and actions */}
      <div className="flex items-center mb-4 space-x-4">
        <div className="flex items-center text-red-500">
          <Heart className="w-6 h-6 mr-1" />
          <span className="font-medium">{likes}</span>
        </div>
        <div className="flex items-center">
          <MessageSquare className="w-6 h-6 mr-1" />
          <span className="font-medium">{comments}</span>
        </div>
        <div className="flex items-center ml-auto">
          <Share2 className="w-6 h-6 mr-4" />
          <div className="flex items-center">
            <Eye className="w-6 h-6 mr-1" />
            <span className="font-medium">{views}</span>
          </div>
        </div>
      </div>

      {/* Comic image */}
      <div className="relative w-full border rounded-lg overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          width={1200}
          height={800}
          className="w-full object-contain"
        />

        {/* Red progress bar at bottom */}
        <div className="absolute bottom-0 left-0 w-1/3 h-1 bg-red-500" />
      </div>
    </div>
  );
}
