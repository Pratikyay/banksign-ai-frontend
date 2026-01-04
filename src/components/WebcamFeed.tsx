import { Video, Camera } from "lucide-react";

const WebcamFeed = () => {
  return (
    <div className="webcam-container aspect-video flex items-center justify-center relative group">
      {/* Placeholder for actual webcam - would integrate with MediaDevices API */}
      <div className="flex flex-col items-center gap-4 text-muted-foreground">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center animate-pulse-ring">
          <Camera className="w-10 h-10" />
        </div>
        <p className="text-lg font-medium">Live Webcam Feed Area</p>
        <p className="text-sm">Camera access will be requested when started</p>
      </div>

      {/* Recording indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border">
        <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
        <span className="text-xs font-medium text-muted-foreground">Ready</span>
      </div>

      {/* Frame overlay */}
      <div className="absolute inset-4 border-2 border-dashed border-primary/20 rounded-lg pointer-events-none" />
    </div>
  );
};

export default WebcamFeed;
