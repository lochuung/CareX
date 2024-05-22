import { NextResponse } from "next/server";

const privatePaths = ["/workshop"];
const authPaths = ["/login", "/register"];

const productEditRegex = /^\/products\/\d+\/edit$/;

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = localStorage?.getItem("token");
  // Chưa đăng nhập thì không cho vào private paths
  if (privatePaths.some((path) => pathname.startsWith(path)) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // Đăng nhập rồi thì không cho vào login/register nữa
  if (authPaths.some((path) => pathname.startsWith(path)) && token) {
    return NextResponse.redirect(new URL("/me", request.url));
  }
  if (pathname.match(productEditRegex) && !token) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/workshop", "/register", "/products/:path*"],
};
