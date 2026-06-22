import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { INTERNAL_SESSION_COOKIE, isValidSession } from "@/lib/internal-auth";
import internalApi from "@/app/internal/libs/api-instance.ts/api-instance";
import qs from "qs";

export async function GET(request: NextRequest) {
    // ── Auth ──────────────────────────────────────────────────────────────────
    const cookieStore = await cookies();
    const session = cookieStore.get(INTERNAL_SESSION_COOKIE)?.value;
    if (!isValidSession(session)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ── Params ────────────────────────────────────────────────────────────────
    const sp = request.nextUrl.searchParams;
    const q = sp.get("q") ?? "";
    const page = Math.max(1, parseInt(sp.get("page") ?? "1", 10));
    const order = sp.get("order") === "asc" ? "asc" : "desc";

    // ── Filters ───────────────────────────────────────────────────────────────
    const filters: Record<string, unknown> = {};
    if (q.trim()) {
        filters["$or"] = [
            { first_name: { $containsi: q } },
            { last_name: { $containsi: q } },
            { email: { $containsi: q } },
            { phone: { $containsi: q } },
        ];
    }

    // ── Query ─────────────────────────────────────────────────────────────────
    const query = qs.stringify(
        {
            populate: {
                job: {
                    fields: ["id", "title", "job_type", "work_type", "open"],
                    populate: {
                        home: {
                            fields: ["id", "name", "slug", "phone", "email", "address"],
                        },
                    },
                },
                resume: { fields: ["name", "ext", "url"] },
                cover_letter: { fields: ["name", "ext", "url"] },
                responses: true,
            },
            filters,
            sort: [`createdAt:${order}`],
            pagination: { page, pageSize: 10 },
        },
        { encodeValuesOnly: true }
    );

    const res = await internalApi.get(`/job-applications?${query}`);
    return NextResponse.json(res.data);
}
