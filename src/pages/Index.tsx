import Header from "@/components/Header";
import WebcamFeed from "@/components/WebcamFeed";
import DetectedTextOutput from "@/components/DetectedTextOutput";
import FloatingChatButton from "@/components/FloatingChatButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
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
