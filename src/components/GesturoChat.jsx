import { useState, useRef, useEffect } from "react";

const responses = [
  "BankSignAI translates sign language in real-time to help bank customers communicate effectively.",
  "You can use the webcam on the main screen to detect and translate sign language gestures.",
  "Check out the 'Learn Signs' section for tutorials on common banking-related signs.",
  "I can help you understand how to use this system. What would you like to know?",
  "The system supports gestures like 'deposit', 'withdraw', 'balance inquiry', and more.",
  "To navigate, simply sign the corresponding number and hold for a moment.",
  "If you need assistance, go to the Help menu and sign 3 to call staff.",
];

const GesturoChat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: "1", role: "assistant", text: "Hello! 👋 I'm Gesturo, your ASL assistant. How can I help?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now().toString(), role: "user", text: input };
    setMessages(m => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, { id: (Date.now() + 1).toString(), role: "assistant", text: responses[Math.floor(Math.random() * responses.length)] }]);
    }, 1000);
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-20 right-4 w-[320px] h-[400px] bg-white border border-navy-100 rounded-2xl shadow-xl flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-gold-400 px-4 py-3 flex items-center justify-between">
            <div>
              <p className="font-bold text-white text-sm">Gesturo</p>
              <p className="text-gold-100 text-xs">Your ASL Assistant</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white text-xl leading-none">&times;</button>
          </div>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-navy-50">
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${m.role === "user" ? "bg-gold-400 text-white rounded-br-sm" : "bg-white border border-navy-100 text-navy-600 rounded-bl-sm"}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-white border border-navy-100 rounded-xl px-3 py-2 flex gap-1">
                  <span className="w-2 h-2 bg-navy-300 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-navy-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-navy-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          {/* Input */}
          <form onSubmit={(e) => { e.preventDefault(); send(); }} className="p-3 border-t border-navy-100 flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message…" className="flex-1 border border-navy-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400" />
            <button type="submit" disabled={!input.trim()} className="bg-gold-400 hover:bg-gold-500 text-white px-3 py-2 rounded-lg text-sm font-medium disabled:opacity-50 transition">Send</button>
          </form>
        </div>
      )}

      {/* FAB */}
      <button onClick={() => setOpen(!open)} className="fixed bottom-4 right-4 w-14 h-14 bg-gold-400 hover:bg-gold-500 text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-transform hover:scale-105" aria-label="Chat">
        {open ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
        )}
      </button>

      {!open && (
        <span className="fixed bottom-[60px] right-4 flex h-3 w-3 z-50 pointer-events-none">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-gold-500" />
        </span>
      )}
    </>
  );
};

export default GesturoChat;
