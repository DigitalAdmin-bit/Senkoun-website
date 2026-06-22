export const INTERNAL_SESSION_COOKIE = "internal_session";

/** Returns true if the raw cookie value represents a valid session. */
export function isValidSession(cookieValue: string | undefined): boolean {
    if (!cookieValue) return false;
    return cookieValue === buildSessionToken();
}

/** Builds the session token from ENV vars (server-side only). */
export function buildSessionToken(): string {
    const user = process.env.INTERNAL_USER ?? "";
    const pass = process.env.INTERNAL_PASSWORD ?? "";
    // btoa works in both Node.js (18+) and Edge runtime.
    return btoa(`${user}:${pass}`);
}
