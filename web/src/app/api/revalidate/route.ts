import { revalidateTag } from "next/cache";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    try {
        const secret = req.headers.get("x-revalidate-secret");

        revalidateTag('news', 'max');

        if (secret !== process.env.REVALIDATE_SECRET) {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }

        revalidateTag('homes', 'max');

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

export async function PATCH(req: NextRequest) {
    try {
        revalidateTag('news', 'max');
        return NextResponse.json({
            revalidated: true,
        });
    } catch (error) {
        return NextResponse.json(
            {message: "Revalidation failed"},
            {status: 500}
        );
    }
}
