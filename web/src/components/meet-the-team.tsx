"use client";

import type { IHomeBySlugResponse } from "@/lib/apis/homes";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MeetTheTeam({
  data,
}: {
  data: IHomeBySlugResponse["teams"];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % data.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  if (!data || data.length === 0) return null;

  const currentMember = data[currentIndex];

  return (
    <section className="bg-[#57946C] mt-30">
      <div className="main-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md">
              <div className="bg-gray-300 aspect-3/4 overflow-hidden translate-y-[-100px]">
                {currentMember.image?.url ? (
                  <img
                    src={currentMember.image.url}
                    alt={
                      currentMember.image.alternativeText || currentMember.name
                    }
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-400 flex items-center justify-center">
                    <span className="text-gray-600 text-lg">No Image</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="text-white space-y-6">
            <div className="border-b border-white pb-4">
              <h2 className="text-3xl md:text-4xl font-light tracking-wide">
                Meet the Team
              </h2>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-normal">
                {currentMember.name}
              </h3>

              <p className="text-sm uppercase tracking-widest font-light">
                {currentMember.role}
              </p>

              <p className="text-base leading-relaxed font-light">
                {currentMember.description}
              </p>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={goToPrevious}
                disabled={data.length <= 1}
                className="size-10 rounded-full border border-white bg-transparent flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous team member"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={goToNext}
                disabled={data.length <= 1}
                className="size-10 rounded-full border border-white bg-transparent flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next team member"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
