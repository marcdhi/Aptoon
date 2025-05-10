import { useState } from 'react';
import { UploadContent } from './UploadContent';
import { EditComic } from './EditComic';
import { ReviewComic } from './ReviewComic';
import { SuccessMessage } from './SuccessMessage';
import Image from 'next/image';
import { GenerationSteps } from './GenerationSteps';

interface CreateComicTabsProps {
  isGenerating: boolean;
  onGenerate: () => void;
  onRegenerate: () => void;
}

export function CreateComicTabs({ isGenerating, onGenerate, onRegenerate }: CreateComicTabsProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [generatedComicUrl, setGeneratedComicUrl] = useState<string | null>(null);

  const handlePublish = () => {
    setShowConfirmation(true);
  };

  const confirmPublish = () => {
    setShowConfirmation(false);
    setShowSuccess(true);
  };

  const handleComicGenerated = (url: string) => {
    setGeneratedComicUrl(url);
    onGenerate();
    setActiveStep(2);
  };

  if (showSuccess) {
    return <SuccessMessage />;
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
              <EditComic comicUrl={generatedComicUrl} />
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
              <ReviewComic />
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
            <p>Are you sure you want to publish this comic? This action cannot be undone.</p>
            <div className="flex justify-end gap-4 pt-4">
              <button 
                className="btn-aptoon"
                onClick={() => setShowConfirmation(false)}
              >
                CANCEL
              </button>
              <button 
                className="btn-aptoon"
                onClick={confirmPublish}
              >
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 