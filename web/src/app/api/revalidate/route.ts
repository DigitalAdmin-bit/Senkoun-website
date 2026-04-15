import { revalidateTag } from "next/cache";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    try {
        const secret = req.headers.get("x-revalidate-secret");


        if (secret !== process.env.REVALIDATE_SECRET) {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }

        revalidateTag('domiciliary-care', 'max');
        revalidateTag('news', 'max');
        revalidateTag('homes', 'max');
        revalidateTag('events', 'max');
        revalidateTag('jobs', 'max');
        revalidateTag('legal', 'max');
        revalidateTag('teams', 'max');


        return NextResponse.json({
            revalidated: true,
        });
    } catch (err) {
        return NextResponse.json(
            {message: "Revalidation failed"},
            {status: 500}
        );
    }
}
