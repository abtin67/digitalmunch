import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });



  const isAdminPath = req.nextUrl.pathname.includes("/admin") &&
    !req.nextUrl.pathname.includes("/admin/login");

  if (isAdminPath && !token) {
    const locale = req.nextUrl.pathname.split("/")[1] || "fa";
    return NextResponse.redirect(
      new URL(`/${locale}/admin/login`, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/fa/admin/:path*",
    "/ar/admin/:path*",
    "/en/admin/:path*",
  ],
};