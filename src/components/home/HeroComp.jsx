"use client";
import React from "react";
import Image from "next/image";
import { sendGTMEvent } from "@next/third-parties/google";
import Link from "next/link";
import styles from "./homestyles.module.scss";

const HeroComp = () => {
  return (
    <div className="mt-10 mb-20 px-20 maxlg:px-4 flex min-h-full flex-col items-center justify-center ">
      {/* <!--Hero--> */}
      <div className=" text-black px-3 mx-auto flex  maxsm:flex-col flex-row items-center min-w-full">
        {/* <!--Left Col--> */}
        <div className="flex flex-col w-full minlg:w-1/2 justify-start items-start text-left">
          <p className="tracking-wider leading-light w-full maxmd:text-xs">
            Nuestra pasión es programar, diseñar y crear herramientas
            extraordinarias.
          </p>
          <h1 className="my-4 text-4xl maxmd:text-2xl font-bold leading-none">
            Somos tu mejor aliado para impulsar tu negocio o idea al siguiente
            nivel.
          </h1>
          <p className="leading-normal text-sm maxmd:text-sm mb-8">
            Cualquiera puede hacer un sitio web, pero para competir hoy en dia
            se requiere de una solution integral y personalizada enfocada en
            generar valor para tu negocio.
          </p>
          <Link
            href={"/servicios"}
            onClick={() =>
              sendGTMEvent({ event: "buttonClicked", value: "initial" })
            }
            className="flex bg-secondary text-white font-bold rounded-full  py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-500 ease-in-out text-sm"
          >
            ¿Te gustaría comenzar hoy?
          </Link>
        </div>
        {/* <!--Right Col--> */}
        <div className="w-full  minlg:w-1/2 py-6 text-center">
          {/* <!-- animated blob --> */}
          <div className={`relative overflow-hidden ${styles.animatedBlob}`}>
            <Image
              className="object-cover w-full h-full z-50"
              src="/images/programming-background-reactjs.webp"
              alt="hero image"
              width={500}
              height={500}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroComp;
