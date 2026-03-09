import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type AuthStoreState = {
  token: string | null;
};

type AuthStoreActions = {
  setAuth: (token: string | null) => void;
  logout: () => void;
};

type AuthStore = AuthStoreState & AuthStoreActions;

const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        token: null,

        setAuth: (token) => {
          set({ token }, false, "auth/setAuth");
        },

        logout: () => {
          set({ token: null }, false, "auth/logout");
        },
      }),
      { name: "authorization-token" },
    ),
  ),
);

export const useToken = () => useAuthStore((state) => state.token);
export const useIsAuth = () => useAuthStore((state) => !!state.token);
export const useSetAuth = () => useAuthStore((state) => state.setAuth);
export const useLogout = () => useAuthStore((state) => state.logout);
