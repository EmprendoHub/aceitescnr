//import { addAnalytics } from "@/app/[lang]/_actions";
import { NextResponse, userAgent } from "next/server";

export function trackingMiddleware(middleware) {
  return async (request, event) => {
    // Create a response object to pass down the chain
    const response = NextResponse.next();
    try {
      if (
        request.nextUrl.pathname === "/en" ||
        request.nextUrl.pathname.includes("/servicios/dropshipping") ||
        request.nextUrl.pathname === "/es" ||
        request.nextUrl.pathname === "/"
      ) {
        const ip = (request.headers.get("x-forwarded-for") ?? "127.0.0.1")
          .split(",")[0]
          .replace(/^::ffff:/, "");
        const { device, browser } = userAgent(request);
        const headers = request.headers;
        const viewport = device.type === "mobile" ? "mobile" : "desktop";
        const deviceData = {
          vendor: device.vendor || "unknown",
          model: device.model || "unknown",
          type: device.type === "mobile" ? "mobile" : "desktop",
        };
        const url = request.nextUrl;
        const browserName = browser.name;
        const source = url.href;
        const country = request.geo?.country || "";
        // const response = fetch(`${process.env.NEXTAUTH_URL}/api/analytics`, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     event: "visit",
        //     source,
        //     country,
        //     ip,
        //     viewport,
        //     browserName,
        //     device: deviceData,
        //   }),
        // });
      }
    } catch (error) {
      // Handle or log the error
      console.error("tracking Middleware error:", error);
    }
    return middleware(request, event, response);
  };
}
