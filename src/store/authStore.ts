import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  userEmail: string | null;
  setIsLoggedIn: (_loggedIn: boolean) => void;
  setUserEmail: (_email: string | null) => void;
  login: (_email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  userEmail: null,
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
  setUserEmail: (email) => set({ userEmail: email }),
  login: (email) => set({ isLoggedIn: true, userEmail: email }),
  logout: () => set({ isLoggedIn: false, userEmail: null }),
}));
