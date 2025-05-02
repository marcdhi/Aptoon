"use client"

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface CommentProps {
  username: string;
  content: string;
  date: string;
  avatarSrc: string;
}

const Comment = ({ username, content, date, avatarSrc }: CommentProps) => {
  return (
    <div className="flex gap-3 mb-8">
      <Avatar className="w-10 h-10">
        <AvatarImage src={avatarSrc} alt={username} />
        <AvatarFallback>{username.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div>
        <div className="font-semibold mb-1">{username}</div>
        <p className="text-gray-800 mb-1">{content}</p>
        <div className="text-sm text-gray-500">{date}</div>
      </div>
    </div>
  );
};

interface CommentSectionProps {
  comments: CommentProps[];
}

export function CommentSection({ comments }: CommentSectionProps) {
  const [commentText, setCommentText] = useState("");

  return (
    <div className="w-full mt-8">
      <h2 className="text-2xl font-bold mb-6">WRITE YOUR COMMENT</h2>

      {/* New comment form */}
      <div className="flex gap-3 mb-6">
        <Avatar className="w-10 h-10">
          <AvatarImage src="/images/profile.jpg" alt="Your profile" />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="font-semibold mb-2">USERNAME</div>
          <textarea
            className="w-full border rounded-md p-3 h-24 resize-none"
            placeholder="Write your comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <Button>WRITE A COMMENT</Button>
          </div>
        </div>
      </div>

      {/* Existing comments */}
      <div>
        {comments.map((comment, index) => (
          <Comment
            key={`${comment.username}-${index}`}
            username={comment.username}
            content={comment.content}
            date={comment.date}
            avatarSrc={comment.avatarSrc}
          />
        ))}
      </div>
    </div>
  );
}
