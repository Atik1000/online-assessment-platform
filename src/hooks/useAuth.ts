"use client";

import { useMemo } from "react";

import { useAuthStore } from "@/store/auth-store";

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const hydrated = useAuthStore((state) => state.hydrated);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  return useMemo(
    () => ({
      user,
      hydrated,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user, hydrated, login, logout],
  );
}
