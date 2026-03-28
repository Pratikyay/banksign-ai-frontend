import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-900">404</h1>
        <p className="text-slate-600 mt-2">Page Not Found</p>
        <button onClick={() => navigate("/")} className="mt-6 bg-amber-400 hover:bg-amber-500 text-white font-semibold px-6 py-3 rounded-lg transition">
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
