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
    <div className="min-h-screen bg-navy-50">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8 flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold text-navy-900">Check Balance</h1>

        <div className="flex gap-2">
          {[1, 2, 3].map(s => (
            <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? "bg-gold-400 text-white" : "bg-navy-100 text-navy-500"}`}>{s}</div>
          ))}
        </div>

        {step === 1 && (
          <SignNumberInput label="Sign your account number" onComplete={(val) => { setAccount(val); setStep(2); }} />
        )}

        {step === 2 && (
          <div className="w-full max-w-lg space-y-6">
            {/* Customer section */}
            <div className="bg-white border border-navy-100 rounded-xl p-6 text-center">
              <p className="text-navy-500 text-sm">Account Number</p>
              <p className="text-3xl font-bold text-navy-900 tracking-widest mt-1">{account}</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-navy-200" />
              <span className="text-xs text-navy-500 font-medium">— Receptionist Section —</span>
              <div className="flex-1 h-px bg-navy-200" />
            </div>

            {/* Receptionist section */}
            <div className="bg-white border border-navy-100 rounded-xl p-6">
              <label className="block text-sm text-navy-500 mb-2">Enter balance amount</label>
              <input
                type="text"
                value={balanceInput}
                onChange={(e) => setBalanceInput(e.target.value)}
                placeholder="e.g. 5000.00"
                className="w-full border border-navy-200 rounded-lg px-4 py-3 text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              />
              <button
                onClick={() => { setBalance(balanceInput); setStep(3); }}
                disabled={!balanceInput}
                className="w-full mt-4 bg-gold-400 hover:bg-gold-500 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Show Balance
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white border border-navy-100 rounded-xl p-10 text-center max-w-md w-full">
            <p className="text-navy-500 text-sm">Available Balance</p>
            <p className="text-5xl font-bold text-gold-500 mt-2">${parseFloat(balance || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
            <p className="text-navy-300 text-sm mt-3">Account: {account}</p>
            <p className="text-xs text-navy-300 mt-6">Sign 1 to return to main menu</p>
          </div>
        )}

        <button onClick={() => navigate("/")} className="text-sm text-gold-500 hover:text-gold-600 font-medium">← Back to Mode Selection</button>
      </main>
    </div>
  );
};

export default BalanceScreen;
