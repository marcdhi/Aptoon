'use client';

import { useState } from 'react';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { UploadContent } from '@/components/create-comic/UploadContent';

export default function CreateComicPage() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Add your comic generation logic here
    // When done, set isGenerating to false
  };

  return (
    <SiteLayout>
      <UploadContent 
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
      />
    </SiteLayout>
  );
}
