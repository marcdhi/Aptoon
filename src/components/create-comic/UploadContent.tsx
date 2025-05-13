'use client';

import { useState } from 'react';
import { Textarea } from '../ui/textarea';
import { LoadingSpinner } from '../ui/loading-spinner';
import { VideoToComic } from './VideoToComic';
import { generateImage } from '@/lib/fal';
import { enhanceComicPrompt, generateComicMetadata, type ComicMetadata } from '@/lib/chat';
import { toast } from 'sonner';
import { ComicSkeleton } from './ComicSkeleton';
import { v4 as uuidv4 } from 'uuid';

interface UploadContentProps {
  onGenerate: (comicUrl: string, metadata: ComicMetadata) => void;
  isGenerating: boolean;
}

interface GeneratedComic {
  id: string;
  imageUrl: string;
  format: string;
  metadata: ComicMetadata;
}

export function UploadContent({ onGenerate, isGenerating }: UploadContentProps) {
  const [prompt, setPrompt] = useState('');
  const [isPromptGenerating, setIsPromptGenerating] = useState(false);
  const [enhancedPrompt, setEnhancedPrompt] = useState<string | null>(null);
  const [generatedComics, setGeneratedComics] = useState<GeneratedComic[]>([]);
  const [currentlyGenerating, setCurrentlyGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const totalImagesToGenerate = 3; // Number of variations to generate

  const handleVideoSuccess = (url: string) => {
    const metadata = {
      title: "Video Comic",
      description: "A comic generated from video content.",
      genre: "Gaming",
      mood: "Dynamic",
      suggestedTags: ["gaming", "video", "comic"]
    };
    const id = uuidv4();
    setGeneratedComics([{ id, imageUrl: url, format: 'jpeg', metadata }]);
    onGenerate(url, metadata);
  };

  const generateSingleComic = async (enhancedPrompt: string): Promise<GeneratedComic | null> => {
    try {
      const result = await generateImage({
        prompt: enhancedPrompt,
        size: 'square_hd',
      });
      
      const metadata = await generateComicMetadata(enhancedPrompt, result.imageUrl);
      
      return { 
        id: uuidv4(),
        imageUrl: result.imageUrl,
        format: result.format,
        metadata 
      };
    } catch (error) {
      console.error('Error generating single comic:', error);
      return null;
    }
  };

  const handlePromptGenerate = async () => {
    try {
      setIsPromptGenerating(true);
      setCurrentlyGenerating(true);
      setGenerationProgress(0);
      setGeneratedComics([]);
      
      // Step 1: Enhance the prompt
      const enhanced = await enhanceComicPrompt(prompt);
      setEnhancedPrompt(enhanced);
      
      // Step 2: Generate multiple variations
      for (let i = 0; i < totalImagesToGenerate; i++) {
        const comic = await generateSingleComic(enhanced);
        if (comic) {
          setGeneratedComics(prev => [...prev, comic]);
          setGenerationProgress((i + 1) / totalImagesToGenerate * 100);
          
          // If this is the first successful generation, notify parent
          if (i === 0) {
            onGenerate(comic.imageUrl, comic.metadata);
          }
        }
      }
      
      toast.success('Comics generated successfully!');
      
    } catch (error) {
      console.error('Error generating comics:', error);
      toast.error('Failed to generate comics. Please try again.');
    } finally {
      setIsPromptGenerating(false);
      setCurrentlyGenerating(false);
    }
  };

  const selectComic = (comic: GeneratedComic) => {
    onGenerate(comic.imageUrl, comic.metadata);
  };

  return (
    <div className="space-y-8">
      {/* Prompt Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-medium">WRITE YOUR PROMPT</h3>
        <div className="flex flex-col gap-4">
          <Textarea
            placeholder="Describe your gaming moment to turn it into an epic comic scene..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px]"
          />
          {enhancedPrompt && !isPromptGenerating && (
            <div className="text-sm bg-gray-50 p-4 rounded-[2px] border border-gray-200">
              <p className="font-medium text-gray-700">Enhanced Prompt:</p>
              <p className="text-gray-600 mt-1">{enhancedPrompt}</p>
            </div>
          )}
          <button 
            className="btn-aptoon w-full sm:w-auto"
            onClick={handlePromptGenerate}
            disabled={isPromptGenerating || !prompt.trim()}
          >
            {isPromptGenerating ? (
              <>
                <LoadingSpinner className="mr-2" />
                {`GENERATING COMICS (${Math.round(generationProgress)}%)`}
              </>
            ) : (
              'GENERATE COMICS'
            )}
          </button>
        </div>
      </div>

      {/* Generated Comics Grid */}
      {(generatedComics.length > 0 || currentlyGenerating) && (
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-medium">GENERATED VARIATIONS</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {generatedComics.map((comic) => (
              <div 
                key={comic.id}
                className={`relative cursor-pointer group ${
                  comic === generatedComics[0] ? 'ring-2 ring-[#2A9D8F]' : ''
                }`}
                onClick={() => selectComic(comic)}
              >
                <div className="aspect-square w-full relative rounded-[2px] overflow-hidden">
                  <img
                    src={comic.imageUrl}
                    alt={`Generated Comic ${comic.id}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity" />
                </div>
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm">
                  Variation {generatedComics.indexOf(comic) + 1}
                </div>
              </div>
            ))}
            
            {/* Loading Skeletons */}
            {currentlyGenerating && Array.from({ length: totalImagesToGenerate - generatedComics.length }).map((_, i) => (
              <ComicSkeleton key={`skeleton-${Date.now()}-${i}`} />
            ))}
          </div>
        </div>
      )}

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
            onClick={() => {
              if (generatedComics.length > 0) {
                const comic = generatedComics[0];
                onGenerate(comic.imageUrl, comic.metadata);
              }
            }}
            disabled={isGenerating || generatedComics.length === 0}
          >
            {isGenerating ? (
              <>
                <LoadingSpinner className="mr-2" />
                GENERATE FROM LIBRARY
              </>
            ) : (
              'GENERATE FROM LIBRARY'
            )}
          </button>
        </div>
      </div>

      {/* Preview Comic */}
      {generatedComics.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-heading font-medium mb-4">PREVIEW</h3>
          <img
            src={generatedComics[0].imageUrl}
            alt="Generated Comic"
            className="w-full rounded-[2px] shadow-lg"
          />
        </div>
      )}
    </div>
  );
} 