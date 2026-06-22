"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { buildSessionToken, INTERNAL_SESSION_COOKIE } from "@/lib/internal-auth";

export async function loginAction(formData: FormData) {
    const username = formData.get("username")?.toString().trim() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    const validUser = process.env.INTERNAL_USER ?? "";
    const validPass = process.env.INTERNAL_PASSWORD ?? "";

    if (username !== validUser || password !== validPass) {
        redirect("/internal/login?error=1");
    }

    const cookieStore = await cookies();
    cookieStore.set(INTERNAL_SESSION_COOKIE, buildSessionToken(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        // 8-hour session
        maxAge: 60 * 60 * 8,
    });

    redirect("/internal/hr/applications");
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete(INTERNAL_SESSION_COOKIE);
    redirect("/internal/login");
}
