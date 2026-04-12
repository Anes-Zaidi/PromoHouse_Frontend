'use client';
import React, { useState } from 'react';
import CommentDealCard from '@/components/CommentDealCard';
import { FaUserAlt } from "react-icons/fa";

export default function CommentDealSection({ count }: { count: number }) {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      userName: "Sarah Jenkins",
      userImage: "/UserAvatar.jpg",
      timeAgo: "2 hours ago",
      likes: 12,
      content: "This is such a great deal for fresh sourdough! I grab a box every Tuesday morning."
    },
    {
      id: 2,
      userName: "Mike Thompson",
      userImage: "/userpic.jpg",
      timeAgo: "5 hours ago",
      likes: 4,
      content: "Is it a surprise mix or can we choose the pastries?"
    }
  ]);

  // fonction pour ajouter le comment
  const handlePostComment = () => {
    if (newComment.trim() !== '') {
      const commentToAdd = {
        id: Date.now(),
        userName: "You ",
        userImage: "", 
        timeAgo: "Just now",
        likes: 0,
        content: newComment
      };
      //j'ajoute le dernier commentaire au debut et je reintialise 
      setComments([commentToAdd, ...comments]);
      setNewComment('');
    }
  };

  return (
    <div className="space-y-8">
      {/* tittle */}
      <div className="flex items-center gap-3">
        <h3 className="text-[20px] font-black text-gray-900">Community Discussion</h3>
        <span className="bg-gray-100 text-gray-400 text-[12px] font-bold px-2 py-0.5 rounded-md">
          {comments.length}
        </span>
      </div>

      
      <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex gap-4">
        <div className="w-10 h-10 rounded-full bg-[#FFEDD5] flex items-center justify-center shrink-0 border border-[#FED7AA]">
          <FaUserAlt className="text-[#F97316] w-4 h-4" />
        </div>
        
        <div className="grow space-y-3">
          <textarea 
            placeholder="Add your thoughts or ask a question about this deal..." 
            className="w-full bg-gray-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#22C55E]/20 focus:bg-white outline-none min-h-25 resize-none text-gray-600 transition-all"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)} 
          />
          <div className="flex justify-end">
            <button 
              onClick={handlePostComment} 
              className="bg-[#22C55E] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#1ea34d] transition-all shadow-sm active:scale-95"
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>

      {/* Liste des commentaires */}
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
    </div>
  );
}