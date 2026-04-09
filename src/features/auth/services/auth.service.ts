import { isCredentialValid, resolveUserRole } from "@/lib/auth";
import type { AuthUser, LoginInput } from "@/types/auth";

const MOCK_LATENCY_MS = 350;

export async function loginWithMock(input: LoginInput): Promise<AuthUser> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS));

  if (!isCredentialValid(input)) {
    throw new Error("Invalid credentials");
  }

  const role = resolveUserRole(input.email);

  if (!role) {
    throw new Error("User role not found");
  }

  return {
    email: input.email.toLowerCase(),
    role,
  };
}
