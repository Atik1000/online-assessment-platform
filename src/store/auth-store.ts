"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { AUTH_COOKIE_KEY } from "@/lib/auth";
import type { AuthUser } from "@/types/auth";

type AuthState = {
  user: AuthUser | null;
  hydrated: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  setHydrated: (value: boolean) => void;
};

function writeAuthCookie(user: AuthUser | null) {
  if (typeof document === "undefined") return;

  if (!user) {
    document.cookie = `${AUTH_COOKIE_KEY}=; path=/; max-age=0; samesite=lax`;
    return;
  }

  document.cookie = `${AUTH_COOKIE_KEY}=role:${user.role}; path=/; max-age=${60 * 60 * 12}; samesite=lax`;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      hydrated: false,
      login: (user) => {
        writeAuthCookie(user);
        set({ user });
      },
      logout: () => {
        writeAuthCookie(null);
        set({ user: null });
      },
      setHydrated: (value) => set({ hydrated: value }),
    }),
    {
      name: "oas-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
        writeAuthCookie(state?.user ?? null);
      },
    },
  ),
);
