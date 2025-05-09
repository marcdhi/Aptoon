import { useState } from 'react';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';

export function EditComic() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGame, setSelectedGame] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <label className="block text-sm font-heading font-medium">TITLE</label>
        <Input
          placeholder="Write your comic title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-gray-300"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="block text-sm font-heading font-medium">COMIC DESCRIPTION</label>
        <Textarea
          placeholder="Write your comment"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[100px] border-gray-300"
        />
      </div>

      {/* Game Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-heading font-medium">CHOOSE THE RELATED GAME</label>
        <div className="relative">
          <Input
            placeholder="search games..."
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
            className="border-gray-300 pr-10"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="h-5 w-5 text-[#C24B41]"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="space-y-2">
        <label className="block text-sm font-heading font-medium">ACCEPT THE TERMS AND CONDITIONS</label>
        <div className="flex items-center gap-2">
          <Checkbox
            id="terms"
            checked={acceptTerms}
            onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            Estimated gas fee is equal to 0.0.3 USD.
          </label>
        </div>
      </div>

      {/* Generated Comic Preview */}
      <div className="space-y-2">
        <label className="block text-sm font-heading font-medium">GENERATED COMIC</label>
        <div className="aspect-video bg-gray-100 rounded-[2px] overflow-hidden">
          <img
            src="/images/comic-panel.jpg"
            alt="Generated Comic"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
} 