import Header from "@/components/Header";
import WebcamFeed from "@/components/WebcamFeed";
import DetectedTextOutput from "@/components/DetectedTextOutput";
import FloatingChatButton from "@/components/FloatingChatButton";
import { Hand, Sparkles, Shield, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/8 rounded-full blur-3xl" />
      </div>

      <Header />

      <main className="relative container py-8">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto mb-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              AI-Powered Sign Language Translation
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Real-Time Sign Language
              <span className="text-gradient-accent"> Detection</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Breaking communication barriers in banking with instant sign language translation
            </p>
          </div>

          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border shadow-sm">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Instant Translation</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border shadow-sm">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Bank-Grade Security</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border shadow-sm">
              <Hand className="w-4 h-4 text-success" />
              <span className="text-sm font-medium">Easy to Use</span>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto space-y-6">
          {/* Webcam Feed */}
          <WebcamFeed />

          {/* Detected Text Output */}
          <DetectedTextOutput />
        </div>
      </main>

      {/* Floating Chat Button */}
      <FloatingChatButton />
    </div>
  );
};

export default Index;
