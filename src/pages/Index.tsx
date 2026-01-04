import { useState } from "react";
import Header from "@/components/Header";
import WebcamFeed from "@/components/WebcamFeed";
import DetectedTextOutput from "@/components/DetectedTextOutput";
import AIAssistantPanel from "@/components/AIAssistantPanel";

const Index = () => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenAssistant={() => setIsAssistantOpen(true)} />

      <main className="container py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Webcam Feed */}
          <WebcamFeed />

          {/* Detected Text Output */}
          <DetectedTextOutput />
        </div>
      </main>

      {/* AI Assistant Panel */}
      <AIAssistantPanel 
        isOpen={isAssistantOpen} 
        onClose={() => setIsAssistantOpen(false)} 
      />

      {/* Backdrop when assistant is open */}
      {isAssistantOpen && (
        <div 
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
          onClick={() => setIsAssistantOpen(false)}
        />
      )}
    </div>
  );
};

export default Index;
