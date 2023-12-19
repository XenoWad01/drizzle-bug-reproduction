import { create } from "zustand";

type AuthData = {
  isAuthenticated: boolean;
};

type AuthState = {
  data: AuthData;

  setLogin: (newLoginState: boolean) => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
  data: {
    isAuthenticated: false,
  },
  setLogin: (state) => set(() => ({ data: { isAuthenticated: state } })),
}));
