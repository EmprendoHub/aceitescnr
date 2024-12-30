import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedPaths = ["/carrito/envio"];

export function withAuthMiddleware(middleware) {
  return async (request, event) => {
    // Create a response object to pass down the chain
    const response = NextResponse.next();
    const token = await getToken({ req: request });
    try {
      // console.log(token?.user?.role);
      // @ts-ignore
      request.nextauth = request.nextauth || {};
      // @ts-ignore
      request.nextauth.token = token;
      const pathname = request.nextUrl.pathname;
      let signInUrl;

      if (pathname.includes(protectedPaths)) {
        if (!token) {
          signInUrl = new URL("/api/auth/signin", request.url);
          signInUrl.searchParams.set("callbackUrl", pathname);
          return NextResponse.redirect(signInUrl);
        }
      }

      if (pathname.includes("admin")) {
        //if admin user is not logged in

        if (!token) {
          signInUrl = new URL("/api/auth/signin", request.url);
          signInUrl.searchParams.set("callbackUrl", pathname);
          return NextResponse.redirect(signInUrl);
        }

        if (token?.user?.role !== "manager") {
          signInUrl = new URL("/no-autorizado", request.url);
          return NextResponse.redirect(signInUrl);
        }
      }
      if (
        pathname.includes("afiliado") ||
        pathname === "/registro/affiliate/stripe"
      ) {
        //if afiliado user is not logged in
        let signInUrl;
        if (!token) {
          signInUrl = new URL("/api/auth/signin", request.url);
          signInUrl.searchParams.set("callbackUrl", pathname);
          return NextResponse.redirect(signInUrl);
        }

        if (token?.user?.role !== "afiliado") {
          signInUrl = new URL("/no-autorizado", request.url);
          return NextResponse.redirect(signInUrl);
        }
      }

      if (pathname.includes("perfil")) {
        //if afiliado user is not logged in
        let signInUrl;
        if (!token) {
          signInUrl = new URL("/api/auth/signin", request.url);
          signInUrl.searchParams.set("callbackUrl", pathname);
          return NextResponse.redirect(signInUrl);
        }
        if (token?.user?.role !== "cliente") {
          signInUrl = new URL("/no-autorizado", request.url);
          return NextResponse.redirect(signInUrl);
        }
      }
      // Check if 'alink' is present in the URL search parameters
      const affParam = request.nextUrl.searchParams.get("alink");
      if (affParam) {
        const userAgent = request.headers.get("user-agent"); // User agent string
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/affiliate/createevent`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              affParam,
              userAgent,
            }),
          }
        );

        if (res.ok) {
          console.log("Affiliate referral EVENT created successfully");
        }
      }

      // Redirect logged in users
      if (token?.user) {
        if (
          token?.user?.role === "instagram" &&
          !pathname.includes("instagram")
        ) {
          signInUrl = new URL("/instagram", request.url);
          return NextResponse.redirect(signInUrl);
        }
        if (
          token?.user?.role === "sucursal" &&
          !pathname.includes("puntodeventa")
        ) {
          signInUrl = new URL("/puntodeventa", request.url);
          return NextResponse.redirect(signInUrl);
        }

        if (token?.user?.role === "manager" && !pathname.includes("admin")) {
          signInUrl = new URL("/admin", request.url);
          return NextResponse.redirect(signInUrl);
        }
      }
    } catch (error) {
      // Handle or log the error
      console.error("Middleware error:", error);
    }
    return middleware(request, event, response);
  };
}
