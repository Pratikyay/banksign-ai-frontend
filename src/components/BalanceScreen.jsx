import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header.jsx";
import SignNumberInput from "./SignNumberInput.jsx";
import useHandDetection from "../hooks/useHandDetection.jsx";

const BalanceScreen = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [balanceInput, setBalanceInput] = useState("");

  const onStep3Prediction = (g, c) => {
    if (step !== 3) return;
    if (g === "1" && c > 0.7) {
      navigate("/");
    }
  };

  const { videoRef: step3VideoRef } = useHandDetection({ onPrediction: onStep3Prediction, enabled: step === 3 });

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8 flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold text-slate-900">Check Balance</h1>

        <div className="flex gap-2">
          {[1, 2, 3].map(s => (
            <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? "bg-amber-400 text-white" : "bg-slate-200 text-slate-500"}`}>{s}</div>
          ))}
        </div>

        {step === 1 && (
          <SignNumberInput label="Sign your account number" onComplete={(val) => { setAccount(val); setStep(2); }} />
        )}

        {step === 2 && (
          <div className="w-full max-w-lg space-y-6">
            {/* Customer section */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
              <p className="text-slate-600 text-sm">Account Number</p>
              <p className="text-3xl font-bold text-slate-900 tracking-widest mt-1">{account}</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-300" />
              <span className="text-xs text-slate-500 font-medium">— Receptionist Section —</span>
              <div className="flex-1 h-px bg-slate-300" />
            </div>

            {/* Receptionist section */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <label className="block text-sm text-slate-600 mb-2">Enter balance amount</label>
              <input
                type="text"
                value={balanceInput}
                onChange={(e) => setBalanceInput(e.target.value)}
                placeholder="e.g. 5000.00"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
              <button
                onClick={() => { setBalance(balanceInput); setStep(3); }}
                disabled={!balanceInput}
                className="w-full mt-4 bg-amber-400 hover:bg-amber-500 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Show Balance
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white border border-slate-200 rounded-xl p-10 text-center max-w-md w-full">
            <p className="text-slate-500 text-sm">Available Balance</p>
            <p className="text-5xl font-bold text-amber-500 mt-2">${parseFloat(balance || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
            <p className="text-slate-400 text-sm mt-3">Account: {account}</p>
            <p className="text-xs text-slate-400 mt-6">Sign 1 to return to main menu</p>
          </div>
        )}

        <button onClick={() => navigate("/")} className="text-sm text-amber-600 hover:text-amber-700 font-medium">← Back to Mode Selection</button>
      </main>
    </div>
  );
};

export default BalanceScreen;
