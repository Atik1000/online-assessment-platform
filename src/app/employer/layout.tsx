import type { ReactNode } from "react";

import { ProtectedShell } from "@/components/auth/protected-shell";

export default function EmployerLayout({ children }: { children: ReactNode }) {
  return <ProtectedShell role="employer">{children}</ProtectedShell>;
}
