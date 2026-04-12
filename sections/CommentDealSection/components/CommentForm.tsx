'use client';

interface CommentFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function CommentForm({ value, onChange, onSubmit }: CommentFormProps) {
  return (
    <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex gap-4">
      <div className="w-10 h-10 rounded-full bg-[#FFEDD5] flex items-center justify-center shrink-0 border border-[#FED7AA]">
        <span className="text-[#F97316] font-black">+</span>
      </div>
      <div className="grow space-y-3">
        <textarea
          placeholder="Add your thoughts or ask a question about this deal..."
          className="w-full bg-gray-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#22C55E]/20 focus:bg-white outline-none min-h-25 resize-none text-gray-600 transition-all"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            onClick={onSubmit}
            className="bg-[#22C55E] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#1ea34d] transition-all shadow-sm active:scale-95"
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
}
