'use client';

import CommentDealCard from "@/components/CommentDealCard";

interface CommentListProps {
  comments: Array<{
    id: number;
    userName: string;
    userImage: string;
    timeAgo: string;
    likes: number;
    content: string;
  }>;
}

export function CommentList({ comments }: CommentListProps) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentDealCard
          key={comment.id}
          userName={comment.userName}
          userImage={comment.userImage}
          timeAgo={comment.timeAgo}
          likes={comment.likes}
          content={comment.content}
        />
      ))}
    </div>
  );
}
