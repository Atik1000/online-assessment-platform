"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AppButton } from "@/components/shared/app-button";
import { AppInput } from "@/components/shared/app-input";
import { Form, FormField } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="w-full rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Use `employer@test.com / 123456` or `candidate@test.com / 123456`
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => <AppInput placeholder="you@example.com" {...field} />}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => <AppInput placeholder="******" type="password" {...field} />}
            />
            <AppButton className="w-full" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Signing in..." : "Sign in"}
            </AppButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
