"use client";

import {ChevronRightIcon} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {SOCIAL_LINKS} from "@/data/socials";

const footerLinks = [
    {href: "/", title: "Home"},
    {href: "/#about-senkoun", title: "About Senkoun"},
    {href: "/#our-services", title: "Our Homes"},
    {href: "/", title: "Life at Senkoun"},
    {href: "/gallery", title: "Gallery"},
    {href: "/news", title: "News and Events"},
    {href: "/careers", title: "Careers"},
];

const companies = [
    {
        name: "Senkoun Healthcare Wakering Ltd",
        address: "72A Boscombe Road Southend-on-Sea\nEssex - SS2 4JP",
        companyNumber: "15148446",
    },
    {
        name: "Senkoun Integrated Healthcare Solutions Ltd",
        address: "72A Boscombe Road Southend-on-Sea\nEssex - SS2 4JP",
        companyNumber: "14789856",
    },
];


export default function Footer() {
    return (
        <footer className="bg-[#57946C] pb-10">
            <div className="main-container pt-10">
                <h3 className="font-light text-white text-[28px] font-body">
                    Subscribe to our newsletter
                </h3>
                <div className="flex justify-between my-8 max-sm:flex-col max-sm:gap-5">
                    <div className="space-x-5 space-y-5">
                        <input
                            placeholder="First Name"
                            className="max-sm:w-full bg-white/10 placeholder-white/60 border-[#FFFFFF4D] border-2 text-[#FFFFFF]/70 px-4 py-2 "
                        />
                        <input
                            placeholder="Last Name"
                            className="max-sm:w-full bg-white/10 placeholder-white/60 border-[#FFFFFF4D] border-2 text-[#FFFFFF]/70 px-4 py-2 "
                        />
                        <input
                            placeholder="Email Address"
                            className="max-sm:w-full bg-white/10 placeholder-white/60 border-[#FFFFFF4D] border-2 text-[#FFFFFF]/70 px-4 py-2 "
                        />
                    </div>
                    <button className="font-normal text-white max-sm:self-end max-sm:mt-5 cursor-pointer text-sm hover:opacity-80 flex items-center opacity-80">
                        SUBSCRIBE
                        <ChevronRightIcon className="h-4 w-4"/>
                    </button>
                </div>

                <Separator className="bg-white/20 mb-14"/>

                <div className="flex max-sm:flex-col sm:justify-between gap-5 mb-10">
                    <div className="flex mx-10 flex-col justify-between items-center max-sm:gap-5">
                        <img className="w-41.5" alt="Senkoun logo" src="/logo-white.webp" draggable="false"/>
                        <Link
                            href="/enquire"
                            className="mx-auto text-white border-white border px-4 py-2 mt-4 inline-block w-fit"
                        >
                            ENQUIRE
                        </Link>
                    </div>

                    <div className="border-white/20 sm:border-l-2 sm:min-h-full max-sm:w-full max-sm:border-t-2"/>

                    <div className="max-sm:mx-2 sm:mx-10 space-y-5">
                        {companies.map((company, index) => (
                            <div key={index}>
                                <h2 className="font-body text-white mb-4">{company.name}</h2>
                                <div className="flex items-start gap-3">
                                    <svg
                                        width="19"
                                        height="25"
                                        viewBox="0 0 19 25"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle
                                            cx="9.08774"
                                            cy="9.08627"
                                            r="5.11117"
                                            stroke="white"
                                            strokeWidth="1.13793"
                                        />
                                        <path
                                            d="M9.08789 0.568848V-0.000117838H9.08789L9.08789 0.568848ZM17.6064 9.0874H18.1754V9.0874L17.6064 9.0874ZM15.9033 14.1978L15.4483 13.856L15.4432 13.8631L15.9033 14.1978ZM9.08789 23.5679L8.62775 23.9025L9.08787 24.5352L9.54801 23.9025L9.08789 23.5679ZM2.28516 14.2144L2.74537 13.8796L2.73927 13.8716L2.28516 14.2144ZM0.569336 9.0874L0.000370443 9.0874V9.0874H0.569336ZM9.08789 0.568848V1.13781C13.4783 1.13781 17.0374 4.69696 17.0375 9.08741L17.6064 9.0874L18.1754 9.0874C18.1754 4.0685 14.1068 -0.000117838 9.08789 -0.000117838V0.568848ZM17.6064 9.0874H17.0375C17.0375 10.8774 16.4462 12.5275 15.4484 13.8561L15.9033 14.1978L16.3583 14.5394C17.4988 13.0207 18.1754 11.1324 18.1754 9.0874H17.6064ZM15.9033 14.1978L15.4432 13.8631L8.62777 23.2332L9.08789 23.5679L9.54801 23.9025L16.3634 14.5324L15.9033 14.1978ZM9.08789 23.5679L9.54803 23.2332L2.7453 13.8797L2.28516 14.2144L1.82502 14.549L8.62775 23.9025L9.08789 23.5679ZM2.28516 14.2144L2.73927 13.8716C1.73438 12.5403 1.1383 10.8843 1.1383 9.0874H0.569336H0.000370443C0.000370443 11.1404 0.682419 13.0354 1.83104 14.5571L2.28516 14.2144ZM0.569336 9.0874L1.1383 9.08741C1.13834 4.69698 4.69747 1.13785 9.0879 1.13781L9.08789 0.568848L9.08789 -0.000117838C4.06901 -7.77245e-05 0.000410557 4.06852 0.000370443 9.0874L0.569336 9.0874Z"
                                            fill="white"
                                        />
                                    </svg>

                                    <div>
                                        <p className="font-semibold text-white text-sm tracking-[0] leading-6">
                                            Registered Address
                                        </p>
                                        <p className="font-normal text-white text-xs tracking-[0] leading-6 whitespace-pre-line line-clamp-3">
                                            {company.address}
                                        </p>
                                        <p className="font-normal text-white text-xs tracking-[0] leading-6">
                                            Company Number: {company.companyNumber}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-white/20 sm:border-l-2 sm:min-h-full max-sm:w-full max-sm:border-t-2"/>

                    <nav className="sm:mx-10 max-sm:flex-wrap flex flex-col gap-2 max-sm:gap-6 max-sm:mx-2 max-sm:flex-row">
                        {footerLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className="font-normal text-white text-base hover:opacity-80 transition-opacity"
                            >
                                {link.title}
                            </a>
                        ))}
                    </nav>
                </div>

                <Separator className="bg-white/20 mb-8.5"/>

                <div className="max-sm:mx-2 flex items-center justify-between max-sm:flex-col max-sm:gap-4">
                    <div className="flex items-center gap-8">
                        {SOCIAL_LINKS.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={link.whiteIcon}
                                    alt={link.name}
                                    draggable={false}
                                    className="w-6 h-6 hover:opacity-80 transition-opacity"
                                />
                            </a>
                        ))}
                    </div>
                    <div className="flex max-sm:flex-col max-sm:gap-3 items-center gap-10">
                        <Link
                            href="/privacy-policy"
                            className="font-light text-white text-base tracking-[0] leading-6 underline hover:opacity-80"
                        >
                            Privacy Policy
                        </Link>
                        <p className="max-sm:text-xs font-light text-white text-base tracking-[0] leading-6">
                            @ 2025 senkoun. All rights reserved
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
