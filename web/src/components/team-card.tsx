"use client";

import {useState} from "react";
import {cn, getStrapiMediaUrl} from "@/lib/utils";

export default function TeamCard({name, position, image, text}: {
    name: string,
    position: string,
    image: string,
    text: string
}) {
    const [descVisible, setDescVisible] = useState(false);

    return <div className="flex-1 flex flex-col gap-0">
        <div className="flex-1 w-full h-full relative overflow-hidden">
            <img alt={name} className="w-full aspect-square object-cover" src={getStrapiMediaUrl(image)}/>

            <div className={cn("absolute inset-0 line-clamp-10 bg-black/70 text-white p-4 cursor-pointer translate-y-[-100%] transition-all opacity-0",
                    descVisible && "opacity-100 translate-y-0",
                )}>
                {text || "Coming soon :)"}
            </div>
            <button
                className={cn("absolute bottom-5 right-5 transition-transform rounded-full p-2 border border-white bg-black/10 hover:bg-black/20 cursor-pointer",
                    descVisible && "rotate-45"
                )}
                onClick={() => {
                    setDescVisible(p => !p)
                }}
            >
                <svg width="16" height="16" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.34766 0V12.7059" stroke="white"/>
                    <path d="M12.7051 6.34766L-0.000804901 6.34766" stroke="white"/>
                </svg>
            </button>
        </div>
        <h3 className="mt-6 mb-4 text-2xl font-bold truncate line-clamp-1">{name}</h3>
        <p className="text-[#64565A] truncate line-clamp-1 text-sm">{position.toUpperCase()}</p>
    </div>
}