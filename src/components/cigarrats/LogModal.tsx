import { useState } from "react";
import { Camera, X } from "lucide-react";
import { AVAILABLE_TAGS } from "./data";
import type { NewLog } from "./types";

export function LogModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (log: NewLog) => void;
}) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [hasImage, setHasImage] = useState(false);

  const toggleTag = (label: string) => {
    setSelectedTags((prev) =>
      prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label],
    );
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col justify-end">
      <div className="flex-1" onClick={onClose} />

      <div className="bg-gray-900 rounded-t-3xl p-5 border-t border-gray-800 animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Registrar Momento</h2>
          <button
            onClick={onClose}
            className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
            O que acompanha?
          </p>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_TAGS.map((tag) => (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.label)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                  selectedTags.includes(tag.label)
                    ? "bg-orange-500/20 border-orange-500 text-orange-400"
                    : "bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {tag.icon}
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <textarea
            placeholder="Comente sobre este momento (opcional)..."
            className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-sm text-gray-100 focus:outline-none focus:border-orange-500 placeholder-gray-600 resize-none h-24"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <button
            onClick={() => setHasImage(!hasImage)}
            className={`w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed transition-all ${
              hasImage
                ? "bg-green-500/10 border-green-500/50 text-green-400"
                : "border-gray-700 bg-gray-950 text-gray-400 hover:bg-gray-800"
            }`}
          >
            <Camera size={20} />
            <span className="font-medium">
              {hasImage ? "Foto anexada (Clique para remover)" : "Adicionar uma foto"}
            </span>
          </button>
        </div>

        <button
          onClick={() => onSubmit({ text, tags: selectedTags, hasImage })}
          className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-orange-900/20"
        >
          Salvar Registro
        </button>
      </div>
    </div>
  );
}
