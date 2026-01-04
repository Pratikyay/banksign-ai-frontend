import { Hand, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Sign } from "./SignList";

interface SignDemonstrationProps {
  sign: Sign | null;
}

const SignDemonstration = ({ sign }: SignDemonstrationProps) => {
  return (
    <div className="space-y-4">
      {/* Video/Image area */}
      <div className="bg-card rounded-xl border border-border aspect-video flex items-center justify-center relative overflow-hidden">
        {sign ? (
          <div className="flex flex-col items-center gap-4 text-center p-6">
            <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center">
              <Hand className="w-12 h-12 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">{sign.name}</h3>
            <Button variant="outline" className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Play Demonstration
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <Hand className="w-12 h-12" />
            <p>Select a sign to see demonstration</p>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="bg-card rounded-xl border border-border p-5">
        {sign ? (
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">How to perform "{sign.name}"</h4>
            <p className="text-muted-foreground leading-relaxed">{sign.description}</p>
          </div>
        ) : (
          <p className="text-muted-foreground italic">
            Short description of how to perform the selected sign will appear here. This will include step-by-step instructions or key visual cues.
          </p>
        )}
      </div>
    </div>
  );
};

export default SignDemonstration;
