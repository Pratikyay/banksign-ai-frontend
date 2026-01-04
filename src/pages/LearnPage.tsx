import { useState } from "react";
import Header from "@/components/Header";
import SignList, { Sign } from "@/components/SignList";
import SignDemonstration from "@/components/SignDemonstration";

const LearnPage = () => {
  const [selectedSign, setSelectedSign] = useState<Sign | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">Learn How to Sign</h1>

        <div className="grid lg:grid-cols-[350px_1fr] gap-6">
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
    </div>
  );
};

export default LearnPage;
