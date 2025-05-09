import { useState } from 'react';
import { LoadingSpinner } from '../ui/loading-spinner';
import { Textarea } from '../ui/textarea';

interface GenerationStepsProps {
  onRegenerate: () => void;
  isGenerating: boolean;
}

export function GenerationSteps({ onRegenerate, isGenerating }: GenerationStepsProps) {
  const [editPrompt, setEditPrompt] = useState('');

  return (
    <div className="space-y-6">
      {/* Step 1.2 */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-medium">STEP 1.2: GENERATING COMIC</h3>
        <div className="flex items-center justify-center h-40 bg-gray-50 rounded-[2px] border border-gray-200">
          {isGenerating && (
            <div className="flex flex-col items-center gap-4">
              <LoadingSpinner className="w-8 h-8" />
              <p className="text-gray-600">Generating your comic...</p>
            </div>
          )}
        </div>
      </div>

      {/* Step 1.3 */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-medium">STEP 1.3: EDIT AND REGENERATE</h3>
        <div className="space-y-4">
          <Textarea
            placeholder="Add text prompt for edits..."
            value={editPrompt}
            onChange={(e) => setEditPrompt(e.target.value)}
            className="min-h-[100px]"
          />
          <button 
            className="btn-aptoon w-full"
            onClick={onRegenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <LoadingSpinner className="mr-2" />
                REGENERATING
              </>
            ) : (
              'REGENERATE COMIC'
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 