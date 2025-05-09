'use client';

import { useState } from 'react';
import { Textarea } from '../ui/textarea';
import { LoadingSpinner } from '../ui/loading-spinner';

export interface UploadContentProps {
  onGenerate: () => void;
  isGenerating?: boolean;
}

export function UploadContent({ onGenerate, isGenerating = false }: UploadContentProps) {
  const [prompt, setPrompt] = useState('');

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <label className="block text-sm font-heading font-medium">WRITE YOUR PROMPT</label>
        <Textarea
          placeholder="Write your prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-[2px] p-8">
        <div className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-heading font-medium mb-4">DROP YOUR VIDEO CLIP HERE OR BROWSE</p>
            <div className="flex justify-center">
              <button className="btn-aptoon">
                UPLOAD CLIPS
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500 mb-4">OR</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-center font-heading font-medium">GAME CLIP LIBRARY</h3>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-video bg-gray-200 rounded-[2px]" />
          ))}
        </div>
        <div className="flex justify-center w-auto mx-auto">
          <button className="btn-aptoon">LINK MORE GAMES</button>
        </div>
      </div>

      <div className="pt-6">
        <button 
          className="btn-aptoon w-full mx-auto block"
          onClick={onGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <LoadingSpinner className="mr-2" />
              GENERATING COMIC
            </>
          ) : (
            'GENERATE COMIC'
          )}
        </button>
      </div>
    </div>
  );
} 