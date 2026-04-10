"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AppButton } from "@/components/shared/app-button";
import { AppInput } from "@/components/shared/app-input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { loginWithMock } from "@/features/auth/services/auth.service";
import { loginSchema, type LoginSchemaInput } from "@/features/auth/schemas/login-schema";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/lib/routes";

export function LoginForm() {
  const router = useRouter();
  const { user, hydrated, login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<LoginSchemaInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!hydrated || !user) return;
    router.replace(user.role === "employer" ? ROUTES.employerDashboard : ROUTES.candidateDashboard);
  }, [hydrated, user, router]);

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      setIsSubmitting(true);
      const user = await loginWithMock(values);
      login(user);
      toast.success("Logged in successfully");
      router.replace(user.role === "employer" ? ROUTES.employerDashboard : ROUTES.candidateDashboard);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to login";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <section className="w-full rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.12)] sm:p-8">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-slate-700">Sign In</h2>
      </div>

      <Form {...form}>
        <form className="space-y-5" onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2.5">
                <FormLabel className="text-base font-semibold text-slate-700">Email</FormLabel>
                <FormControl>
                  <AppInput
                    className="h-11 rounded-xl border-slate-300 px-4 text-[15px] text-slate-700 placeholder:text-slate-400"
                    placeholder="Your primary email address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2.5">
                <FormLabel className="text-base font-semibold text-slate-700">Password</FormLabel>
                <FormControl>
                  <AppInput
                    className="h-11 rounded-xl border-slate-300 px-4 text-[15px] text-slate-700 placeholder:text-slate-400"
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <button
              className="text-sm font-semibold text-slate-500 transition-colors hover:text-slate-700"
              type="button"
            >
              Forget Password?
            </button>
          </div>

          <AppButton
            className="h-11 w-full rounded-xl bg-linear-to-r from-sky-600 to-indigo-600 text-base font-semibold text-white hover:from-sky-500 hover:to-indigo-500"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Signing in..." : "Submit"}
          </AppButton>
        </form>
      </Form>

      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-600">
        Demo access: employer@test.com / 123456 or candidate@test.com / 123456
      </div>
    </section>
  );
}
