// HeroSlider.jsx
"use client";
import React, { useState, useEffect } from "react";
import styles from "./HeroSliderPush.module.scss";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import MainSliderItems from "./MainSliderItems";
import MainSliderItemsText from "./MainSliderItemsText";

const HeroSlider = ({ homeDic, lang }) => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % homeDic.sliders.length);
      }, 5000);
    } else if (isPaused && index === 0) {
      interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % homeDic.sliders.length);
      }, 10000);
    }

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div
      className="relative min-h-[80dvh] justify-center flex items-center maxmd:flex-col w-full px-40 maxxlg:px-20 maxmd:px-5 maxsm:pl-2 py-20 maxsm:pt-10 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`relative min-h-full w-full ${styles.textSlider}`}>
        {homeDic.sliders.map((item, idx) => (
          <div
            key={item.title}
            className={`${styles.slide} ${idx === index ? styles.active : ""} ${
              styles.fromLeft
            }`}
          >
            <MainSliderItemsText item={item} index={idx} lang={lang} />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 z-0">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70 z-10" />

        {/* Images Container */}
        <div className={`${styles.imageSlider} absolute inset-0`}>
          {homeDic.sliders.map((item, idx) => (
            <div
              key={idx}
              className={`${styles.slide} ${
                idx === index ? styles.active : ""
              } ${styles.fromRight}`}
            >
              <MainSliderItems item={item} index={idx} />
            </div>
          ))}
        </div>
      </div>

      <button
        aria-label="leftArrow"
        className={`${styles.arrowLeft} text-white right-[220px] bottom-[80px] maxxlg:right-[130px]`}
        onClick={() =>
          setIndex(
            (index - 1 + homeDic.sliders.length) % homeDic.sliders.length
          )
        }
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <BsChevronLeft className="text-4xl" />
      </button>
      <button
        aria-label="rightArrow"
        className={`${styles.arrowRight} text-white right-[170px] bottom-[80px] maxxlg:right-[80px]`}
        onClick={() => setIndex((index + 1) % homeDic.sliders.length)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <BsChevronRight className="text-4xl" />
      </button>
    </div>
  );
};

export default HeroSlider;
