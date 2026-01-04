import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Hand } from "lucide-react";

interface Sign {
  id: number;
  name: string;
  description: string;
}

const signs: Sign[] = [
  { id: 1, name: "Hello", description: "Wave your open hand side to side, palm facing outward, at about head height. This is a universal greeting gesture." },
  { id: 2, name: "Thank You", description: "Touch your chin with the fingertips of a flat hand, then move the hand forward and down toward the person you're thanking." },
  { id: 3, name: "Please", description: "Place your flat hand on your chest and move it in a circular motion. This shows politeness and respect." },
  { id: 4, name: "Bank", description: "Form the letter 'B' with your hand, then tap it against the palm of your other hand twice." },
  { id: 5, name: "Money", description: "Tap the back of one flat hand into the palm of the other hand. Represents coins in your palm." },
  { id: 6, name: "Account", description: "Use your dominant hand to mime writing on the palm of your non-dominant hand." },
  { id: 7, name: "Deposit", description: "Move your cupped hand downward as if placing something into a container." },
  { id: 8, name: "Withdraw", description: "Move your cupped hand upward as if taking something out of a container." },
  { id: 9, name: "Loan", description: "Cross your index and middle fingers of both hands, then move them apart." },
  { id: 10, name: "Help", description: "Make a thumbs-up with one hand and place it on the palm of your other flat hand, then lift both hands together." },
  { id: 11, name: "Goodbye", description: "Open and close your fingers while your palm faces outward, like a waving motion repeated." },
];

interface SignListProps {
  onSelectSign: (sign: Sign) => void;
  selectedSign: Sign | null;
}

const SignList = ({ onSelectSign, selectedSign }: SignListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSigns = signs.filter((sign) =>
    sign.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="pl-10"
        />
      </div>

      <div className="bg-card rounded-xl border border-border divide-y divide-border max-h-[500px] overflow-y-auto">
        {filteredSigns.map((sign) => (
          <button
            key={sign.id}
            onClick={() => onSelectSign(sign)}
            className={`w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors flex items-center gap-3 ${
              selectedSign?.id === sign.id ? "bg-primary/10 border-l-4 border-l-primary" : ""
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
              <Hand className="w-4 h-4 text-accent-foreground" />
            </div>
            <span className="font-medium text-foreground">
              Sign {sign.id}: {sign.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SignList;
export type { Sign };
