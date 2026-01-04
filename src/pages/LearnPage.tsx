import { useState } from "react";
import Header from "@/components/Header";
import SignList, { Sign } from "@/components/SignList";
import SignDemonstration from "@/components/SignDemonstration";
import FloatingChatButton from "@/components/FloatingChatButton";
import { BookOpen, Sparkles } from "lucide-react";

const LearnPage = () => {
  const [selectedSign, setSelectedSign] = useState<Sign | null>(null);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-40 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <Header />

      <main className="relative container py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            Interactive Learning
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Learn Banking Signs</h1>
          <p className="text-muted-foreground text-lg">Master essential sign language gestures for banking transactions</p>
        </div>

        <div className="grid lg:grid-cols-[380px_1fr] gap-6">
          {/* Sign List */}
          <div>
            <SignList 
              onSelectSign={setSelectedSign} 
              selectedSign={selectedSign} 
            />
          </div>

          {/* Demonstration Area */}
          <div>
            <SignDemonstration sign={selectedSign} />
          </div>
        </div>
      </main>

      <FloatingChatButton />
    </div>
  );
};

export default LearnPage;
