import { UserMenu } from "@/components/auth/user-menu";
import { CandidateDashboard } from "@/features/candidate/components/candidate-dashboard";

export default function CandidateDashboardPage() {
  return (
    <main className="space-y-6 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Candidate Dashboard</h1>
        <UserMenu />
      </header>
      <p className="text-sm text-muted-foreground">
        See all assigned exams and start your assessment.
      </p>
      <CandidateDashboard />
    </main>
  );
}
