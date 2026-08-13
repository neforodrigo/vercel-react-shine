import { Coffee, Beer, Utensils, Cigarette, Wind, Users, Leaf, Flame } from "lucide-react";
import type { Post, Profile } from "./types";

export const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    user: {
      name: "Beatriz Almeida",
      username: "@bia_smoke",
      avatar: "https://i.pravatar.cc/150?u=carlos",
    },
    time: "Há 10 min",
    text: "Aquele combo sagrado para começar o dia no escritório.",
    tags: ["Café", "Manhã", "Pausa do Trabalho"],
    likes: 12,
    liked: false,
    comments: 3,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROAXG23pCb4rzSQPfkD42vEXWwRdyoP-Sr7vC2GGjxO8srJucaHOmBucY&s=10",
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
      "https://i.pinimg.com/236x/d6/d7/ce/d6d7cef4ac3ba4aaab52403889cc182c.jpg",
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
      "https://thumbs.dreamstime.com/b/cigarros-e-cigarro-que-encontram-se-dentro-e-em-torno-da-bandeja-de-cinza-de-vidro-na-superf%C3%ADcie-de-madeira-vista-de-cima-de-89027438.jpg",
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
