"use client";

import { ButtonMotion } from "@/components/button/ButtonMotion";
import WhiteLogoComponent from "@/components/logos/WhiteLogoComponent";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsWhatsapp, BsXCircle } from "react-icons/bs";

const PrivateLabel = ({ content, lang }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className="bg-background font-poppins">
      {/* Hero Section */}
      <section className="flex maxmd:flex-col gap-7 items-center maxmd:items-start justify-between p-8 pt-20 bg-main-gradient text-white py-24 px-40 maxxlg:px-20 maxlg:px-5">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
        >
          <h1 className="text-4xl maxsm:text-2xl font-bold">
            {content.hero.title}
          </h1>
          <p className="mt-4 maxsm:text-sm">{content.hero.description}</p>
          <button onClick={toggleModal} className="mt-6 ">
            <ButtonMotion
              aria-label="Contactar"
              textClass={"text-white"}
              textClassTwo={"text-white"}
              className="bg-accent dark:bg-secondary-gradient px-10 py-3 text-white flex items-center justify-center  text-xs tracking-widest mt-5"
            >
              {content.hero.cta}
            </ButtonMotion>
          </button>
        </motion.div>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
        >
          <Image
            src={content.images.mainImage}
            alt="Hero image"
            className="max-w-xl maxsm:max-w-[95%] rounded-lg shadow-lg"
            width={500}
            height={500}
          />
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-12 bg-secondary px-40 maxmd:px-5">
        <h2 className="text-3xl font-semibold text-center mb-6">
          {content.services.title}
        </h2>
        <ul className="space-y-4">
          {content.services.items.map((item, index) => (
            <li key={index} className="flex items-start gap-4">
              <span className="text-primary font-bold">•</span>
              <p>{item}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Process Section */}
      <section className="bg-gray-100 py-12 px-5 flex flex-col items-center">
        <h2 className="text-3xl font-semibold text-center mb-6 text-black">
          {content.process.title}
        </h2>
        <div className="space-y-8">
          {content.process.steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-secondary text-center px-60 maxmd:px-5">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
          className="gap-3 flex flex-col items-center justify-center w-full"
        >
          <Image
            src={content.images.mainImage}
            alt="Call to action image"
            className="max-w-md maxsm:max-w-[95%] rounded-lg shadow-lg"
            width={500}
            height={500}
          />
          <h2 className="text-3xl font-semibold mb-4">{content.cta.title}</h2>
          <p className="mb-6">{content.cta.description}</p>

          <button onClick={toggleModal} className="mt-6 ">
            <ButtonMotion
              aria-label="Contactar"
              textClass={"text-white"}
              textClassTwo={"text-white"}
              className="bg-accent dark:bg-secondary-gradient px-10 py-3 text-white flex items-center justify-center  text-xs tracking-widest mt-5"
            >
              {content.cta.button}
            </ButtonMotion>
          </button>
        </motion.div>
      </section>

      {/* Branding Examples */}
      <section className="py-12 px-5 bg-gray-200">
        <h2 className="text-3xl font-semibold text-center mb-6">
          {content.brandingTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.images.brandingExamples.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Branding example ${index + 1}`}
              className="rounded-lg shadow-lg"
              width={400}
              height={400}
            />
          ))}
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-main-gradient relative text-white text-center rounded-lg shadow-lg w-[90%] max-w-lg p-10 gap-3 flex flex-col items-center justify-center"
          >
            <button
              onClick={toggleModal}
              className="absolute right-3 top-3 px-2 py-2 flex items-center  bg-red-500 text-white rounded-full"
            >
              <BsXCircle />
            </button>
            <div className="flex w-full items-center justify-center">
              <WhiteLogoComponent />
            </div>
            <h2 className="text-2xl font-bold">{content.cta.title}</h2>
            <p className="text-sm">{content.cta.description}</p>
            <div className="flex justify-center items-center w-full gap-5">
              <Link
                href={
                  lang === "es"
                    ? `https://api.whatsapp.com/send/?phone=523931021001&text=Hola+%2AAceites+CNR%2A.+Me+Interesa+cotizar+y+obtener+m%C3%A1s+informaci%C3%B3n+de+su+servicio+de+maquila
                      &type=phone_number&app_absent=0`
                    : `https://api.whatsapp.com/send/?phone=523931021001&text=Hello+%2AAceites+CNR%2A.+Im+Interested+in+getting+a+quote+and+more+information+in+your+maquila+service
                      &type=phone_number&app_absent=0`
                }
                target="_blank"
              >
                <button
                  onClick={toggleModal}
                  className="mt-4 px-6 py-2 flex items-center gap-3 bg-emerald-700 text-white rounded-lg"
                >
                  {lang === "es" ? "WhatsApp" : "WhatsApp"} <BsWhatsapp />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PrivateLabel;
