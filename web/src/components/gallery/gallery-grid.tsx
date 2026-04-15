'use client';

import {XIcon} from "lucide-react";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export interface GalleryImageItem {
    url: string;
    alternativeText?: string | null;
    width?: number | null;
    height?: number | null;
}

function GalleryTile({image, index}: { image: GalleryImageItem; index: number }) {
    const label = image.alternativeText?.trim() || `Gallery image ${index + 1}`;

    return <Dialog>
        <DialogTrigger asChild>
            <button
                type="button"
                className="group relative aspect-4/3 overflow-hidden bg-[#F4F0EA] shadow-sm ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8853A]"
                aria-label={`Open preview for ${label}`}
            >
                <img
                    src={image.url}
                    alt={label}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </button>
        </DialogTrigger>

        <DialogContent
            showCloseButton={false}
            className="bg-transparent border-none p-0"
        >
            <DialogClose asChild>
                <button
                    type="button"
                    aria-label="Close image preview"
                    className="absolute -right-10 -top-10 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                >
                    <XIcon className="h-5 w-5"/>
                </button>
            </DialogClose>

            <DialogHeader className="sr-only">
                <DialogTitle>{label}</DialogTitle>
                <DialogDescription>Preview of {label}</DialogDescription>
            </DialogHeader>

            <img
                src={image.url}
                alt={label}
                className="object-contain w-full h-auto shadow-lg"
            />
        </DialogContent>
    </Dialog>;
}

export default function GalleryGrid({images}: { images: GalleryImageItem[] }) {
    if (!images.length) {
        return <div
            className="flex min-h-80 items-center justify-center rounded-2xl border border-dashed border-[#CEC5C5] bg-white px-6 py-16 text-center text-sm text-[#64565A]">
            No gallery images available.
        </div>;
    }

    return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.map((image, index) => (
            <GalleryTile key={`${image.url}-${index}`} image={image} index={index}/>
        ))}
    </div>;
}

