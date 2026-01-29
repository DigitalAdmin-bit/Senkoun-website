import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export function getStrapiMediaUrl(url: string) {
    return `${process.env.STRAPI_URL}${url}`;
}