import { Hand, Play, Info, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Sign } from "./SignList";

interface SignDemonstrationProps {
  sign: Sign | null;
}

const SignDemonstration = ({ sign }: SignDemonstrationProps) => {
  return (
    <div className="space-y-5">
      {/* Video/Image area */}
      <div className="card-elevated aspect-video flex items-center justify-center relative overflow-hidden">
        {sign ? (
          <div className="flex flex-col items-center gap-6 text-center p-8">
            <div className="relative">
              <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center animate-float">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-lg">
                  <Hand className="w-10 h-10 text-accent-foreground" />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">{sign.name}</h3>
              <p className="text-muted-foreground mb-4">Sign #{sign.id}</p>
            </div>
            <Button className="gap-2 btn-glow">
              <Play className="w-4 h-4" />
              Play Demonstration Video
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 text-muted-foreground p-8">
            <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center">
              <Hand className="w-10 h-10" />
            </div>
            <div className="text-center">
              <p className="font-medium text-foreground mb-1">No Sign Selected</p>
              <p className="text-sm">Choose a sign from the list to see its demonstration</p>
            </div>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="card-elevated p-6">
        {sign ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Info className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground text-lg">How to Sign "{sign.name}"</h4>
            </div>
            <p className="text-muted-foreground leading-relaxed text-base pl-13">
              {sign.description}
            </p>
            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 px-4 py-3 rounded-xl">
              <CheckCircle className="w-4 h-4" />
              <span>This sign is commonly used in banking transactions</span>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground">
              Select a sign from the list to see detailed instructions on how to perform it correctly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignDemonstration;
