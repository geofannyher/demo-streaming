import { create } from "zustand";

interface AudioStore {
  audioUrl: string;
  setAudioUrl: (url: string) => void;
}

const useAudioStore = create<AudioStore>((set) => ({
  audioUrl: "",
  setAudioUrl: (url) => set({ audioUrl: url }),
}));

export default useAudioStore;

interface Store {
  nama: string;
  setNama: (newNama: string) => void;
}

export const useStore = create<Store>((set) => ({
  nama: "",
  setNama: (newNama) => set({ nama: newNama }),
}));
