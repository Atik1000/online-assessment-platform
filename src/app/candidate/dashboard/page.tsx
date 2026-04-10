import { CandidateDashboard } from "@/features/candidate/components/candidate-dashboard";
import { User } from "lucide-react";

export default function CandidateDashboardPage() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-295 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-10">
            <div className="rounded-sm border border-sky-600 px-2 py-1 text-[11px] font-extrabold tracking-widest text-sky-700">
              AKIJ RESOURCE
            </div>
            <p className="text-lg font-medium text-slate-700">Dashboard</p>
          </div>

          <div className="flex items-center gap-3 text-right">
            <div className="flex size-9 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <User className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700">Arif Hossain</p>
              <p className="text-xs font-medium text-slate-500">Ref. ID - 16101121</p>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-295 flex-1 px-4 py-10 sm:px-6">
        <CandidateDashboard />
      </section>

      <footer className="border-t border-[#2a184d] bg-[#140635] px-4 py-5 sm:px-6">
        <div className="mx-auto flex w-full max-w-295 flex-col gap-3 text-sm text-slate-100 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium tracking-wide">Powered by AKIJ RESOURCE</p>
          <div className="flex flex-wrap items-center gap-5 text-slate-200">
            <p className="font-semibold">Helpline</p>
            <p>+88 011020202505</p>
            <p>support@akij.work</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
