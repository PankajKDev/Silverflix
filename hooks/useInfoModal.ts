//install zustand

import { create } from "zustand";
export interface ModalStoreInterface {
  movieId?: string;
  isOpen: boolean;
  openModal: (movieId: string) => void;
  closeModal: () => void;
}
//userInfoModal store is created
const userInfoModal = create<ModalStoreInterface>((set) => ({
  movieId: undefined, //initial state is defined
  isOpen: false, //initial state
  openModal: (movieId: string) => set({ isOpen: true, movieId }),
  closeModal: () => set({ isOpen: false, movieId: undefined }),
}));
export default userInfoModal;
