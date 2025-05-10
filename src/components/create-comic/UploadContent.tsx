'use client';

import { useState } from 'react';
import { Textarea } from '../ui/textarea';
import { LoadingSpinner } from '../ui/loading-spinner';
import { VideoToComic } from './VideoToComic';

interface UploadContentProps {
  onGenerate: (comicUrl: string) => void;
  isGenerating: boolean;
}

export function UploadContent({ onGenerate, isGenerating }: UploadContentProps) {
  const [prompt, setPrompt] = useState('');
  const [comicUrl, setComicUrl] = useState<string | null>(null);

  const handleVideoSuccess = (url: string) => {
    setComicUrl(url);
    onGenerate(url);
  };

  return (
    <div className="space-y-8">
      {/* Prompt Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-medium">WRITE YOUR PROMPT</h3>
        <div className="flex flex-col gap-4">
          <Textarea
            placeholder="Write your prompt to generate a comic..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px]"
          />
          <button 
            className="btn-aptoon w-full sm:w-auto"
            onClick={() => onGenerate(comicUrl || '')}
            disabled={isGenerating || !prompt.trim()}
          >
            {isGenerating ? (
              <>
                <LoadingSpinner className="mr-2" />
                GENERATING FROM PROMPT
              </>
            ) : (
              'GENERATE FROM PROMPT'
            )}
          </button>
        </div>
      </div>

      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-sm text-gray-500">OR</span>
        </div>
      </div>

      {/* Video Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-medium">UPLOAD VIDEO</h3>
        <VideoToComic
          onSuccess={handleVideoSuccess}
          isGenerating={isGenerating}
        />
      </div>

      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-sm text-gray-500">OR</span>
        </div>
      </div>

      {/* Library Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-medium">GAME CLIP LIBRARY</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-video bg-gray-200 rounded-[2px] cursor-pointer hover:opacity-80 transition-opacity" />
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="btn-aptoon w-full sm:w-auto">LINK MORE GAMES</button>
          <button 
            className="btn-aptoon w-full sm:w-auto"
            onClick={() => onGenerate(comicUrl || '')}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <LoadingSpinner className="mr-2" />
                GENERATING FROM LIBRARY
              </>
            ) : (
              'GENERATE FROM LIBRARY'
            )}
          </button>
        </div>
      </div>

      {/* Preview Comic */}
      {comicUrl && (
        <div className="mt-8">
          <h3 className="text-lg font-heading font-medium mb-4">PREVIEW</h3>
          <img
            src={comicUrl}
            alt="Generated Comic"
            className="w-full rounded-[2px] shadow-lg"
          />
        </div>
      )}
    </div>
  );
} 