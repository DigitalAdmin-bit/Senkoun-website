"use client";


import {useEffect, useRef, useState} from "react";

export default function HomesSubHeader({data}: {
    data: {
        label: string,
        href: string
    }[]
}) {
    const checkerElemRef = useRef<HTMLDivElement>(null);
    const headerElemRef = useRef<HTMLDivElement>(null);
    const [activeId, setActiveId] = useState("")

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                headerElemRef?.current?.classList.toggle("subheader-active", !entry.isIntersecting);
            },
            {threshold: 1}
        )

        if (checkerElemRef.current) {
            observer.observe(checkerElemRef.current)
        }

        return () => observer.disconnect()
    }, []);

    useEffect(() => {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                const visibleSections = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (visibleSections.length > 0) {
                    setActiveId(`#${visibleSections[0].target.id}`);
                }
            },
            {
                rootMargin: "-100px 0px -60% 0px", // adjust based on header height
                threshold: [0.25, 0.5, 0.75],
            }
        );

        data.forEach((tab) => {
            const section = document.querySelector(tab.href);
            if (section) {
                sectionObserver.observe(section);
            }
        });

        return () => sectionObserver.disconnect();
    }, [data]);

    return <>
        <div ref={checkerElemRef}></div>
        <div
            className="bg-white border-b border-b-[#B8853A] sticky top-0 z-50 left-0 max-md:hidden w-full"
            ref={headerElemRef}
        >
            <div className="max-w-[80%] mx-auto flex pt-4 text-sm max-sm:flex-wrap max-sm:max-w-[90%] max-sm:gap-x-6">
                {data.map((tab, i) => {
                    const isActive = activeId === tab.href;

                    return (
                        <a
                            key={i}
                            href={tab.href}
                            className={`px-5 py-4 max-sm:px-0 max-sm:py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5
                  ${
                                isActive
                                    ? "after:bg-[#B8853A]"
                                    : "hover:after:bg-[#B8853A]"
                            }`}
                        >
                            {tab.label}
                        </a>
                    );
                })}
            </div>
        </div>
    </>
}