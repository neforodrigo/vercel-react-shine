import { BarChart2, Home, PlusCircle, User, Users } from "lucide-react";

export function BottomNav({
  activeTab,
  setActiveTab,
  openLogModal,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openLogModal: () => void;
}) {
  const item = (tab: string) =>
    `flex flex-col items-center gap-1 p-2 transition-colors ${
      activeTab === tab ? "text-orange-500" : "text-gray-500 hover:text-gray-300"
    }`;

  return (
    <nav className="fixed md:absolute bottom-0 w-full max-w-md bg-gray-950/90 backdrop-blur-md border-t border-gray-800 px-6 py-3">
      <div className="flex justify-between items-center relative">
        <button onClick={() => setActiveTab("feed")} className={item("feed")}>
          <Home size={24} />
          <span className="text-[10px] font-medium">Início</span>
        </button>

        <button onClick={() => setActiveTab("stats")} className={item("stats")}>
          <BarChart2 size={24} />
          <span className="text-[10px] font-medium">Status</span>
        </button>

        <div className="relative -top-6">
          <button
            onClick={openLogModal}
            aria-label="Registrar momento"
            className="bg-orange-600 hover:bg-orange-500 text-white p-4 rounded-full shadow-lg shadow-orange-900/50 flex items-center justify-center transform transition active:scale-95 border-4 border-gray-950"
          >
            <PlusCircle size={28} />
          </button>
        </div>

        <button onClick={() => setActiveTab("ranking")} className={item("ranking")}>
          <Users size={24} />
          <span className="text-[10px] font-medium">Ranking</span>
        </button>

        <button onClick={() => setActiveTab("profile")} className={item("profile")}>
          <User size={24} />
          <span className="text-[10px] font-medium">Perfil</span>
        </button>
      </div>
    </nav>
  );
}
