import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header.jsx";
import useHandDetection from "../hooks/useHandDetection.jsx";

const HOLD_TIME = 1000;

const FingerspellMode = () => {
  const navigate = useNavigate();
  const [currentLetter, setCurrentLetter] = useState("—");
  const [sentence, setSentence] = useState("");
  const holdStartRef = useRef(null);
  const holdGestureRef = useRef(null);
  const [holdProgress, setHoldProgress] = useState(0);
  const rafRef = useRef(null);

  const actions = { next: "Add letter", space: "Add space", delete: "Delete last", clear: "Clear all" };

  const applyAction = (action) => {
    if (action === "next") setSentence(s => s + currentLetter);
    else if (action === "space") setSentence(s => s + " ");
    else if (action === "delete") setSentence(s => s.slice(0, -1));
    else if (action === "clear") setSentence("");
  };

  const onPrediction = (g, c) => {
    if (c < 0.7) { holdStartRef.current = null; holdGestureRef.current = null; return; }
    if (["next", "space", "delete", "clear"].includes(g)) {
      if (holdGestureRef.current !== g) { holdGestureRef.current = g; holdStartRef.current = Date.now(); }
    } else {
      setCurrentLetter(g || "—");
      holdStartRef.current = null;
      holdGestureRef.current = null;
    }
  };

  useEffect(() => {
    const tick = () => {
      if (holdStartRef.current) {
        const pct = Math.min((Date.now() - holdStartRef.current) / HOLD_TIME, 1);
        setHoldProgress(pct);
        if (pct >= 1) {
          applyAction(holdGestureRef.current);
          holdStartRef.current = null;
          holdGestureRef.current = null;
          setHoldProgress(0);
        }
      } else setHoldProgress(0);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [currentLetter]);

  const { videoRef, cameraReady, gesture, confidence } = useHandDetection({ onPrediction, predictInterval: 500 });

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8 flex flex-col items-center gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Fingerspell Mode</h1>
          <p className="text-slate-600 text-sm">Sign letters to build your sentence</p>
        </div>

        <div className="w-[480px] h-[320px] rounded-xl border-2 border-slate-300 overflow-hidden bg-slate-200 relative">
          <video ref={videoRef} className="w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} autoPlay playsInline muted />
          {!cameraReady && <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm">Starting camera…</div>}
        </div>

        <div className="text-center">
          <div className="text-6xl font-bold text-amber-500">{currentLetter}</div>
          <p className="text-slate-500 text-xs mt-1">Confidence: {(confidence * 100).toFixed(1)}%</p>
        </div>

        <div className="w-full max-w-lg bg-white border border-slate-200 rounded-xl p-4 min-h-[60px]">
          <p className="text-slate-400 text-xs mb-1">Built sentence:</p>
          <p className="text-lg text-slate-900 font-medium break-words">{sentence || <span className="text-slate-400 italic">Start signing…</span>}</p>
        </div>

        <div className="flex gap-3">
          {Object.entries(actions).map(([key, label]) => (
            <button key={key} onClick={() => applyAction(key)} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition">{label}</button>
          ))}
        </div>

        {holdProgress > 0 && (
          <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${holdProgress * 100}%` }} />
          </div>
        )}

        <div className="bg-white border border-slate-200 rounded-xl p-4 w-full max-w-lg text-sm text-slate-600">
          <p className="font-semibold text-slate-900 mb-2">Gesture Instructions</p>
          <ul className="space-y-1">
            <li>👍 <strong>Thumbs up</strong> — Add current letter</li>
            <li>✋ <strong>Open palm</strong> — Add space</li>
            <li>👊 <strong>Fist</strong> — Delete last character</li>
            <li>🖐️ <strong>Starfish</strong> — Clear all</li>
          </ul>
        </div>

        <button onClick={() => navigate("/")} className="text-sm text-amber-600 hover:text-amber-700 font-medium">← Back to Mode Selection</button>
      </main>
    </div>
  );
};

export default FingerspellMode;
