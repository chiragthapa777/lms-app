import { NextRequest, NextResponse } from "next/server";
export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const pathname = request.nextUrl.pathname;
  requestHeaders.set("x-pathname", pathname);

  console.log("middleware");

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
