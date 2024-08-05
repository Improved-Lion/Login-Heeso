import create from 'zustand';

interface User {
  token: string;
  name: string;
  email: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: user => set({ user }),
  logout: () => set({ user: null })
}));

export default useUserStore;