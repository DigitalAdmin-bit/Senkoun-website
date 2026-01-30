export default function HeroSection({ bg }: { bg: string }) {
  return (
    <section className="relative py-20 md:py-32 text-center text-white h-150 overflow-hidden">
      <img
        src={bg}
        alt="Hero Background"
        className="absolute top-0 left-0 w-full object-cover object-center"
      />

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 z-20">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-15 md:h-25"
        >
          <path
            d="M 0 120 L 1200 120 L 1200 120 Q 614 -31 0 120 Z"
            className="fill-[#fbf5f3]"
          ></path>
        </svg>
      </div>
    </section>
  );
}
