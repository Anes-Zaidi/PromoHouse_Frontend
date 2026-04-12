'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { ThumbsUp, MessageCircle } from "lucide-react";
import { FaUserAlt } from "react-icons/fa";

interface CommentProps {
  userName: string;
  userImage: string;
  timeAgo: string;
  likes: number;
  content: string;
}

export default function CommentDealCard({ userName, userImage, timeAgo, likes, content }: CommentProps) {
  const [likeCount, setLikeCount] = useState(likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState<{id: number, text: string}[]>([]);

  const handleLike = () => {
    if (!hasLiked) {
      setLikeCount(likeCount + 1);
      setHasLiked(true);
    } else {
      setLikeCount(likeCount - 1);
      setHasLiked(false);
    }
  };

  const handlePostReply = () => {
    if (replyText.trim() !== '') {
      setReplies([...replies, { id: Date.now(), text: replyText }]);
      setReplyText('');
      setShowReplyInput(false);
    }
  };

  return (
    <div className="space-y-3 transition-all duration-300">
      <div className="bg-white p-5 rounded-[24px] border border-gray-100 shadow-sm flex gap-4 hover:shadow-md transition-shadow">
        
        {/* Avatar avec un petit effet  */}
        <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden relative border border-gray-100 bg-gray-100 shadow-inner">
          {userImage ? (
            <Image 
              src={userImage} 
              alt={userName} 
              fill 
              className="object-cover" 
              sizes="40px" 
            />
          ) : (
            <div className="w-full h-full bg-[#FFEDD5] flex items-center justify-center">
              <FaUserAlt className="text-[#F97316] w-3.5 h-3.5" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-gray-900 text-[14px]">{userName}</span>
            <span className="text-gray-400 text-[11px] font-medium">• {timeAgo}</span>
          </div>
          
          <p className="text-gray-600 text-[14px] leading-relaxed mb-3">{content}</p>

          <div className="flex items-center gap-6 text-[12px] font-bold">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-1.5 transition-all active:scale-125 ${hasLiked ? 'text-[#22C55E]' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <ThumbsUp className={`w-3.5 h-3.5 ${hasLiked ? 'fill-current' : ''}`} /> 
              <span>{likeCount}</span>
            </button>

           
            <button 
              onClick={() => setShowReplyInput(!showReplyInput)}
              className="text-gray-400 hover:text-[#22C55E] flex items-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" /> Reply
            </button>
          </div>
        </div>
      </div>

      {showReplyInput && (
        <div className="ml-14 flex gap-3 animate-in fade-in zoom-in-95 duration-200">
          <textarea 
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            className="flex-1 bg-white border border-gray-200 rounded-xl p-3 text-[13px] outline-none focus:ring-2 focus:ring-[#22C55E]/20 min-h-15 resize-none shadow-inner"
          />
          <button 
            onClick={handlePostReply}
            className="bg-[#22C55E] text-white px-5 py-2 rounded-xl text-xs font-bold self-end active:scale-95 transition-transform shadow-md"
          >
            Send
          </button>
        </div>
      )}

      {/* --- LISTE DES RÉPONSES (Style Social) --- */}
      {replies.length > 0 && (
        <div className="ml-14 space-y-4 border-l-2 border-gray-100 pl-4 mt-3">
          {replies.map((reply) => (
            <div key={reply.id} className="flex gap-3 items-start animate-in fade-in slide-in-from-left-3 duration-300">
              
              <div className="w-8 h-8 rounded-full bg-[#FFEDD5] flex items-center justify-center shrink-0 border border-[#FED7AA] shadow-sm">
                <FaUserAlt className="text-[#F97316] w-2.5 h-2.5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="bg-gray-50 p-3 rounded-2xl rounded-tl-none inline-block max-w-full shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900 text-[12px]">You</span>
                    <span className="text-gray-400 text-[10px] font-medium">• Just now</span>
                  </div>
                  <p className="text-[13px] text-gray-600 leading-snug wrap-break-words">
                    {reply.text}
                  </p>
                </div>
                
                <div className="flex items-center gap-4 mt-1 ml-1 text-[10px] font-bold text-gray-400">
                  <button className="hover:text-[#22C55E] transition-colors uppercase">Like</button>
                  <button className="hover:text-[#22C55E] transition-colors uppercase">Reply</button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}