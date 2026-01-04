import { TrendingUp, Hand } from "lucide-react";

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

  const getBarColor = (index: number) => {
    const colors = [
      "from-accent to-accent/70",
      "from-primary to-primary/70",
      "from-green-500 to-green-400",
      "from-blue-500 to-blue-400",
      "from-purple-500 to-purple-400",
    ];
    return colors[index] || colors[0];
  };

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Top Signs</h3>
          <p className="text-sm text-muted-foreground">Most frequently detected</p>
        </div>
      </div>
      <ul className="space-y-4">
        {frequentSigns.map((sign, index) => (
          <li key={sign.name} className="group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center text-sm font-bold text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                {index + 1}
              </div>
              <div className="flex-1 flex items-center justify-between">
                <span className="font-medium text-foreground">{sign.name}</span>
                <span className="text-sm font-medium text-muted-foreground">{sign.count}x</span>
              </div>
            </div>
            <div className="ml-11 h-2 bg-muted/50 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${getBarColor(index)} rounded-full transition-all duration-500`}
                style={{ width: `${(sign.count / maxCount) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FrequentSignsList;
