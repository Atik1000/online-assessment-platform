import Link from "next/link";

import { UserMenu } from "@/components/auth/user-menu";
import { AppButton } from "@/components/shared/app-button";

export default function EmployerDashboardPage() {
  return (
    <main className="space-y-6 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Employer Dashboard</h1>
        <UserMenu />
      </header>
      <p className="text-sm text-muted-foreground">
        Auth is active. Next section will load exam cards from mock API.
      </p>
      <Link href="/employer/create-test">
        <AppButton>Create Test</AppButton>
      </Link>
    </main>
  );
}
