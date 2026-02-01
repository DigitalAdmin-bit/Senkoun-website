import type {ReactNode} from "react";
import {notFound} from "next/navigation";
import ALLOWED from "@/app/(homes)/[type]/allowed";

interface PageProps {
    params: Promise<{ type: string }>;
    children: ReactNode;
}


export function generateStaticParams() {
    return ALLOWED.map((item) => ({type: item}));
}

export default async function HomeLayout({params, children}: PageProps) {
    const {type} = await params;

    if (!ALLOWED.includes(type as any)) {
        return notFound();
    }

    return <>{children}</>
}