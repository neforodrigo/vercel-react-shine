const ranking = [
  { pos: 1, name: "Marcos P.", score: 1450, badge: "🔥" },
  { pos: 2, name: "Você", score: 1200, badge: "🚬" },
  { pos: 3, name: "Ana Souza", score: 980, badge: "" },
  { pos: 4, name: "Felipe D.", score: 850, badge: "" },
];

export function RankingView() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-6">Ranking Semanal</h2>
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        {ranking.map((user, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-between p-4 border-b border-gray-800 last:border-0 ${user.name === "Você" ? "bg-gray-800/50" : ""}`}
          >
            <div className="flex items-center gap-4">
              <span
                className={`font-black text-lg ${idx === 0 ? "text-yellow-500" : idx === 1 ? "text-gray-300" : idx === 2 ? "text-amber-600" : "text-gray-500"}`}
              >
                {user.pos}º
              </span>
              <div className="w-10 h-10 bg-gray-700 rounded-full" />
              <div>
                <p className="font-bold text-sm">
                  {user.name} {user.badge}
                </p>
                <p className="text-xs text-gray-500">Pontos de interação</p>
              </div>
            </div>
            <span className="font-bold text-orange-500">{user.score}</span>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-gray-500 mt-4">
        Os pontos são baseados em registros, curtidas e comentários recebidos.
      </p>
    </div>
  );
}
