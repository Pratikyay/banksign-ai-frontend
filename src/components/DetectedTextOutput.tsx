import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, Trash2, MessageSquare, Copy, Check } from "lucide-react";

const DetectedTextOutput = () => {
  const [detectedText, setDetectedText] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const handleTextToSpeech = () => {
    if (detectedText && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(detectedText);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleClear = () => {
    setDetectedText("");
  };

  const handleCopy = async () => {
    if (detectedText) {
      await navigator.clipboard.writeText(detectedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="card-elevated p-6 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Detected Sign Language</h3>
          <p className="text-sm text-muted-foreground">Real-time translation output</p>
        </div>
      </div>

      <div className="min-h-[100px] bg-muted/30 rounded-xl p-5 border border-border/50 relative group">
        {detectedText ? (
          <p className="text-foreground text-lg leading-relaxed">{detectedText}</p>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-4">
            <p className="text-muted-foreground text-center">
              Translated text will appear here as you sign...
            </p>
          </div>
        )}
        
        {detectedText && (
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-2 rounded-lg bg-card hover:bg-muted transition-colors opacity-0 group-hover:opacity-100"
          >
            {copied ? (
              <Check className="w-4 h-4 text-success" />
            ) : (
              <Copy className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button 
          onClick={handleTextToSpeech}
          disabled={!detectedText}
          className="gap-2 btn-glow"
        >
          <Volume2 className="w-4 h-4" />
          Text-to-Speech
        </Button>
        <Button 
          onClick={handleClear}
          variant="secondary"
          className="gap-2"
          disabled={!detectedText}
        >
          <Trash2 className="w-4 h-4" />
          Clear Output
        </Button>
      </div>
    </div>
  );
};

export default DetectedTextOutput;
