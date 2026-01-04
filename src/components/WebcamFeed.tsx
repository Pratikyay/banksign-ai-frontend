import { Video, Camera, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const WebcamFeed = () => {
  return (
    <div className="card-elevated overflow-hidden">
      <div className="webcam-container aspect-video flex items-center justify-center relative group">
        {/* Placeholder for actual webcam */}
        <div className="flex flex-col items-center gap-6 text-muted-foreground">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center animate-pulse-ring">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                <Camera className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold text-foreground mb-2">Live Webcam Feed</p>
            <p className="text-sm text-muted-foreground mb-4">Position yourself in frame for sign detection</p>
            <Button className="gap-2 btn-glow">
              <Play className="w-4 h-4" />
              Start Camera
            </Button>
          </div>
        </div>

        {/* Recording indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-card/95 backdrop-blur-sm px-4 py-2 rounded-full border border-border shadow-lg">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
          </span>
          <span className="text-sm font-medium text-foreground">Ready</span>
        </div>

        {/* Corner guides */}
        <div className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 border-primary/40 rounded-tl-lg" />
        <div className="absolute top-6 right-6 w-12 h-12 border-r-2 border-t-2 border-primary/40 rounded-tr-lg" />
        <div className="absolute bottom-6 left-6 w-12 h-12 border-l-2 border-b-2 border-primary/40 rounded-bl-lg" />
        <div className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 border-primary/40 rounded-br-lg" />
      </div>
    </div>
  );
};

export default WebcamFeed;
