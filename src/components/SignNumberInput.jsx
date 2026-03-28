import { useState, useRef, useEffect } from "react";
import useHandDetection from "../hooks/useHandDetection.jsx";

const HOLD_TIME = 1000;

const SignNumberInput = ({ label, onComplete, enabled = true }) => {
  const [digits, setDigits] = useState("");
  const [currentDigit, setCurrentDigit] = useState("—");
  const holdStartRef = useRef(null);
  const holdGestureRef = useRef(null);
  const [holdProgress, setHoldProgress] = useState(0);
  const rafRef = useRef(null);

  const onPrediction = (g, c) => {
    if (c < 0.7) { holdStartRef.current = null; holdGestureRef.current = null; return; }
    if (g === "next") {
      if (holdGestureRef.current !== "next") { holdGestureRef.current = "next"; holdStartRef.current = Date.now(); }
    } else if (/^\d$/.test(g)) {
      setCurrentDigit(g);
      if (holdGestureRef.current !== g) { holdGestureRef.current = g; holdStartRef.current = Date.now(); }
    } else {
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
          const g = holdGestureRef.current;
          if (g === "next") onComplete?.(digits);
          else setDigits(d => d + g);
          holdStartRef.current = null;
          holdGestureRef.current = null;
          setHoldProgress(0);
        }
      } else setHoldProgress(0);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [digits, onComplete]);

  const { videoRef, cameraReady, gesture, confidence } = useHandDetection({ onPrediction, enabled });

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-slate-700 font-medium">{label}</p>
      <div className="w-[360px] h-[220px] rounded-xl border-2 border-slate-300 overflow-hidden bg-slate-200 relative">
        <video ref={videoRef} className="w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} autoPlay playsInline muted />
      </div>
      <div className="flex gap-4 text-sm text-slate-600">
        <span>Gesture: <strong className="text-slate-900">{gesture}</strong></span>
        <span>Confidence: <strong>{(confidence * 100).toFixed(1)}%</strong></span>
      </div>
      <div className="text-3xl font-bold text-slate-900 tracking-widest bg-white border border-slate-200 rounded-xl px-6 py-3 min-w-[200px] text-center">
        {digits || <span className="text-slate-300">_ _ _ _</span>}
      </div>
      {holdProgress > 0 && (
        <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-amber-400 rounded-full" style={{ width: `${holdProgress * 100}%` }} />
        </div>
      )}
      <p className="text-xs text-slate-500">Sign digits, then "thumbs up" to confirm</p>
    </div>
  );
};

export default SignNumberInput;
