import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("access_token");
  if (token == undefined) {
    return NextResponse.redirect(
      new URL("http://localhost:3000/login"),
      request.url
    );
  }
  try {
    const { payload } = await jwtVerify(
      token.value,
      new TextEncoder().encode(`${process.env.NEXT_PUBLIC_JWT_KEY}`)
    );
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(
      new URL("http://localhost:3000/login"),
      request.url
    );
  }
}

export const config = {
  matcher: ["/", "/clientes/:path*"],
};
