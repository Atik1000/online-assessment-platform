import type { LoginInput, UserRole } from "@/types/auth";

export const AUTH_COOKIE_KEY = "oas_auth";

export const MOCK_CREDENTIALS: Record<string, { password: string; role: UserRole }> = {
  "employer@test.com": { password: "123456", role: "employer" },
  "candidate@test.com": { password: "123456", role: "candidate" },
};

export function resolveUserRole(email: string): UserRole | null {
  return MOCK_CREDENTIALS[email.toLowerCase()]?.role ?? null;
}

export function isCredentialValid(input: LoginInput): boolean {
  const creds = MOCK_CREDENTIALS[input.email.toLowerCase()];
  return Boolean(creds && creds.password === input.password);
}
