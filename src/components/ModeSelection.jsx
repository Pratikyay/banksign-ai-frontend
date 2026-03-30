import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header.jsx";
import useHandDetection from "../hooks/useHandDetection.jsx";

const HOLD_TIME = 1500;

const ModeSelection = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(null);
  const [holdProgress, setHoldProgress] = useState(0);
  const holdStartRef = useRef(null);
  const holdGestureRef = useRef(null);
  const rafRef = useRef(null);

  const onPrediction = (g, c) => {
    if (c < 0.7) {
      resetHold();
      setActiveCard(null);
      return;
    }
    if (g === "1" || g === "2") {
      setActiveCard(g === "1" ? 1 : 2);
      if (holdGestureRef.current !== g) {
        holdGestureRef.current = g;
        holdStartRef.current = Date.now();
      }
    } else {
      resetHold();
      setActiveCard(null);
    }
  };

  const resetHold = () => {
    holdStartRef.current = null;
    holdGestureRef.current = null;
    setHoldProgress(0);
  };

  useEffect(() => {
    const tick = () => {
      if (holdStartRef.current) {
        const elapsed = Date.now() - holdStartRef.current;
        const pct = Math.min(elapsed / HOLD_TIME, 1);
        setHoldProgress(pct);
        if (pct >= 1) {
          const g = holdGestureRef.current;
          resetHold();
          navigate(g === "1" ? "/fingerspell" : "/banking");
          return;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [navigate]);

  const { videoRef, cameraReady, gesture, confidence } = useHandDetection({ onPrediction });

  return (
    <div className="min-h-screen bg-navy-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-10 flex flex-col items-center gap-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-navy-900">Select Your Mode</h1>
          <p className="text-navy-500 mt-1">Sign 1 or 2 to choose your experience</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
          {/* Card 1 */}
          <div className={`bg-white border-2 rounded-2xl p-6 transition-all duration-300 ${activeCard === 1 ? "border-gold-400 shadow-[0_0_20px_rgba(251,191,36,0.3)]" : "border-navy-100"}`}>
            <div className="text-4xl mb-3">👋</div>
            <h2 className="text-lg font-bold text-navy-900">Fingerspell Conversation</h2>
            <p className="text-navy-500 text-sm mt-1">Sign letter by letter to build sentences</p>
            <span className="inline-block mt-3 bg-gold-100 text-gold-600 text-xs font-semibold px-3 py-1 rounded-full">Sign 1 to select</span>
          </div>
          {/* Card 2 */}
          <div className={`bg-white border-2 rounded-2xl p-6 transition-all duration-300 ${activeCard === 2 ? "border-gold-400 shadow-[0_0_20px_rgba(251,191,36,0.3)]" : "border-navy-100"}`}>
            <div className="text-4xl mb-3">🏦</div>
            <h2 className="text-lg font-bold text-navy-900">Banking Interaction</h2>
            <p className="text-navy-500 text-sm mt-1">Complete banking tasks step by step</p>
            <span className="inline-block mt-3 bg-gold-100 text-gold-600 text-xs font-semibold px-3 py-1 rounded-full">Sign 2 to select</span>
          </div>
        </div>

        {/* Webcam */}
        <div className="w-[360px] h-[220px] rounded-xl border-2 border-navy-200 overflow-hidden bg-navy-100 relative">
          <video ref={videoRef} className="w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} autoPlay playsInline muted />
          {!cameraReady && <div className="absolute inset-0 flex items-center justify-center text-navy-500 text-sm">Starting camera…</div>}
        </div>
        <p className="text-sm text-navy-500">{cameraReady ? "📷 Camera active" : "Connecting to camera…"}</p>

        <div className="flex gap-8 text-sm">
          <span className="text-navy-500">Current Gesture: <strong className="text-navy-900">{gesture}</strong></span>
          <span className="text-navy-500">Confidence: <strong className="text-navy-900">{(confidence * 100).toFixed(1)}%</strong></span>
        </div>

        {/* Hold progress */}
        {holdProgress > 0 && (
          <div className="w-64 h-2 bg-navy-100 rounded-full overflow-hidden">
            <div className="h-full bg-gold-400 transition-all duration-100 rounded-full" style={{ width: `${holdProgress * 100}%` }} />
          </div>
        )}
      </main>
    </div>
  );
};

export default ModeSelection;
