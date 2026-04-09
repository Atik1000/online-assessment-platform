import type { ReactNode } from "react";

import { ProtectedShell } from "@/components/auth/protected-shell";

export default function CandidateLayout({ children }: { children: ReactNode }) {
  return <ProtectedShell role="candidate">{children}</ProtectedShell>;
}
