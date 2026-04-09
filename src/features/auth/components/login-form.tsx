"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function LoginForm() {
  return (
    <Card className="w-full rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Authentication setup begins in Step 2.</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">Use employer@test.com or candidate@test.com</CardContent>
    </Card>
  );
}
