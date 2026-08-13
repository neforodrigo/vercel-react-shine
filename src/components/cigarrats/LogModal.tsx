import { useRef, useState } from "react";
import { Camera, X, Trash2 } from "lucide-react";
import { AVAILABLE_TAGS } from "./data";
import type { NewLog } from "./types";

const MAX_SIZE_MB = 5;

export function LogModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (log: NewLog) => void;
}) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleTag = (label: string) => {
    setSelectedTags((prev) =>
      prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label],
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Escolha um arquivo de imagem.");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`A imagem deve ter no máximo ${MAX_SIZE_MB}MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setError(null);
      setImage(typeof reader.result === "string" ? reader.result : null);
    };
    reader.onerror = () => setError("Não foi possível ler a imagem.");
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col justify-end">
      <div className="flex-1" onClick={onClose} />

      <div className="bg-gray-900 rounded-t-3xl p-5 border-t border-gray-800 animate-slide-up max-h-[90vh] overflow-y-auto">
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
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {image ? (
            <div className="relative rounded-xl overflow-hidden border border-gray-800">
              <img src={image} alt="Pré-visualização da foto" className="w-full max-h-64 object-cover" />
              <button
                onClick={() => setImage(null)}
                className="absolute top-2 right-2 p-2 bg-black/70 rounded-full text-gray-200 hover:bg-black transition"
                aria-label="Remover foto"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-gray-700 bg-gray-950 text-gray-400 hover:bg-gray-800 transition-all"
            >
              <Camera size={20} />
              <span className="font-medium">Adicionar uma foto</span>
            </button>
          )}

          {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
        </div>

        <button
          onClick={() => onSubmit({ text, tags: selectedTags, image })}
          className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-orange-900/20"
        >
          Salvar Registro
        </button>
      </div>
    </div>
  );
}
