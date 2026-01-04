interface FrequentSign {
  name: string;
  count: number;
}

const frequentSigns: FrequentSign[] = [
  { name: "Hello", count: 150 },
  { name: "Thank You", count: 120 },
  { name: "Money", count: 90 },
  { name: "Withdraw", count: 75 },
  { name: "Deposit", count: 60 },
];

const FrequentSignsList = () => {
  const maxCount = Math.max(...frequentSigns.map((s) => s.count));

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="font-semibold text-foreground mb-4">Most Frequently Used Signs</h3>
      <ul className="space-y-3">
        {frequentSigns.map((sign, index) => (
          <li key={sign.name} className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground w-4">{index + 1}.</span>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-foreground">{sign.name}</span>
                <span className="text-sm text-muted-foreground">({sign.count} times)</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${(sign.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FrequentSignsList;
