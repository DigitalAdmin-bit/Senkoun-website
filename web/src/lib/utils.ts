import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import ALLOWED from "@/app/(homes)/[type]/allowed";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getStrapiMediaUrl(url: string) {
    if (url.startsWith("http") || url.startsWith("https")) {
        return url;
    }
    return `${process.env.STRAPI_URL}${url}`;
}

export async function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Get the actual and reference path names for a given home type.
 * @param type - one of the allowed home types (`actual` is the real name, `ref` is the processed path name)
 */
export function getHomesPath(type: typeof ALLOWED[number]) {
    switch (type) {
        case "care-home":
            return {actual: "care-home", ref: "care-home"} as const;
        case "supported-living":
            return {actual: "supported-living", ref: "supported-living"} as const;
    }

    return null;
}


type Block = {
    type: string;
    children?: Block[];
    text?: string;
};

/**
 * Convert strapi blocks to plain text
 * @param blocks
 */
export function blocksToPlainText(blocks: Block[]): string {
    const extractText = (node: Block): string => {
        if (node.text) return node.text;
        if (node.children) return node.children.map(extractText).join("");
        return "";
    };

    return blocks.map(extractText).join("\n").trim();
}