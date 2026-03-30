import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header.jsx";
import SignNumberInput from "./SignNumberInput.jsx";
import useHandDetection from "../hooks/useHandDetection.jsx";

const TransferForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [account, setAccount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [idChoice, setIdChoice] = useState(null);

  const onIdPrediction = (g, c) => {
    if (c < 0.7) return;
    if (g === "1") setIdChoice("yes");
    else if (g === "2") setIdChoice("no");
  };

  const { videoRef: idVideoRef } = useHandDetection({ onPrediction: onIdPrediction, enabled: step === 4 && idChoice === null });

  return (
    <div className="min-h-screen bg-navy-50">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8 flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold text-navy-900">Transfer Money</h1>

        <div className="flex gap-2">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? "bg-gold-400 text-white" : "bg-navy-100 text-navy-500"}`}>{s}</div>
          ))}
        </div>

        {step === 1 && <SignNumberInput label="Sign your account number" onComplete={(val) => { setAccount(val); setStep(2); }} />}
        {step === 2 && <SignNumberInput label="Sign recipient account number" onComplete={(val) => { setRecipient(val); setStep(3); }} />}
        {step === 3 && <SignNumberInput label="Sign the amount" onComplete={(val) => { setAmount(val); setStep(4); }} />}

        {step === 4 && idChoice === null && (
          <div className="text-center">
            <p className="text-navy-600 font-medium mb-2">Do you have your ID?</p>
            <p className="text-navy-500 text-sm">Sign 1 for Yes, Sign 2 for No</p>
            <div className="w-[360px] h-[220px] rounded-xl border-2 border-navy-200 overflow-hidden bg-navy-100 mt-4 mx-auto">
              <video ref={idVideoRef} className="w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} autoPlay playsInline muted />
            </div>
          </div>
        )}

        {step === 4 && idChoice === "yes" && (
          <div className="bg-white border border-navy-100 rounded-xl p-8 text-center">
            <div className="text-4xl mb-3">✅</div>
            <h2 className="text-xl font-bold text-navy-900">Transfer Request Submitted</h2>
            <p className="text-navy-500 mt-2">From: {account} → To: {recipient} | Amount: ${amount}</p>
          </div>
        )}

        {step === 4 && idChoice === "no" && (
          <div className="bg-white border border-navy-100 rounded-xl p-8 text-center">
            <div className="text-4xl mb-3">🏢</div>
            <h2 className="text-xl font-bold text-navy-900">Please Visit the Counter</h2>
            <p className="text-navy-500 mt-2">ID verification is required for transfers.</p>
          </div>
        )}

        <button onClick={() => navigate("/")} className="text-sm text-gold-500 hover:text-gold-600 font-medium">← Back to Mode Selection</button>
      </main>
    </div>
  );
};

export default TransferForm;
