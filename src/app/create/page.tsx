'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { CreateComicTabs } from '@/components/create-comic/CreateComicTabs';

export default function CreateComicPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { connected } = useWallet();
  const router = useRouter();

  useEffect(() => {
    // If wallet is not connected, redirect to home page
    if (!connected) {
      router.push('/');
    }
  }, [connected, router]);

  // If not connected, don't render the page content
  if (!connected) {
    return null;
  }

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
