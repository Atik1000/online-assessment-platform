"use client";

import { useRouter } from "next/navigation";

import { AppButton } from "@/components/shared/app-button";
import { ROUTES } from "@/lib/routes";
import { useAuth } from "@/hooks/useAuth";

export function UserMenu() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-muted-foreground">{user?.email}</span>
      <AppButton
        variant="outline"
        onClick={() => {
          logout();
          router.replace(ROUTES.login);
        }}
      >
        Logout
      </AppButton>
    </div>
  );
}
