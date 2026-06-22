import React from "react";
import type {Metadata} from "next";


export const metadata: Metadata = {
    title: "Senkoun Internal Page",
    robots: {
        index: false,
        follow: false,
    },
};

export default function InternalsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}