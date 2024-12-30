"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import coverImage from "../../../public/images/ecommerce_api_personalizada.webp";
import coverImageTwo from "../../../public/images/Como_un_Comercio_electronico_puede_crecer_tu_negocio.webp";

import { RiShareForwardFill } from "react-icons/ri";
import HiresUsModal from "../modals/HiresUsModal";

const DropShippingComp = ({ dropshippingDic, lang }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <HiresUsModal
        showModal={showModal}
        setShowModal={setShowModal}
        lang={lang}
      />
      <div className="w-full h-full overflow-hidden">
        {/* Hero Section */}
        <div className="w-full h-screen overflow-hidden top-0 relative flex justify-center items-center flex-col ">
          <div className="absolute bg-dark bg-opacity-70 w-full h-full z-0" />
          <Image
            src={coverImage}
            width={1920}
            height={1080}
            priority
            loading="eager"
            alt="contact cover image"
            className="object-cover h-full w-full"
          />
          <div className="absolute flex flex-col items-center justify-center z-10 text-white text-5xl maxsm:text-3xl  font-primary w-[50%] maxlg:w-[80%] text-center">
            <p className="uppercase text-[12px] font-secondary">
              {dropshippingDic?.pretitle}
            </p>
            <h2 className="text-4xl  font-primary leading-none mb-3">
              <span>{dropshippingDic?.title} </span>
              <span className="text-primary">{dropshippingDic?.titleTwo}</span>
            </h2>
            <p className=" text-[16px] leading-tight font-secondary">
              {dropshippingDic?.subtitle}
            </p>
            <Link
              href={`/${lang}/servicios/dropshipping/#queesdropshipping`}
              aria-label="Contactar"
              className="bg-main-gradient px-4 w-60 py-3 mt-5 text-white flex items-center justify-center uppercase text-xs tracking-widest"
            >
              {dropshippingDic?.btnText}
            </Link>
          </div>
        </div>
        {/* What is it and How It Works */}
        <div
          id="queesdropshipping"
          className="flex relative flex-col gap-5 items-center justify-center px-10 maxmd:px-5 maxsm:px-1 my-20"
        >
          <h2 className="text-4xl text-center font-primary leading-none ">
            <span>{dropshippingDic?.what.title} </span>
            <span className="text-primary">
              {dropshippingDic?.what.titleTwo}
            </span>
          </h2>
          <p className="text-gray-800 text-center dark:text-gray-300 font-secondary text-sm mb-8  maxmd:text-sm">
            {dropshippingDic.what.subtitle}
          </p>
          <div className="flex flex-wrap gap-y-5 items-center justify-center">
            {dropshippingDic &&
              dropshippingDic?.what?.list.map((step, index) => (
                <article key={step._id} className=" w-40 maxsm:w-36">
                  <div className="flex relative  gap-3 items-center justify-center">
                    <div className="text-center flex-col flex items-center gap-3 pr-5">
                      <div className="flex items-center justify-center w-5 h-5 uppercase bg-primary rounded-full p-4 text-sm ">
                        {step?.pretitle}
                      </div>
                      <Image
                        src={step?.icon}
                        alt="icon"
                        width={500}
                        height={500}
                        className="pl-3 mb-2 w-[200px] h-[200px]  maxsm:w-[100px] maxsm:h-[100px]"
                      />
                      <h3 className="text-sm font-secondary leading-tight mb-1 ">
                        <span>{step.title} </span>
                        <span className="text-primary">{step.titleTwo}</span>
                      </h3>
                    </div>

                    {dropshippingDic?.what?.list.length !== index + 1 && (
                      <RiShareForwardFill
                        size={20}
                        className="absolute right-0"
                      />
                    )}
                  </div>
                </article>
              ))}
          </div>
        </div>
        {/* Intro Section */}
        <div className="relative w-full mx-auto mt-5 bg-main-gradient pt-20 px-20 maxmd:px-5">
          <div className="flex maxmd:flex-wrap h-full items-end justify-center">
            {/* Text Box */}
            <div className="w-2/3 flex flex-col items-start maxmd:w-full p-6 z-10">
              <p className="text-[13px] uppercase font-secondary text-gray-200">
                {dropshippingDic.description.boxOne.preTitle}
              </p>
              <h2 className="text-4xl maxmd:text-3xl  font-primary  leading-tight mb-3">
                <span className="text-white">
                  {dropshippingDic.description.boxOne.title}{" "}
                </span>
                <span className="text-dark">
                  {dropshippingDic.description.boxOne.titleTwo}
                </span>
              </h2>
              <p className="font-secondary italic text-sm mb-10 text-white">
                {dropshippingDic.description.boxOne.subtitle}
              </p>

              <button
                onClick={() => setShowModal(true)}
                aria-label="Contactar"
                className="bg-dark  px-4 py-3 text-white flex items-center justify-center uppercase text-xs tracking-widest"
              >
                {dropshippingDic.description.boxOne.btnText}
              </button>
            </div>
            {/* Image Box */}
            <div className="relative w-1/2 h-full maxmd:w-full maxsm:px-5 maxmd:-mt-20 -mb-1">
              <div className="relative w-full h-full">
                <Image
                  className="object-cover z-50"
                  src="/images/webp_api_integraciion_ecommerce_growth.webp"
                  alt="Diseño Gráfico Profesional"
                  width={550}
                  height={550}
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* What can our service do for you? */}
        <div className="w-full h-[650px] overflow-hidden top-0 relative flex justify-center items-center flex-col">
          <div className="absolute bg-dark bg-opacity-70 w-full h-full z-0" />
          <Image
            src={coverImageTwo}
            width={1920}
            height={1080}
            priority
            loading="eager"
            alt="contact cover image"
            className="object-cover h-full w-full"
          />
          <div className="absolute z-10 text-white text-5xl maxsm:text-3xl  font-primary w-[70%] maxsm:w-[95%] text-center mx-auto flex justify-center items-center flex-col">
            <p className="uppercase text-[12px] font-secondary">
              {dropshippingDic?.why.subtitle}
            </p>
            <h2 className="text-4xl  font-primary leading-none mb-3">
              <span>{dropshippingDic?.why.title} </span>
              <span className="text-primary">
                {dropshippingDic?.why.titleTwo}
              </span>
            </h2>
            <p className=" text-[18px] leading-normal font-secondary">
              {dropshippingDic?.why.rightText}
            </p>
            <div
              onClick={() => setShowModal(true)}
              aria-label="Contactar"
              className="bg-main-gradient cursor-pointer w-60 justify-self-center px-4 py-3 mt-5 text-white flex items-center justify-center uppercase text-xs tracking-widest"
            >
              {dropshippingDic?.why.btnText}
            </div>
          </div>
        </div>

        {/* 3 Main Features */}
        <div className="flex relative flex-col gap-5 items-center justify-center px-10 maxmd:px-5 my-20">
          <h2 className="text-4xl text-center font-primary leading-none ">
            <span>{dropshippingDic?.features.title} </span>
            <span className="text-primary">
              {dropshippingDic?.features.titleTwo}
            </span>
          </h2>
          <p className="text-gray-800 dark:text-gray-300 font-secondary text-sm mb-8  maxmd:text-sm">
            {dropshippingDic.features.subtitle}
          </p>
          <div className="flex gap-y-5 maxsm:flex-col items-center">
            {dropshippingDic &&
              dropshippingDic?.features?.list.map((step) => (
                <article key={step._id} className="border-l-2 border-secondary">
                  <div className="">
                    <Image
                      src={step.icon}
                      alt="icon"
                      width={120}
                      height={120}
                      className="pl-3 mb-2"
                    />
                    <div className="px-3 ">
                      <div className="">
                        <div className="uppercase text-gray-600 text-[10px] tracking-widest">
                          {step?.pretitle}
                        </div>
                      </div>
                      <div className="qodef-e-text">
                        <h3 className="text-2xl font-primary leading-tight mb-1 ">
                          <span>{step.title} </span>
                          <span className="text-secondary">
                            {step.titleTwo}
                          </span>
                        </h3>
                        <p className="font-secondary text-sm">{step?.text}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="flex maxmd:flex-col items-center justify-center my-20 py-20 px-20 maxmd:px-5 bg-main-gradient">
          <div className="flex w-full flex-col text-center items-center justify-center h-full ">
            <Image
              src={"/images/webp_api_integraciion_ecommerce.webp"}
              width={350}
              height={264}
              alt="api graphic"
            />
            <p className="text-gray-300 font-secondary text-[12px] uppercase mb-1">
              {dropshippingDic?.cta.pretitle}
            </p>

            <p className="text-gray-300 font-secondary text-sm mb-8  maxmd:text-sm">
              {dropshippingDic?.cta.subtitle}
            </p>
          </div>
          <div className="w-full flex-col items-start flex px-5">
            <h2 className="text-3xl  font-primary leading-none mb-3">
              <span className="text-gray-300">
                {dropshippingDic?.cta.title}{" "}
              </span>
              <span className="text-dark">{dropshippingDic?.cta.titleTwo}</span>
            </h2>
            <p className="font-secondary text-gray-300">
              {dropshippingDic?.cta.rightText}
            </p>
            <div
              onClick={() => setShowModal(true)}
              aria-label="Contactar"
              className="bg-dark cursor-pointer px-4 py-3 mt-5 text-white flex items-center justify-center uppercase text-xs tracking-widest"
            >
              {dropshippingDic?.cta.btnText}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DropShippingComp;
