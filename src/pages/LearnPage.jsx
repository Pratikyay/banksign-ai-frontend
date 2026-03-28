import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";

const signs = [
  { name: "0", emoji: "✊", instruction: "Make a fist with thumb wrapped around fingers" },
  { name: "1", emoji: "☝️", instruction: "Extend index finger up, other fingers folded" },
  { name: "2", emoji: "✌️", instruction: "Extend index and middle fingers in a V shape" },
  { name: "3", emoji: "🤟", instruction: "Extend thumb, index, and middle fingers" },
  { name: "4", emoji: "🖖", instruction: "Extend four fingers, thumb folded across palm" },
  { name: "5", emoji: "🖐️", instruction: "All five fingers extended and spread apart" },
  { name: "6", emoji: "🤙", instruction: "Touch pinky to thumb, other fingers extended" },
  { name: "7", emoji: "🤞", instruction: "Touch ring finger to thumb, others extended" },
  { name: "8", emoji: "🤘", instruction: "Touch middle finger to thumb, others extended" },
  { name: "9", emoji: "👌", instruction: "Touch index to thumb, other fingers extended" },
  { name: "A", emoji: "✊", instruction: "Fist with thumb on the side of fingers" },
  { name: "B", emoji: "🤚", instruction: "Flat hand, fingers together, thumb tucked" },
  { name: "C", emoji: "🫲", instruction: "Curved hand forming a C shape" },
  { name: "D", emoji: "👆", instruction: "Index up, other fingers touch thumb in circle" },
  { name: "E", emoji: "✊", instruction: "Fingers curled down, thumb tucked under" },
  { name: "Thumbs Up (Next)", emoji: "👍", instruction: "Thumb up — confirms action or adds letter" },
  { name: "Starfish (Clear)", emoji: "🖐️", instruction: "All fingers spread wide — clears input" },
  { name: "Horns (Z)", emoji: "🤘", instruction: "Index and pinky extended — represents Z" },
];

const LearnPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = signs.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Learn ASL Signs</h1>
          <p className="text-slate-600 mt-1">Master the gestures used in BankSignAI</p>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search signs…"
            className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map(s => (
            <div key={s.name} className="bg-white border border-slate-200 rounded-xl p-4 text-center hover:border-amber-400 hover:shadow-md transition-all">
              <div className="text-4xl mb-2">{s.emoji}</div>
              <h3 className="font-bold text-slate-900 text-sm">{s.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{s.instruction}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button onClick={() => navigate("/")} className="text-sm text-amber-600 hover:text-amber-700 font-medium">← Back to Mode Selection</button>
        </div>
      </main>
    </div>
  );
};

export default LearnPage;
