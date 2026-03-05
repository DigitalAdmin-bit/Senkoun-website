'use client';

import { useState, useEffect } from 'react';

interface IGallery {
    url: string;
    alternativeText: string;
}

const CYCLE_INTERVAL = 4000; // 4 seconds
const RANDOM_OFFSET_RANGE = 2000; // Random offset up to 2 seconds

function GalleryImage({
    images,
    className,
    startIndex = 0
}: {
    images: IGallery[];
    className: string;
    startIndex?: number;
}) {
    const [currentIndex, setCurrentIndex] = useState(startIndex % images.length);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [intervalDuration] = useState(() => CYCLE_INTERVAL + Math.random() * RANDOM_OFFSET_RANGE);

    useEffect(() => {
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % images.length);
                setIsTransitioning(false);
            }, 500); // Half second fade duration
        }, intervalDuration);

        return () => clearInterval(interval);
    }, [images.length, intervalDuration]);

    if (images.length === 0) return null;

    return (
        <div className={`${className} overflow-hidden relative`}>
            <img
                draggable={false}
                src={images[currentIndex].url}
                alt={images[currentIndex].alternativeText}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                    isTransitioning ? 'opacity-0' : 'opacity-100'
                }`}
            />
        </div>
    );
}

export default function ImageBricksGallery({gallery}: {gallery: IGallery[]}) {
    if (!gallery || gallery.length === 0) {
        return <div className="w-full flex items-center justify-center max-w-7xl h-96 bg-gray-200">
            <p className="text-gray-500">No images available</p>
        </div>;
    }

    // Distribute images across the 4 tiles
    const imagesPerTile = Math.ceil(gallery.length / 4);
    const tile1Images = gallery.slice(0, imagesPerTile);
    const tile2Images = gallery.slice(imagesPerTile, imagesPerTile * 2);
    const tile3Images = gallery.slice(imagesPerTile * 2, imagesPerTile * 3);
    const tile4Images = gallery.slice(imagesPerTile * 3);

    return <div className="w-full flex gap-1 max-w-7xl h-125">
        <div className="flex-1 h-full">
            <GalleryImage
                images={tile1Images.length > 0 ? tile1Images : [gallery[0]]}
                className="w-full h-full"
                startIndex={0}
            />
        </div>

        <div className="flex flex-col flex-1 gap-1 w-full h-full">
            <div className="flex-1 flex gap-1 w-full h-full">
                <div className="flex-1 h-full">
                    <GalleryImage
                        images={tile2Images.length > 0 ? tile2Images : [gallery[0]]}
                        className="w-full h-full"
                        startIndex={1}
                    />
                </div>
                <div className="flex-1 h-full">
                    <GalleryImage
                        images={tile3Images.length > 0 ? tile3Images : [gallery[0]]}
                        className="w-full h-full"
                        startIndex={2}
                    />
                </div>
            </div>
            <div className="flex-1 h-full overflow-hidden">
                <GalleryImage
                    images={tile4Images.length > 0 ? tile4Images : [gallery[0]]}
                    className="w-full h-full"
                    startIndex={3}
                />
            </div>
        </div>
    </div>
}

