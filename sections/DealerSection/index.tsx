import { DealerGrid } from "./components/DealerGrid";

export default function DealerSection() {
  return (
    <section className="bg-muted py-16 px-4">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-4">Trusted Dealers</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          We partner with certified local businesses committed to reducing food waste while providing quality products.
        </p>
      </div>
      <DealerGrid />
    </section>
  );
}
