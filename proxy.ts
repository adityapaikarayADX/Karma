import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

/** Protect API routes in desktop mode; ordinary browser development is unchanged. */
export function proxy(request: NextRequest) {
  const expectedToken = process.env.ASTRA_DESKTOP_TOKEN;
  if (!expectedToken) return NextResponse.next();

  const expectedOrigin = process.env.ASTRA_DESKTOP_ORIGIN;
  if (!expectedOrigin) return new NextResponse("Desktop API origin is not configured.", { status: 503 });

  let expectedHost: string;
  try {
    expectedHost = new URL(expectedOrigin).host;
  } catch {
    return new NextResponse("Desktop API origin is invalid.", { status: 503 });
  }

  if (request.headers.get("host") !== expectedHost) {
    return new NextResponse("Forbidden.", { status: 403 });
  }

  const origin = request.headers.get("origin");
  if (origin && origin !== expectedOrigin) {
    return new NextResponse("Forbidden.", { status: 403 });
  }

  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin") {
    return new NextResponse("Forbidden.", { status: 403 });
  }

  const suppliedToken = request.headers.get("x-astra-desktop-token") ?? "";
  const expectedBytes = Buffer.from(expectedToken);
  const suppliedBytes = Buffer.from(suppliedToken);
  if (expectedBytes.length !== suppliedBytes.length || !timingSafeEqual(expectedBytes, suppliedBytes)) {
    return new NextResponse("Unauthorized.", { status: 401 });
  }

  return NextResponse.next();
}

export const config = { matcher: ["/api/:path*"] };
