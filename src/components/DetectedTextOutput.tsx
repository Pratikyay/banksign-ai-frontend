import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, Trash2 } from "lucide-react";

const DetectedTextOutput = () => {
  const [detectedText, setDetectedText] = useState<string>("");

  const handleTextToSpeech = () => {
    if (detectedText && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(detectedText);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleClear = () => {
    setDetectedText("");
  };

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Detected Sign Language:</h3>
        <div className="min-h-[80px] bg-muted/50 rounded-lg p-4 border border-border">
          {detectedText ? (
            <p className="text-foreground">{detectedText}</p>
          ) : (
            <p className="text-muted-foreground italic">Text output will appear here...</p>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <Button 
          onClick={handleTextToSpeech}
          disabled={!detectedText}
          className="flex items-center gap-2"
        >
          <Volume2 className="w-4 h-4" />
          Text-to-Speech
        </Button>
        <Button 
          onClick={handleClear}
          variant="secondary"
          className="flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </Button>
      </div>
    </div>
  );
};

export default DetectedTextOutput;
