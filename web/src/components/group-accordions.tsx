"use client";

import React from "react";
import * as Accordion from "@radix-ui/react-accordion";

export default function AccordionComponent({
                                               items,
                                           }: {
    items: { title: string; description: string }[];
}) {
    return (
        <div className="w-full max-w-2xl max-sm:max-w-full mx-auto p-6 max-sm:p-0">
            <Accordion.Root type="single" collapsible className="w-full">
                {items.map((item, index) => (
                    <Accordion.Item
                        key={index}
                        value={`item-${index}`}
                        className="border-b border-gray-200"
                    >
                        <Accordion.Header>
                            <Accordion.Trigger
                                className="flex w-full items-center gap-5 py-6 text-left transition-all hover:opacity-70 group">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-45 group-data-[state=open]:stroke-gray-800 stroke-gray-400"
                                >
                                    <path d="M24 11.9912L0 11.9912"/>
                                    <path d="M12.0076 24L12.0076 0"/>
                                </svg>

                                <span
                                    className="text-lg font-normal text-gray-400 group-data-[state=open]:text-gray-800 transition-colors">
                  {item.title}
                </span>
                            </Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content
                            className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                            <div className="pb-6 pt-0 text-gray-700 leading-relaxed">
                                {item.description}
                            </div>
                        </Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion.Root>
        </div>
    );
}
