import { ChevronLeft, ChevronRight } from "lucide-react";

interface ExploreCategoryBarProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export function ExploreCategoryBar({ categories, activeCategory, onSelectCategory }: ExploreCategoryBarProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground">Explore Categories</h2>
      <div className="flex gap-2">
        <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-background hover:shadow-md transition-all">
          <ChevronLeft size={20} />
        </button>
        <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-background hover:shadow-md transition-all">
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-4 mb-10 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
              activeCategory === cat
                ? "bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/25"
                : "bg-background text-muted-foreground border-border hover:border-border"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
