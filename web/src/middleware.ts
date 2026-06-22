import { NextRequest, NextResponse } from "next/server";
import { INTERNAL_SESSION_COOKIE, isValidSession } from "@/lib/internal-auth";

/**
 * Paths inside the (internals) route group that require authentication.
 * The login page itself must be excluded so users can reach it.
 */
const INTERNAL_PREFIX = ["/hr", "/internal"];
const LOGIN_PATH = "/internal/login";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isInternalRoute = INTERNAL_PREFIX.some((prefix) =>
        pathname.startsWith(prefix)
    );

    // Let the login page through regardless.
    if (pathname.startsWith(LOGIN_PATH)) {
        return NextResponse.next();
    }

    if (isInternalRoute) {
        const sessionCookie = request.cookies.get(INTERNAL_SESSION_COOKIE)?.value;

        if (!isValidSession(sessionCookie)) {
            const loginUrl = request.nextUrl.clone();
            loginUrl.pathname = LOGIN_PATH;
            loginUrl.search = "";
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all routes that start with /hr or /internal,
         * but skip Next.js internals and static files.
         */
        "/hr/:path*",
        "/internal/:path*",
    ],
};
