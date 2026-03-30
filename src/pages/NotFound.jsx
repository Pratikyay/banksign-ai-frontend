import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-navy-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-navy-900">404</h1>
        <p className="text-navy-500 mt-2">Page Not Found</p>
        <button onClick={() => navigate("/")} className="mt-6 bg-gold-400 hover:bg-gold-500 text-white font-semibold px-6 py-3 rounded-lg transition">
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
