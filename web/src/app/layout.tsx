import type {Metadata} from "next";
import {ZCOOL_XiaoWei, Montserrat} from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import localFont from "next/font/local";
import { GoogleTagManager } from '@next/third-parties/google'

const zcoolFont = ZCOOL_XiaoWei({
    variable: "--font-zcool",
    subsets: ["latin"],
    weight: ["400"],
    display: "swap",
});

// const buenosAires = localFont({
//     src: [
//         {
//             path: "../../fonts/BuenosAires-Light.ttf",
//             weight: "300",
//             style: "normal",
//         },
//         {
//             path: "../../fonts/BuenosAires-Regular.ttf",
//             weight: "400",
//             style: "normal",
//         },
//         {
//             path: "../../fonts/BuenosAires-Bold.ttf",
//             weight: "700",
//             style: "normal",
//         },
//     ],
//     variable: "--font-buenos-aires",
//     display: "swap",
// });

const buenosAires = Montserrat({
    variable: "--font-buenos-aires",
    display: "swap",
    weight: ['300', '400', '700'],
    subsets: ['latin']
});

export const metadata: Metadata = {
    title: "Senkoun Care Homes | Quality Care for Your Loved Ones",
    description:
        "Senkoun provides compassionate care homes offering nursing, dementia, and residential care services. Discover our warm, supportive environments for your loved ones.",
    keywords: [
        "care homes",
        "nursing care",
        "dementia care",
        "elderly care",
        "residential care",
    ],
    appleWebApp: {
        title: "Senkoun",
    }
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <GoogleTagManager gtmId="G-HN7PN9WLG6" />
        <body
            className={`${zcoolFont.variable} ${buenosAires.variable} antialiased font-body bg-[#fbf5f3]`}
        >
        <Header/>
        <main>{children}</main>
        <Footer/>
        </body>
        </html>
    );
}
