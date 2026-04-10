import { LoginForm } from "@/features/auth/components/login-form";
import { Mail, Phone } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top,#f8fafc_0%,#eef2f7_45%,#e2e8f0_100%)]">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="rounded-md border border-sky-600 px-2 py-1 text-[11px] font-extrabold tracking-[0.12em] text-sky-700">
              AKIJ RESOURCE
            </div>
            <div className="inline-flex w-fit rounded-md bg-sky-600 px-2 py-1 font-mono text-xs text-white">
              116032
            </div>
          </div>

          <h1 className="text-xl font-semibold text-slate-700 sm:text-4xl">Akij Resource</h1>

          <div className="hidden w-31 sm:block" />
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-2xl">
          <LoginForm />
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-[#13072f] px-4 py-5 text-slate-100 sm:px-6">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium tracking-wide">Powered by AKIJ RESOURCE</p>
          <div className="flex flex-col gap-3 text-slate-200 sm:flex-row sm:items-center sm:gap-6">
            <p className="font-medium">Helpline</p>
            <p className="inline-flex items-center gap-2">
              <Phone className="size-4" /> +88 011020202505
            </p>
            <p className="inline-flex items-center gap-2">
              <Mail className="size-4" /> support@akij.work
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
