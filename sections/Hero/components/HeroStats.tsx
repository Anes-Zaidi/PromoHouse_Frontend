const stats = [
  { label: "Active Users", value: "15k+" },
  { label: "Verified Dealers", value: "500+" },
  { label: "Food Saved", value: "20T" },
];

export function HeroStats() {
  return (
    <div className="flex items-center gap-6 md:gap-10">
      {stats.map((stat) => (
        <div key={stat.label}>
          <p className="text-3xl md:text-4xl font-extrabold mb-1">{stat.value}</p>
          <p className="text-white/70 text-xs md:text-sm font-medium">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
