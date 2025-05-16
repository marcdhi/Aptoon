import { useState } from 'react';
import { UploadContent } from './UploadContent';
import { EditComic } from './EditComic';
import { ReviewComic } from './ReviewComic';
import { SuccessMessage } from './SuccessMessage';
import Image from 'next/image';
import { GenerationSteps } from './GenerationSteps';
import type { ComicMetadata } from '@/lib/chat';
import { mintComicNFT } from '@/lib/nft';
import { toast } from 'sonner';
import { useWallet } from '@solana/wallet-adapter-react';

interface CreateComicTabsProps {
  isGenerating: boolean;
  onGenerate: () => void;
  onRegenerate: () => void;
}

interface MintingResult {
  explorerUrl: string;
  metaplexUrl: string;
}

export function CreateComicTabs({ isGenerating, onGenerate, onRegenerate }: CreateComicTabsProps) {
  const wallet = useWallet();
  const [activeStep, setActiveStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [generatedComicUrl, setGeneratedComicUrl] = useState<string | null>(null);
  const [comicMetadata, setComicMetadata] = useState<ComicMetadata | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  const [mintingResult, setMintingResult] = useState<MintingResult | null>(null);

  const handlePublish = () => {
    if (!wallet.connected) {
      toast.error('Please connect your wallet first');
      return;
    }
    setShowConfirmation(true);
  };

  const confirmPublish = async () => {
    if (!generatedComicUrl || !comicMetadata) {
      toast.error('No comic to publish');
      return;
    }

    if (!wallet.connected) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsMinting(true);
    try {
      const attributes = [
        { trait_type: 'Genre', value: comicMetadata.genre },
        { trait_type: 'Mood', value: comicMetadata.mood },
        ...comicMetadata.suggestedTags.map(tag => ({
          trait_type: 'Tag',
          value: tag
        }))
      ];

      const result = await mintComicNFT(
        wallet,
        generatedComicUrl,
        comicMetadata.title,
        comicMetadata.description,
        attributes
      );

      setMintingResult({
        explorerUrl: result.explorerUrl,
        metaplexUrl: result.metaplexUrl
      });

      toast.success('Comic successfully minted as NFT!');
      console.log('\nNFT Created');
      console.log('View Transaction:', result.explorerUrl);
      console.log('View NFT:', result.metaplexUrl);
    } catch (error) {
      console.error('Error minting NFT:', error);
      toast.error('Failed to mint NFT. Please try again.');
    } finally {
      setIsMinting(false);
      setShowConfirmation(false);
      setShowSuccess(true);
    }
  };

  const handleComicGenerated = (url: string, metadata: ComicMetadata) => {
    setGeneratedComicUrl(url);
    setComicMetadata(metadata);
    onGenerate();
    setActiveStep(2);
  };

  if (showSuccess) {
    return (
      <SuccessMessage 
        explorerUrl={mintingResult?.explorerUrl}
        metaplexUrl={mintingResult?.metaplexUrl}
      />
    );
  }

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1:
        return 'STEP 1: UPLOAD CONTENT';
      case 2:
        return 'STEP 2: EDIT YOUR COMIC';
      case 3:
        return 'STEP 3: REVIEW AND PUBLISH';
      default:
        return '';
    }
  };

  const getNextButtonText = (step: number) => {
    switch (step) {
      case 3:
        return 'PUBLISH COMIC';
      default:
        return 'NEXT STEP';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="featured-title">CREATE COMIC</h1>
        <p className="text-gray-600">AI transforms gameplay into comic-style stories</p>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-between items-center">
        {activeStep > 1 ? (
          <button 
            className="btn-aptoon"
            onClick={() => setActiveStep(activeStep - 1)}
          >
            PREVIOUS STEP
          </button>
        ) : (
          <div /> // Empty div to maintain layout
        )}
        <div className="flex gap-2">
          <div className={`h-1 w-12 rounded ${activeStep >= 1 ? 'bg-[#2A9D8F]' : 'bg-gray-200'}`} />
          <div className={`h-1 w-12 rounded ${activeStep >= 2 ? 'bg-[#2A9D8F]' : 'bg-gray-200'}`} />
          <div className={`h-1 w-12 rounded ${activeStep >= 3 ? 'bg-[#2A9D8F]' : 'bg-gray-200'}`} />
        </div>
        <button 
          className="btn-aptoon"
          onClick={() => activeStep < 3 ? setActiveStep(activeStep + 1) : handlePublish()}
        >
          {getNextButtonText(activeStep)}
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-[2px] border border-black shadow-[2px_-2px_0px_0px_#000000] p-6">
        <div className="space-y-6">
          <h2 className="text-xl font-heading font-bold">{getStepTitle(activeStep)}</h2>
          
          {activeStep === 1 && (
            <UploadContent 
              onGenerate={handleComicGenerated}
              isGenerating={isGenerating}
            />
          )}

          {activeStep === 2 && (
            <>
              <EditComic 
                comicUrl={generatedComicUrl} 
                metadata={comicMetadata}
                onMetadataChange={setComicMetadata}
              />
              {isGenerating && (
                <GenerationSteps
                  onRegenerate={onRegenerate}
                  isGenerating={isGenerating}
                />
              )}
            </>
          )}

          {activeStep === 3 && (
            <>
              <ReviewComic 
                comicUrl={generatedComicUrl}
                metadata={comicMetadata}
              />
              <div className="flex justify-between pt-6">
                <button 
                  className="btn-aptoon"
                  onClick={() => setActiveStep(2)}
                >
                  EDIT DESCRIPTION
                </button>
                <button 
                  className="btn-aptoon"
                  onClick={() => setActiveStep(1)}
                >
                  REGENERATE COMIC
                </button>
              </div>
            </>
          )}

          {/* Bottom Navigation */}
          {activeStep < 3 && (
            <div className="flex justify-between pt-6 mt-6 border-t border-gray-200">
              {activeStep > 1 ? (
                <button 
                  className="btn-aptoon"
                  onClick={() => setActiveStep(activeStep - 1)}
                >
                  PREVIOUS STEP
                </button>
              ) : (
                <div /> // Empty div to maintain layout
              )}
              <button 
                className="btn-aptoon"
                onClick={() => activeStep < 3 ? setActiveStep(activeStep + 1) : handlePublish()}
              >
                {getNextButtonText(activeStep)}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-[2px] max-w-md w-full mx-4 space-y-4">
            <h3 className="text-xl font-heading font-bold">Confirm Publication</h3>
            <p>Are you sure you want to publish this comic as an NFT? This action cannot be undone.</p>
            <div className="flex justify-end gap-4 pt-4">
              <button 
                className="btn-aptoon"
                onClick={() => setShowConfirmation(false)}
                disabled={isMinting}
              >
                CANCEL
              </button>
              <button 
                className="btn-aptoon"
                onClick={confirmPublish}
                disabled={isMinting}
              >
                {isMinting ? 'MINTING...' : 'CONFIRM'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 