import { Coffee, Beer, Utensils, Cigarette, Wind, Users } from "lucide-react";
import type { Post } from "./types";

export const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    user: {
      name: "Beatriz Almeida",
      username: "@carlos_smoke",
      avatar: "https://i.pravatar.cc/150?u=carlos",
    },
    time: "Há 10 min",
    text: "Aquele combo sagrado para começar o dia no escritório.",
    tags: ["Café", "Manhã", "Pausa do Trabalho"],
    likes: 12,
    liked: false,
    comments: 3,
    image:
      "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    user: {
      name: "Mariana Silva",
      username: "@mari_s",
      avatar: "https://i.pravatar.cc/150?u=mariana",
    },
    time: "Há 2 horas",
    text: "Sextou! A primeira da noite com o pessoal do escritório.",
    tags: ["Cerveja", "Social", "Bar"],
    likes: 45,
    liked: true,
    comments: 8,
    image:
      "https://images.unsplash.com/photo-1436076863939-06870fe779c2?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    user: {
      name: "Beto Rocha",
      username: "@betoroch",
      avatar: "https://i.pravatar.cc/150?u=beto",
    },
    time: "Há 5 horas",
    text: "Depois daquele almoço pesado, não tem jeito.",
    tags: ["Pós-refeição"],
    likes: 8,
    liked: false,
    comments: 0,
    image:
      "https://images.unsplash.com/photo-1526685714488-66a98f1f72da?auto=format&fit=crop&q=80&w=800",
  },
];

export const AVAILABLE_TAGS = [
  { id: "cafe", label: "Café", icon: <Coffee size={16} /> },
  { id: "cerveja", label: "Cerveja/Álcool", icon: <Beer size={16} /> },
  { id: "pos_refeicao", label: "Pós-refeição", icon: <Utensils size={16} /> },
  { id: "trabalho", label: "Pausa do Trabalho", icon: <Cigarette size={16} /> },
  { id: "estresse", label: "Estresse", icon: <Wind size={16} /> },
  { id: "social", label: "Social/Festa", icon: <Users size={16} /> },
];
