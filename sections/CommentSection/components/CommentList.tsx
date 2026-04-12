import CommentCart from "@/components/CommentCart";
import { commentData } from "../utils/commentData";

export function CommentList() {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {commentData.map((comment, index) => (
        <CommentCart key={index} {...comment} />
      ))}
    </div>
  );
}
