'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface CommentFormProps {
  nftAddress: string;
}

export function CommentForm({ nftAddress }: CommentFormProps) {
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || submitting) return;

    try {
      setSubmitting(true);
      const { data: newComment, error } = await supabase
        .from('comments')
        .insert([
          {
            nft_address: nftAddress,
            content: commentText.trim(),
            user_address: '5P8rGwpnQFiUMSWzPurv9fr7hWCLifY5ExaNeEmCHrDB', // TODO: Get actual user address
            username: 'Anonymous' // TODO: Get actual username
          }
        ])
        .select()
        .single();

      if (error) {
        toast.error('Failed to post comment');
        throw error;
      }

      toast.success('Comment posted successfully');
      setCommentText('');
      
      // Refresh the page to show the new comment
      window.location.reload();
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmitComment} className="mb-8">
      <div className="flex gap-4 mb-4">
        <Avatar>
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
        </Avatar>
        <Input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write your comment..."
          className="flex-1"
          disabled={submitting}
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={submitting || !commentText.trim()}>
          {submitting ? 'Posting...' : 'Post Comment'}
        </Button>
      </div>
    </form>
  );
} 