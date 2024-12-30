"use client";
import React from "react";
import Image from "next/image";
import DoubleSideToSide from "@/components/home/DoubleSideToSide";
import coverImage from "../../../public/images/hero-banner-homepage.webp";

const ServiceComp = ({ homeDic, servicesDic }) => {
  return (
    <div className="services-body">
      <div className="w-full h-[600px] overflow-hidden top-0 relative flex justify-center items-center flex-col ">
        <div className="absolute bg-dark bg-opacity-40 w-full h-full z-0" />
        <Image
          src={coverImage}
          width={1920}
          height={1080}
          priority
          loading="eager"
          alt="services image"
          className="object-cover maxsm:object-left h-full w-full"
        />
        <div className="absolute z-10 text-white text-5xl maxsm:text-3xl  font-primary w-[50%] maxsm:w-[80%] text-center">
          <p className="uppercase text-xs tracking-widest font-secondary">
            {servicesDic.pretitle}
          </p>
          <h3> {servicesDic.title}</h3>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicesDic.services.map((service) => (
              <div
                key={service.title}
                className="bg-gray-300 dark:bg-gray-900 p-6 rounded-lg shadow-md  shadow-transparent"
              >
                <Image
                  src={service.icon}
                  alt="Bespoke Website Design"
                  width={500}
                  height={300}
                  className=" w-12 h-12  dark:bg-white rounded-full"
                />
                <h3 className="text-2xl font-primary font-bold mt-4">
                  {service.title}
                </h3>
                <p className="mt-2 font-secondary text-sm">{service.text}</p>
              </div>
            ))}
          </div>
        </div>
        <DoubleSideToSide homeDic={homeDic} />
      </div>
    </div>
  );
};

export default ServiceComp;
