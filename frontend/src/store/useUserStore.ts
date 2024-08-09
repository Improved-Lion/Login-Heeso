import create from 'zustand';

interface User {
  email: string;
  name: string;
  token: string;
}

interface UserState {
  user: User | null,
  setUser: (user: User | null) => void;
  logout: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

export default useUserStore;