import Link from "next/link";

import { AppCard } from "@/components/shared/app-card";
import { AppButton } from "@/components/shared/app-button";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center gap-8 px-6 py-12">
      <header className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Online Assessment Platform</p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Role-based assessment platform for employers and candidates</h1>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <AppCard title="Employer Panel" description="Create tests, manage slots, and monitor candidate submissions.">
          <Link href="/employer/dashboard">
            <AppButton className="w-full">Open Employer Dashboard</AppButton>
          </Link>
        </AppCard>

        <AppCard title="Candidate Panel" description="Take assigned exams with anti-cheating and offline-safe flows.">
          <Link href="/candidate/dashboard">
            <AppButton variant="secondary" className="w-full">Open Candidate Dashboard</AppButton>
          </Link>
        </AppCard>
      </section>

      <p className="text-sm text-muted-foreground">Sign in at <Link className="underline" href="/login">/login</Link> using the mock credentials.</p>
    </main>
  );
}
