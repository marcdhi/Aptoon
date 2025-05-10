import { useState } from 'react';
import { LoadingSpinner } from '../ui/loading-spinner';

interface VideoToComicProps {
  onSuccess: (comicUrl: string) => void;
  isGenerating?: boolean;
}

export function VideoToComic({ onSuccess, isGenerating = false }: VideoToComicProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [sceneChange, setSceneChange] = useState(30);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file?.type?.startsWith('video/')) {
      setSelectedFile(file);
    } else {
      alert('Please select a valid video file');
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file?.type?.startsWith('video/')) {
      setSelectedFile(file);
    } else {
      alert('Please drop a valid video file');
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleGenerate = async () => {
    if (!selectedFile) {
      alert('Please select a video file first');
      return;
    }

    const formData = new FormData();
    formData.append('video', selectedFile);
    formData.append('rows', rows.toString());
    formData.append('cols', cols.toString());
    formData.append('min_scene_change', sceneChange.toString());

    try {
      const response = await fetch('/api/video/convert', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to convert video');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      onSuccess(url);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to convert video to comic');
    }
  };

  return (
    <div className="space-y-6">
      <div 
        className="border-2 border-dashed border-gray-300 rounded-[2px] p-8 cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-heading font-medium mb-4">
              {selectedFile ? selectedFile.name : 'DROP YOUR VIDEO CLIP HERE OR BROWSE'}
            </p>
            <div className="flex justify-center">
              <label className="btn-aptoon cursor-pointer">
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
                UPLOAD VIDEO
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-heading font-medium">ROWS: {rows}</label>
          <input
            type="range"
            min="1"
            max="4"
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-heading font-medium">COLUMNS: {cols}</label>
          <input
            type="range"
            min="1"
            max="4"
            value={cols}
            onChange={(e) => setCols(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-heading font-medium">SCENE SENSITIVITY: {sceneChange}</label>
          <input
            type="range"
            min="10"
            max="50"
            value={sceneChange}
            onChange={(e) => setSceneChange(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="pt-6">
        <button 
          className="btn-aptoon w-full mx-auto block"
          onClick={handleGenerate}
          disabled={isGenerating || !selectedFile}
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