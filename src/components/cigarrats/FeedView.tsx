import { Flame, MessageCircle, Wind } from "lucide-react";
import type { Post } from "./types";

export function FeedView({
  posts,
  onLike,
}: {
  posts: Post[];
  onLike: (id: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2 bg-gray-900">
      {posts.map((post) => (
        <div key={post.id} className="bg-gray-950 p-4 border-b border-gray-800">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <img
                src={post.user.avatar}
                alt={post.user.name}
                className="w-10 h-10 rounded-full border border-gray-800"
                loading="lazy"
              />
              <div>
                <h3 className="font-bold text-sm text-gray-100">{post.user.name}</h3>
                <p className="text-xs text-gray-500">
                  {post.user.username} • {post.time}
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-300 mb-3">{post.text}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-800 text-orange-400 text-xs px-2 py-1 rounded-md font-medium border border-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>

          {post.image && (
            <div className="rounded-xl overflow-hidden mb-4 border border-gray-800">
              <img
                src={post.image}
                alt="Momento registrado"
                className="w-full h-auto object-cover max-h-80"
                loading="lazy"
              />
            </div>
          )}

          <div className="flex items-center gap-6 text-gray-400">
            <button
              onClick={() => onLike(post.id)}
              className={`flex items-center gap-1.5 transition-colors ${post.liked ? "text-orange-500" : "hover:text-gray-200"}`}
            >
              <Flame size={20} fill={post.liked ? "currentColor" : "none"} />
              <span className="text-sm font-medium">{post.likes}</span>
            </button>
            <button className="flex items-center gap-1.5 hover:text-gray-200 transition-colors">
              <MessageCircle size={20} />
              <span className="text-sm font-medium">{post.comments}</span>
            </button>
          </div>
        </div>
      ))}

      <div className="p-8 text-center text-gray-500 text-sm">
        <Wind className="mx-auto mb-2 opacity-50" size={24} />
        <p>Você chegou ao fim do feed.</p>
        <p>Vá interagir ou registrar o seu!</p>
      </div>
    </div>
  );
}
