import { create } from "zustand";

interface LikeStore {
  likes: number[];
  setLikes: (likes: number[]) => void;
  addLike: (id: number) => void;
  removeLike: (id: number) => void;
}

const useLikeStore = create<LikeStore>((set) => ({
  likes: localStorage.getItem("liked")
    ? JSON.parse(localStorage.getItem("liked") || "[]")
    : [],
  setLikes: (likes: number[]) => {
    localStorage.setItem("liked", JSON.stringify(likes));
    set({ likes });
  },
  addLike: (id: number) =>
    set((state) => {
      localStorage.setItem("liked", JSON.stringify([...state.likes, id]));
      return { likes: [...state.likes, id] };
    }),
  removeLike: (id: number) =>
    set((state) => {
      localStorage.setItem(
        "liked",
        JSON.stringify(state.likes.filter((like: number) => like !== id))
      );
      return {
        likes: state.likes.filter((like: number) => like !== id),
      };
    }),
}));

export default useLikeStore;
