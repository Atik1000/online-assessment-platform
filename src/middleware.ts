import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { AUTH_COOKIE_KEY } from "@/lib/auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/employer") && !pathname.startsWith("/candidate")) {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get(AUTH_COOKIE_KEY)?.value;
  const role = authCookie?.split(":")[1];

  if (!authCookie || !role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/employer") && role !== "employer") {
    return NextResponse.redirect(new URL("/candidate/dashboard", request.url));
  }

  if (pathname.startsWith("/candidate") && role !== "candidate") {
    return NextResponse.redirect(new URL("/employer/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/employer/:path*", "/candidate/:path*"],
};
