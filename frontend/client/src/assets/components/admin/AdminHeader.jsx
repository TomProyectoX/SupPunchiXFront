import { useNavigate } from "react-router-dom";

export default function AdminHeader() {
  const navigate = useNavigate();

  return (
    <header className="ml-64 bg-[#0A0A0A] border-b border-gray-700 px-8 py-4 flex items-center justify-between sticky top-0 z-40">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="bg-[#CCFF00] text-black px-4 py-2 text-xs uppercase font-black transition-colors hover:bg-white"
      >
        Home
      </button>

      {/* Right Actions */}
      <div className="flex items-center gap-6 ml-auto">

        {/* Notifications */}
        <button className="text-gray-400 hover:text-[#CCFF00] transition-colors">
          ◯
        </button>

        {/* Settings */}
        <button className="text-gray-400 hover:text-[#CCFF00] transition-colors">
          ⚙
        </button>
      </div>
    </header>
  );
}
