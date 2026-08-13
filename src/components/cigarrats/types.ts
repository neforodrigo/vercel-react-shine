export type Post = {
  id: number;
  user: { name: string; username: string; avatar: string };
  time: string;
  text: string;
  tags: string[];
  likes: number;
  liked: boolean;
  comments: number;
  image: string | null;
};

export type UserStats = {
  dailyCount: number;
  dailyLimit: number;
  streak: number;
};

export type NewLog = { text: string; tags: string[]; image: string | null };

export type Profile = {
  name: string;
  username: string;
  birthDate: string;
  city: string;
  smokes: string[];
  avatar: string;
};
