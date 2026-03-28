import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header.jsx";
import useHandDetection from "../hooks/useHandDetection.jsx";

const HOLD_TIME = 1500;

const HelpMenu = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(null);
  const [holdProgress, setHoldProgress] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const holdStartRef = useRef(null);
  const holdGestureRef = useRef(null);
  const rafRef = useRef(null);

  const onPrediction = (g, c) => {
    if (c < 0.7) { holdStartRef.current = null; holdGestureRef.current = null; setActiveCard(null); return; }
    if (["1", "2", "3"].includes(g)) {
      setActiveCard(parseInt(g));
      if (holdGestureRef.current !== g) { holdGestureRef.current = g; holdStartRef.current = Date.now(); }
    } else {
      holdStartRef.current = null;
      holdGestureRef.current = null;
      setActiveCard(null);
    }
  };

  useEffect(() => {
    const tick = () => {
      if (holdStartRef.current) {
        const pct = Math.min((Date.now() - holdStartRef.current) / HOLD_TIME, 1);
        setHoldProgress(pct);
        if (pct >= 1) {
          const g = holdGestureRef.current;
          holdStartRef.current = null;
          holdGestureRef.current = null;
          setHoldProgress(0);
          if (g === "1") setShowTutorial(true);
          else if (g === "2") navigate("/learn");
          else if (g === "3") setShowAlert(true);
        }
      } else setHoldProgress(0);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [navigate]);

  const { videoRef, cameraReady } = useHandDetection({ onPrediction });

  const cards = [
    { id: 1, icon: "📖", title: "How to use this system", sub: "Sign 1 to select" },
    { id: 2, icon: "🤟", title: "Learn how to sign", sub: "Sign 2 to select" },
    { id: 3, icon: "🔔", title: "Call for assistance", sub: "Sign 3 to select" },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8 flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold text-slate-900">I Need Assistance</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          {cards.map(c => (
            <div key={c.id} className={`bg-white border-2 rounded-xl p-6 text-center transition-all ${activeCard === c.id ? "border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.3)]" : "border-slate-200"}`}>
              <div className="text-4xl mb-2">{c.icon}</div>
              <h3 className="font-bold text-slate-900">{c.title}</h3>
              <span className="inline-block mt-2 bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full">{c.sub}</span>
            </div>
          ))}
        </div>

        <div className="w-[360px] h-[220px] rounded-xl border-2 border-slate-300 overflow-hidden bg-slate-200">
          <video ref={videoRef} className="w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} autoPlay playsInline muted />
        </div>

        {holdProgress > 0 && (
          <div className="w-64 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${holdProgress * 100}%` }} />
          </div>
        )}

        {showTutorial && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <h2 className="text-xl font-bold text-slate-900 mb-4">How to Use BankSignAI</h2>
              <ol className="text-slate-600 text-sm space-y-2 list-decimal pl-5">
                <li>Choose a mode: Fingerspell or Banking</li>
                <li>Position your hands in front of the camera</li>
                <li>Hold gestures for the required time to confirm</li>
                <li>Follow on-screen instructions for each step</li>
              </ol>
              <button onClick={() => setShowTutorial(false)} className="mt-6 w-full bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 rounded-lg">Close</button>
            </div>
          </div>
        )}

        {showAlert && (
          <div className="bg-green-50 border border-green-300 rounded-xl p-4 text-center">
            <p className="text-green-700 font-semibold">✅ Staff has been notified. Someone will assist you shortly.</p>
          </div>
        )}

        <button onClick={() => navigate("/")} className="text-sm text-amber-600 hover:text-amber-700 font-medium">← Back to Mode Selection</button>
      </main>
    </div>
  );
};

export default HelpMenu;
