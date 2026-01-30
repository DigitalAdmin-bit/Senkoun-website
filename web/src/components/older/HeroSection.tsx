import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  overlayOpacity?: number;
}

export default function HeroSection({
  title,
  subtitle,
  ctaText = "See Locations",
  ctaLink = "/care-homes",
  backgroundImage = "/hero-bg.jpg",
  overlayOpacity = 0.5,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 text-center text-white py-16">
        <h1 className="font-heading text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl mx-auto">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg text-white/90 max-w-2xl mx-auto md:text-xl">
            {subtitle}
          </p>
        )}
        {ctaText && ctaLink && (
          <div className="mt-8">
            <Link
              href={ctaLink}
              className="btn bg-accent hover:bg-accent-dark text-white px-8 py-4 text-lg"
            >
              {ctaText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
