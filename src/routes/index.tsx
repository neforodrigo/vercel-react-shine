import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeedView } from "@/components/cigarrats/FeedView";
import { StatsView } from "@/components/cigarrats/StatsView";
import { RankingView } from "@/components/cigarrats/RankingView";
import { LogModal } from "@/components/cigarrats/LogModal";
import { BottomNav } from "@/components/cigarrats/BottomNav";
import { INITIAL_POSTS } from "@/components/cigarrats/data";
import type { NewLog, Post, UserStats } from "@/components/cigarrats/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CigarRats — Registre, acompanhe e compare seus momentos" },
      {
        name: "description",
        content:
          "Rede social para registrar cigarros, acompanhar metas diárias e ver o ranking semanal.",
      },
      { property: "og:title", content: "CigarRats — Registre e acompanhe seus momentos" },
      {
        property: "og:description",
        content:
          "Registre seus momentos de relaxamento.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CigarRatsApp,
});

function CigarRatsApp() {
  const [activeTab, setActiveTab] = useState("feed");
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [userStats, setUserStats] = useState<UserStats>({
    dailyCount: 4,
    dailyLimit: 10,
    streak: 12,
  });

  const toggleLike = (postId: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    );
  };

  const handleNewLog = (newLog: NewLog) => {
    const newPost: Post = {
      id: Date.now(),
      user: {
        name: "Você",
        username: "@seu_usuario",
        avatar: "https://i.pravatar.cc/150?u=voce",
      },
      time: "Agora",
      text: newLog.text,
      tags: newLog.tags,
      likes: 0,
      liked: false,
      comments: 0,
      image: newLog.hasImage
        ? "https://images.unsplash.com/photo-1526685714488-66a98f1f72da?auto=format&fit=crop&q=80&w=800"
        : null,
    };

    setPosts((prev) => [newPost, ...prev]);
    setUserStats((prev) => ({ ...prev, dailyCount: prev.dailyCount + 1 }));
    setIsLogModalOpen(false);
  };

  return (
    <div className="flex justify-center bg-gray-900 min-h-screen font-sans text-gray-100">
      <div className="w-full max-w-md bg-gray-950 min-h-screen flex flex-col relative shadow-2xl border-x border-gray-800">
        <header className="px-4 py-4 border-b border-gray-800 flex justify-between items-center sticky top-0 bg-gray-950/90 backdrop-blur-sm z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white overflow-hidden flex items-center justify-center border border-gray-700">
              <img
                src="https://i.ibb.co/0jdCKxWj/Screenshot-1-removebg-preview.png"
                alt="Logo do CigarRats"
                className="w-full h-full object-contain p-1"
              />
            </div>
            <h1 className="text-2xl font-black italic tracking-tighter text-white">CigarRats</h1>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-800 overflow-hidden border border-gray-700">
            <img
              src="https://i.pravatar.cc/150?u=voce"
              alt="Seu perfil"
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-24">
          {activeTab === "feed" && <FeedView posts={posts} onLike={toggleLike} />}
          {activeTab === "stats" && <StatsView stats={userStats} />}
          {activeTab === "ranking" && <RankingView />}
          {activeTab === "profile" && (
            <div className="p-8 text-center text-gray-500 text-sm">Perfil em breve.</div>
          )}
        </main>

        <BottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          openLogModal={() => setIsLogModalOpen(true)}
        />

        {isLogModalOpen && (
          <LogModal onClose={() => setIsLogModalOpen(false)} onSubmit={handleNewLog} />
        )}
      </div>
    </div>
  );
}
