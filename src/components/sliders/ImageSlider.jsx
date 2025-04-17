"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { coverImages } from "../../backend/data/constants";
import Link from "next/link";
import { ButtonMotion } from "../button/ButtonMotion";
import { motion } from "framer-motion";

// Extended data structure example - you'll need to update your actual data source
// If you're using the coverImages directly from constants, you might want to
// update that file instead or create a new data structure that combines images with content

export default function ImageSlider({ homeDic, lang }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    let intervalId;
    if (isAutoPlaying) {
      intervalId = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
    // eslint-disable-next-line
  }, [currentSlide, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === homeDic.coverSliders.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? homeDic.coverSliders.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Touch events for mobile swiping
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      nextSlide();
    }

    if (touchEnd - touchStart > 50) {
      // Swipe right
      prevSlide();
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Slides */}
      <div
        className="h-full w-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {homeDic.coverSliders.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 h-full w-full transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Image */}
            <Image
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="h-full w-full object-cover"
              fill
              priority
              sizes="100vw"
            />

            {/* Text Overlay with gradient background for better readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent">
              <div className="absolute bottom-64 left-0 w-full p-4 text-white maxmd:bottom-32 maxmd:p-8 maxlg:p-12">
                <div className="max-w-3xl">
                  <motion.h2
                    initial={{ opacity: 0, scale: 1, y: -10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      duration: 0.9,
                      type: "tween",
                      stiffness: 260,
                      damping: 20,
                    }}
                    className="mb-2 text-7xl font-bold maxmd:text-4xl "
                  >
                    <span className="text-accent dark:text-white font-black">
                      {slide.title}{" "}
                    </span>
                    <span className="text-white dark:text-accent font-black">
                      {slide.titleTwo}
                    </span>
                  </motion.h2>
                  <p className="mb-6 text-lg md:text-xl">{slide.subtitle}</p>
                  <div className="flex flex-wrap gap-4">
                    {slide.buttons.map((button, btnIndex) => (
                      <Link key={btnIndex} href={`${button.href}`}>
                        <ButtonMotion
                          aria-label="Contactar"
                          textClass={"text-white"}
                          textClassTwo={"text-white"}
                          className={`text-white px-10 py-3 font-medium flex items-center justify-center  text-xs ${
                            button.primary
                              ? "bg-secondary-gradient dark:bg-dark-gradient    tracking-widest"
                              : "bg-accent dark:bg-secondary-gradient"
                          }`}
                        >
                          {button.text}
                        </ButtonMotion>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {/* <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-2 text-white hover:bg-opacity-75 focus:outline-none md:left-8"
        aria-label="Previous slide"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button> */}

      {/* <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-2 text-white hover:bg-opacity-75 focus:outline-none md:right-8"
        aria-label="Next slide"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button> */}

      {/* Slide indicators */}
      <div className="absolute bottom-24 left-1/2 flex -translate-x-1/2 space-x-2 maxmd:bottom-8">
        {homeDic.coverSliders.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full md:h-3 md:w-3 ${
              currentSlide === index ? "bg-white" : "bg-white bg-opacity-50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play toggle */}
      <button
        onClick={toggleAutoPlay}
        className="absolute bottom-24 right-4 rounded-full bg-black bg-opacity-50 p-2 text-white hover:bg-opacity-75 focus:outline-none md:bottom-8 md:right-8"
        aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isAutoPlaying ? (
          <svg
            className="h-4 w-4 md:h-5 md:w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ) : (
          <svg
            className="h-4 w-4 md:h-5 md:w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
