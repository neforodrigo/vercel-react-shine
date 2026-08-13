import { useState } from "react";
import { CalendarDays, Check, MapPin, Pencil, X } from "lucide-react";
import { SMOKE_OPTIONS } from "./data";
import type { Profile } from "./types";

function formatBirthDate(value: string) {
  if (!value) return "Não informado";
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return value;
  return `${day}/${month}/${year}`;
}

export function ProfileView({
  profile,
  onSave,
}: {
  profile: Profile;
  onSave: (profile: Profile) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<Profile>(profile);
  const [error, setError] = useState<string | null>(null);

  const startEdit = () => {
    setDraft(profile);
    setError(null);
    setIsEditing(true);
  };

  const toggleSmoke = (id: string) => {
    setDraft((prev) => ({
      ...prev,
      smokes: prev.smokes.includes(id)
        ? prev.smokes.filter((s) => s !== id)
        : [...prev.smokes, id],
    }));
  };

  const handleSave = () => {
    const name = draft.name.trim().slice(0, 60);
    let username = draft.username.trim().replace(/\s+/g, "").slice(0, 30);
    if (username && !username.startsWith("@")) username = `@${username}`;
    const city = draft.city.trim().slice(0, 60);

    if (!name) {
      setError("Informe seu nome.");
      return;
    }
    if (username.length < 2) {
      setError("Informe um username válido.");
      return;
    }

    onSave({ ...draft, name, username, city });
    setIsEditing(false);
    setError(null);
  };

  const inputClass =
    "w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-sm text-gray-100 focus:outline-none focus:border-orange-500 placeholder-gray-600";
  const labelClass =
    "block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider";

  return (
    <div className="p-5">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={profile.avatar}
          alt={`Foto de ${profile.name}`}
          className="w-20 h-20 rounded-full border border-gray-800 object-cover"
        />
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-gray-100 truncate">{profile.name}</h2>
          <p className="text-sm text-gray-500 truncate">{profile.username}</p>
        </div>
      </div>

      {!isEditing ? (
        <div className="flex flex-col gap-3">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-3">
            <CalendarDays size={18} className="text-orange-500" />
            <div>
              <p className="text-xs text-gray-500">Data de nascimento</p>
              <p className="text-sm text-gray-200">{formatBirthDate(profile.birthDate)}</p>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-3">
            <MapPin size={18} className="text-orange-500" />
            <div>
              <p className="text-xs text-gray-500">Cidade</p>
              <p className="text-sm text-gray-200">{profile.city || "Não informada"}</p>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-3">O que você fuma</p>
            {profile.smokes.length === 0 ? (
              <p className="text-sm text-gray-400">Nada selecionado</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {SMOKE_OPTIONS.filter((o) => profile.smokes.includes(o.id)).map((o) => (
                  <span
                    key={o.id}
                    className="flex items-center gap-2 bg-orange-500/20 border border-orange-500 text-orange-400 text-xs px-3 py-1.5 rounded-lg font-medium"
                  >
                    {o.icon}
                    {o.label}
                  </span>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={startEdit}
            className="mt-2 w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold py-3.5 rounded-xl transition-colors"
          >
            <Pencil size={18} />
            Editar perfil
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div>
            <label className={labelClass} htmlFor="profile-name">
              Nome
            </label>
            <input
              id="profile-name"
              className={inputClass}
              value={draft.name}
              maxLength={60}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="profile-username">
              Username
            </label>
            <input
              id="profile-username"
              className={inputClass}
              value={draft.username}
              maxLength={30}
              placeholder="@seu_usuario"
              onChange={(e) => setDraft({ ...draft, username: e.target.value })}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="profile-birth">
              Data de nascimento
            </label>
            <input
              id="profile-birth"
              type="date"
              className={inputClass}
              value={draft.birthDate}
              max={new Date().toISOString().slice(0, 10)}
              onChange={(e) => setDraft({ ...draft, birthDate: e.target.value })}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="profile-city">
              Cidade
            </label>
            <input
              id="profile-city"
              className={inputClass}
              value={draft.city}
              maxLength={60}
              placeholder="Sua cidade"
              onChange={(e) => setDraft({ ...draft, city: e.target.value })}
            />
          </div>

          <div>
            <p className={labelClass}>O que você fuma</p>
            <div className="flex flex-wrap gap-2">
              {SMOKE_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => toggleSmoke(option.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                    draft.smokes.includes(option.id)
                      ? "bg-orange-500/20 border-orange-500 text-orange-400"
                      : "bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  {option.icon}
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <div className="flex gap-3 pt-1">
            <button
              onClick={() => {
                setIsEditing(false);
                setError(null);
              }}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold py-3.5 rounded-xl transition-colors"
            >
              <X size={18} />
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold py-3.5 rounded-xl transition-colors"
            >
              <Check size={18} />
              Salvar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
