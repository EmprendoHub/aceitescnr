"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TestimonialCard from "./TestimonialCard";

const TestimonialSlider = ({ homeDic }) => {
  const settings = {
    dots: true,
    lazyLoad: true,
    centerMode: true,
    infinite: true,
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    arrows: false,
    className: "center mx-auto flex max-w-[100vw]",
  };

  return (
    <div className="relative flex flex-col my-40">
      <section className=" py-8 h-full relative mb-5 px-10 maxsm:px-2">
        <h2 className="w-full my-2 text-3xl font-primary leading-tight text-center text-gray-800 dark:text-gray-300">
          <span> {homeDic.customerSay.title} </span>
          <span className="text-secondary">{homeDic.customerSay.titleTwo}</span>
        </h2>
        <div className="w-full mb-4 text-sm maxmd:text-xs">
          <div className="block h-1 mx-auto w-full  my-0 py-0 rounded-t text-center maxmd:px-1  font-secondary">
            {homeDic.customerSay.subtitle}
          </div>
        </div>
      </section>
      <div className="">
        <Slider {...settings}>
          {homeDic.customerSay.testimonials.slice(0, 12).map((item, index) => {
            return <TestimonialCard testimonial={item} key={index} />;
          })}
        </Slider>
      </div>
    </div>
  );
};

export default TestimonialSlider;
