import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); console.log("Auth:", form); };

  return (
    <div className="min-h-screen bg-navy-50 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white border border-navy-100 rounded-2xl p-8 w-full max-w-md shadow-sm">
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-navy-900 mb-1">BankSignAI</div>
            <p className="text-navy-500 text-sm">{isLogin ? "Sign in to your account" : "Create a new account"}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-navy-600 mb-1">Full Name</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className="w-full border border-navy-200 rounded-lg px-4 py-3 text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-400" required />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-navy-600 mb-1">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="w-full border border-navy-200 rounded-lg px-4 py-3 text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-400" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-600 mb-1">Password</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••" className="w-full border border-navy-200 rounded-lg px-4 py-3 text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-400" required />
            </div>
            <button type="submit" className="w-full bg-gold-400 hover:bg-gold-500 text-white font-semibold py-3 rounded-lg transition">
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-gold-500 hover:text-gold-600 font-medium">
              {isLogin ? "Don't have an account? Register" : "Already have an account? Sign In"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;
