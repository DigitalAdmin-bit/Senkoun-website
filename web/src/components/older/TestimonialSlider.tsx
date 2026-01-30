"use client";

import { useState } from "react";
import Image from "next/image";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role?: string;
  rating: number;
  image?: string;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
  className?: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-5 w-5 ${
            star <= rating ? "text-accent" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialSlider({
  testimonials,
  className = "",
}: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  if (testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <section className={`bg-off-white py-16 md:py-24 ${className}`}>
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          {/* Quote Icon */}
          <div className="mb-6 flex justify-center">
            <svg
              className="h-12 w-12 text-primary/30"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          {/* Quote */}
          <blockquote className="font-heading text-2xl font-medium leading-relaxed text-gray-900 sm:text-3xl">
            "{current.quote}"
          </blockquote>

          {/* Rating */}
          <div className="mt-6 flex justify-center">
            <StarRating rating={current.rating} />
          </div>

          {/* Author */}
          <div className="mt-6 flex flex-col items-center">
            {current.image && (
              <div className="relative h-16 w-16 overflow-hidden rounded-full">
                <Image
                  src={current.image}
                  alt={current.author}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="mt-3">
              <p className="font-semibold text-gray-900">{current.author}</p>
              {current.role && (
                <p className="text-sm text-gray-600">{current.role}</p>
              )}
            </div>
          </div>

          {/* Navigation */}
          {testimonials.length > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={prevSlide}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:border-primary hover:text-primary"
                aria-label="Previous testimonial"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      index === currentIndex ? "bg-primary" : "bg-gray-300"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:border-primary hover:text-primary"
                aria-label="Next testimonial"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Example testimonials data
export const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "The care and attention my mother receives at Senkoun is exceptional. The staff treat her like family, and I have complete peace of mind knowing she's in such good hands.",
    author: "Sarah Thompson",
    role: "Daughter of Resident",
    rating: 5,
  },
  {
    id: "2",
    quote:
      "Moving into Emerald Lodge was the best decision I've made. The community here is wonderful, and I've made so many new friends. The staff genuinely care about our wellbeing.",
    author: "James Mitchell",
    role: "Resident",
    rating: 5,
  },
  {
    id: "3",
    quote:
      "We were amazed by the level of personalized care our father receives. The nursing team is highly professional yet incredibly warm and compassionate.",
    author: "Emily Watson",
    role: "Family Member",
    rating: 5,
  },
];
