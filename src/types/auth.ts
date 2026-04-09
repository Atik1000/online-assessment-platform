export type UserRole = "employer" | "candidate";

export type AuthUser = {
  email: string;
  role: UserRole;
};

export type LoginInput = {
  email: string;
  password: string;
};
