import Image from 'next/image';
import { Heart, MessageSquare, Share2, Eye } from 'lucide-react';
import type { ComicMetadata } from '@/lib/chat';

interface ReviewComicProps {
  comicUrl: string | null;
  metadata: ComicMetadata | null;
}

export function ReviewComic({ comicUrl, metadata }: ReviewComicProps) {
  return (
    <div className="space-y-8">
      {/* Comic Preview */}
      {comicUrl && (
        <div className="aspect-square w-full relative rounded-[2px] overflow-hidden">
          <img
            src={comicUrl}
            alt="Generated Comic"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Metadata Review */}
      {metadata && (
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-heading font-medium">{metadata.title}</h3>
              <p className="text-gray-600 mt-2">{metadata.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-700">Genre</span>
                <p className="mt-1 text-gray-600">{metadata.genre}</p>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-700">Mood</span>
                <p className="mt-1 text-gray-600">{metadata.mood}</p>
              </div>
            </div>

            <div>
              <span className="text-sm font-medium text-gray-700">Tags</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {metadata.suggestedTags.map((tag) => (
                  <span
                    key={`tag-${tag}`}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 