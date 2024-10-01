"use client"; // Ensures client-side rendering

import Link from "next/link";
import HighlightedText from "./highlighted-text"; // Import the HighlightedText component
import { useEffect, useState } from "react"; // For controlling color change

function HeroSection() {
  const [showDarkThistlePurple, setShowDarkThistlePurple] = useState(false);

  // UseEffect for text color change
  useEffect(() => {
    const textTimer = setTimeout(() => {
      setShowDarkThistlePurple(true);
    }, 4000); // After gradient animation (4 seconds)

    return () => clearTimeout(textTimer); // Cleanup timer
  }, []);

  return (
    <div className="w-full bg-cover bg-center flex flex-col justify-start items-start pt-10 md:pt-20 lg:pt-24 h-screen bg-hero-background">
      <div className="container w-full px-5 md:px-10 lg:px-16 mx-auto">
        {/* First Row */}
        <div className="rowOne flex flex-col md:flex-row justify-between items-center md:items-start space-y-0">
          <div className="column column-2-3 md:w-2/3">
            <h1
              className={`${
                showDarkThistlePurple
                  ? "text-darkThistlePurple-after"
                  : "gradient-text-animate"
              } text-animate mb-8 text-7xl md:text-7xl font-bold tracking-tighter leading-tight md:leading-normal`}
            >
              SHOW DON’T TELL
              <span className="ml-2 text-6xl md:hidden leading-snug">↓</span>
              <span className="ml-2 text-7xl hidden md:inline">→</span>
            </h1>
          </div>

          <div className="column column-1-3 w-full md:w-1/3 flex justify-start md:justify-end">
            <Link href="#portfolio-section" className="scroll-link">
              <button
                className="work-samples-btn button-animate px-6 py-3 md:px-8 md:py-5 lg:px-10 lg:py-6 gradient-button-animate text-4xl font-bold rounded-md transition duration-600"
                aria-label="View work samples"
              >
                WORK SAMPLES
              </button>
            </Link>
          </div>
        </div>

        {/* Second Row */}
        <div className="rowTwo flex flex-col md:flex-row justify-between items-start mt-10 md:mt-16">
          <div className="column column-1-2 md:w-1/2">
            <h3 className="text-xl md:text-3xl inline-block bg-white text-licorice p-2 md:bg-transparent tracking-tighter italic">
              sometimes a few words help too:
            </h3>

            <div className="my-2"></div>

            <h2 className="text-3xl md:text-5xl tracking-tighter font-semibold">
              <HighlightedText text="With over a decade of exploration and impactful work, I leverage creativity, problem- solving curiosity, and technical expertise to elevate brands, enchant users, and deliver tangible results." />
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
