'use client';

import { useState } from 'react';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { CreateComicTabs } from '@/components/create-comic/CreateComicTabs';

export default function CreateComicPage() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Add your comic generation logic here
    // When done, set isGenerating to false
    
    // Simulating generation process
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    // Add your comic regeneration logic here
    
    // Simulating regeneration process
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <SiteLayout>
      <CreateComicTabs 
        isGenerating={isGenerating}
        onGenerate={handleGenerate}
        onRegenerate={handleRegenerate}
      />
    </SiteLayout>
  );
}
