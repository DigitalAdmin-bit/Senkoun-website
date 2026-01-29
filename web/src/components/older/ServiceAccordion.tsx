"use client";

import { useState } from "react";

interface Service {
    id: string;
    title: string;
    description: string;
}

interface ServiceAccordionProps {
    services: Service[];
    className?: string;
}

export default function ServiceAccordion({
    services,
    className = "",
}: ServiceAccordionProps) {
    const [openId, setOpenId] = useState<string | null>(services[0]?.id || null);

    const toggleService = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className={`space-y-3 ${className}`}>
            {services.map((service) => (
                <div
                    key={service.id}
                    className="rounded-xl border border-gray-200 overflow-hidden transition-all duration-300"
                >
                    <button
                        onClick={() => toggleService(service.id)}
                        className="flex w-full items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                        aria-expanded={openId === service.id}
                    >
                        <span className="font-heading text-lg font-semibold text-gray-900">
                            {service.title}
                        </span>
                        <svg
                            className={`h-5 w-5 text-primary transition-transform duration-300 ${openId === service.id ? "rotate-180" : ""
                                }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                    </button>
                    <div
                        className={`grid transition-all duration-300 ${openId === service.id
                                ? "grid-rows-[1fr] opacity-100"
                                : "grid-rows-[0fr] opacity-0"
                            }`}
                    >
                        <div className="overflow-hidden">
                            <div className="px-5 pb-5 text-gray-600">
                                {service.description}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// Example services data structure
export const defaultServices: Service[] = [
    {
        id: "nursing",
        title: "Nursing Care",
        description:
            "Our skilled nursing team provides 24/7 medical care and support for residents with complex health needs. We work closely with doctors and specialists to ensure the highest quality of care.",
    },
    {
        id: "dementia",
        title: "Dementia Care",
        description:
            "Specialized support for residents living with dementia or Alzheimer's disease. Our trained staff create a safe, engaging environment that promotes dignity and quality of life.",
    },
    {
        id: "residential",
        title: "Residential Care",
        description:
            "Comfortable accommodation with personalized support for daily activities. We help residents maintain their independence while providing assistance when needed.",
    },
    {
        id: "respite",
        title: "Respite Care",
        description:
            "Short-term stays to give family caregivers a well-deserved break. Our respite care provides all the support and activities of long-term care for temporary periods.",
    },
    {
        id: "palliative",
        title: "Palliative Care",
        description:
            "Compassionate end-of-life care focused on comfort and dignity. We support both residents and their families through this difficult time with empathy and expertise.",
    },
];
