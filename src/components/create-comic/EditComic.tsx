import { useState } from 'react';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import type { ComicMetadata } from '@/lib/chat';

interface EditComicProps {
  comicUrl: string | null;
  metadata: ComicMetadata | null;
  onMetadataChange: (metadata: ComicMetadata) => void;
}

export function EditComic({ comicUrl, metadata, onMetadataChange }: EditComicProps) {
  const [localMetadata, setLocalMetadata] = useState<ComicMetadata>(
    metadata || {
      title: '',
      description: '',
      genre: '',
      mood: '',
      suggestedTags: []
    }
  );

  const handleMetadataChange = (field: keyof ComicMetadata, value: string) => {
    const updatedMetadata = {
      ...localMetadata,
      [field]: field === 'suggestedTags' ? value.split(',').map(tag => tag.trim()) : value
    };
    setLocalMetadata(updatedMetadata);
    onMetadataChange(updatedMetadata);
  };

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

      {/* Metadata Form */}
      <div className="space-y-6">
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Title</span>
            <Input
              value={localMetadata.title}
              onChange={(e) => handleMetadataChange('title', e.target.value)}
              placeholder="Enter comic title"
              className="mt-1"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Description</span>
            <Textarea
              value={localMetadata.description}
              onChange={(e) => handleMetadataChange('description', e.target.value)}
              placeholder="Enter comic description"
              className="mt-1"
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Genre</span>
              <Input
                value={localMetadata.genre}
                onChange={(e) => handleMetadataChange('genre', e.target.value)}
                placeholder="e.g., Action, RPG"
                className="mt-1"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Mood</span>
              <Input
                value={localMetadata.mood}
                onChange={(e) => handleMetadataChange('mood', e.target.value)}
                placeholder="e.g., Epic, Intense"
                className="mt-1"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Tags</span>
            <Input
              value={localMetadata.suggestedTags.join(', ')}
              onChange={(e) => handleMetadataChange('suggestedTags', e.target.value)}
              placeholder="Enter tags separated by commas"
              className="mt-1"
            />
          </label>
        </div>
      </div>
    </div>
  );
} 