"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { ROUTES } from "@/lib/routes";
import type { UserRole } from "@/types/auth";
import { useAuth } from "@/hooks/useAuth";

type ProtectedShellProps = {
  children: React.ReactNode;
  role: UserRole;
};

export function ProtectedShell({ children, role }: ProtectedShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, hydrated } = useAuth();

  useEffect(() => {
    if (!hydrated) return;

    if (!user) {
      router.replace(ROUTES.login);
      return;
    }

    if (pathname?.startsWith("/employer") && user.role !== "employer") {
      router.replace(ROUTES.candidateDashboard);
      return;
    }

    if (pathname?.startsWith("/candidate") && user.role !== "candidate") {
      router.replace(ROUTES.employerDashboard);
      return;
    }
  }, [hydrated, user, pathname, router]);

  if (!hydrated || !user || user.role != role) {
    return <div className="p-6 text-sm text-muted-foreground">Checking access...</div>;
  }

  return <>{children}</>;
}
