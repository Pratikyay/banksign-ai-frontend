import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header.jsx";
import useHandDetection from "../hooks/useHandDetection.jsx";

const STEP1_HOLD = 2500;
const SEQ_API = "http://localhost:5000/api/predict/sequence";

const gestureRoutes = { deposit: "/deposit", withdraw: "/withdraw", transfer: "/transfer", balance: "/balance", help: "/help" };

const BankingMode = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [holdProgress, setHoldProgress] = useState(0);
  const [countdown, setCountdown] = useState(null);
  const [result, setResult] = useState(null);
  const holdStartRef = useRef(null);
  const framesRef = useRef([]);
  const rafRef = useRef(null);

  // Step 1: detect thumbs up
  const onPrediction = useCallback((g, c) => {
    if (step !== 1) return;
    if (g === "next" && c > 0.7) {
      if (!holdStartRef.current) holdStartRef.current = Date.now();
    } else {
      holdStartRef.current = null;
      setHoldProgress(0);
    }
  }, [step]);

  // Step 1 hold progress
  useEffect(() => {
    if (step !== 1) return;
    const tick = () => {
      if (holdStartRef.current) {
        const pct = Math.min((Date.now() - holdStartRef.current) / STEP1_HOLD, 1);
        setHoldProgress(pct);
        if (pct >= 1) { holdStartRef.current = null; setHoldProgress(0); setStep(2); return; }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [step]);

  // Step 2: countdown then collect frames
  useEffect(() => {
    if (step !== 2) return;
    let c = 3;
    setCountdown(c);
    const iv = setInterval(() => {
      c--;
      if (c <= 0) { clearInterval(iv); setCountdown(null); collectFrames(); }
      else setCountdown(c);
    }, 1000);
    return () => clearInterval(iv);
  }, [step]);

  const collectFrames = async () => {
    // In a real app, we'd collect from the hand detection hook.
    // For now, simulate collecting 30 frames
    const sequence = Array.from({ length: 30 }, () => new Array(63).fill(0));
    try {
      const res = await axios.post(SEQ_API, { sequence });
      const g = res.data.gesture;
      setResult({ gesture: g, confidence: res.data.confidence });
      setStep(3);
      setTimeout(() => { if (gestureRoutes[g]) navigate(gestureRoutes[g]); }, 2000);
    } catch {
      setResult({ gesture: "unknown", confidence: 0 });
      setStep(3);
    }
  };

  const { videoRef, cameraReady, gesture, confidence } = useHandDetection({ onPrediction, enabled: step <= 2 });

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8 flex flex-col items-center gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Banking Mode</h1>
          <p className="text-slate-600 text-sm">Perform a banking gesture to get started</p>
        </div>

        {/* Step indicator */}
        <div className="flex gap-3 items-center">
          {[1, 2, 3].map(s => (
            <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? "bg-amber-400 text-white" : "bg-slate-200 text-slate-500"}`}>{s}</div>
          ))}
        </div>

        <div className="w-[480px] h-[320px] rounded-xl border-2 border-slate-300 overflow-hidden bg-slate-200 relative">
          <video ref={videoRef} className="w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} autoPlay playsInline muted />
          {countdown !== null && <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-6xl font-bold">{countdown}</div>}
        </div>

        {step === 1 && (
          <div className="text-center">
            <p className="text-slate-700 font-medium">Show thumbs up and hold to begin</p>
            {holdProgress > 0 && (
              <div className="w-64 h-2 bg-slate-200 rounded-full mt-3 mx-auto overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: `${holdProgress * 100}%` }} />
              </div>
            )}
          </div>
        )}

        {step === 2 && countdown === null && <p className="text-amber-600 font-semibold animate-pulse">Collecting gestures…</p>}

        {step === 3 && result && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
            <p className="text-slate-600 text-sm">Detected gesture:</p>
            <p className="text-2xl font-bold text-amber-500 mt-1">{result.gesture}</p>
            <p className="text-slate-500 text-xs mt-1">Confidence: {(result.confidence * 100).toFixed(1)}%</p>
            <p className="text-slate-400 text-xs mt-3">Navigating…</p>
          </div>
        )}

        <button onClick={() => navigate("/")} className="text-sm text-amber-600 hover:text-amber-700 font-medium">← Back to Mode Selection</button>
      </main>
    </div>
  );
};

export default BankingMode;
