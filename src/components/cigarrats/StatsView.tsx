import { Cigarette, Coffee, Flame } from "lucide-react";
import type { UserStats } from "./types";

export function StatsView({ stats }: { stats: UserStats }) {
  const percentage = (stats.dailyCount / stats.dailyLimit) * 100;
  let progressColor = "bg-green-500";
  if (percentage > 70) progressColor = "bg-yellow-500";
  if (percentage >= 100) progressColor = "bg-red-500";

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold mb-4">Seu Progresso Hoje</h2>

      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Cigarette size={100} />
        </div>

        <div className="relative z-10">
          <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">
            Cigarros Fumados
          </p>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-5xl font-black text-white">{stats.dailyCount}</span>
            <span className="text-gray-500 mb-1 font-medium">/ {stats.dailyLimit} meta</span>
          </div>

          <div className="h-3 w-full bg-gray-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${progressColor}`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2 text-right">
            {percentage >= 100 ? "Meta atingida ou ultrapassada ⚠️" : "Dentro do controle."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800 flex flex-col items-center justify-center text-center">
          <Flame className="text-orange-500 mb-2" size={28} />
          <p className="text-3xl font-bold">{stats.streak}</p>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Dias Logados</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800 flex flex-col items-center justify-center text-center">
          <Coffee className="text-amber-700 mb-2" size={28} />
          <p className="text-xl font-bold">Café</p>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Maior Gatilho</p>
        </div>
      </div>
    </div>
  );
}
