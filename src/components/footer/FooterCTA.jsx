"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const FooterCTA = ({ localeFooter, lang }) => {
  return (
    <section className="absolute -top-48 maxsm:-top-60 right-[15%] z-20 w-[70%] maxsm:w-[90%] maxsm:right-[5%] flex flex-col items-center justify-center overflow-hidden min-h-[350px] bg-main-gradient text-white">
      <div className="flex flex-col gap-5 items-center justify-center text-center">
        <h2 className="absolute top-8 text-4xl maxmd:text-2xl maxmd:px-5 font-primary">
          {localeFooter.cta.title}
        </h2>
        <div className="-bottom-8  absolute">
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
            viewBox="0 0 300 300"
            className=" w-[350px] h-[350px]"
          >
            <defs>
              <path
                id="circlePath"
                d="M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 "
              />
            </defs>
            <text fill="#000">
              <textPath
                xlinkHref="#circlePath"
                className="text-[15px] font-secondary"
              >
                {localeFooter.cta.spinText}
              </textPath>
            </text>
          </motion.svg>
          <Link
            href={`/${lang}/#contacto`}
            className="w-24 h-24 uppercase absolute top-0 left-0 right-0 bottom-0 m-auto bg-dark text-white rounded-full font-primary flex items-center justify-center text-sm hover:scale-105 duration-200 ease-in-out"
          >
            {localeFooter.cta.btnText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FooterCTA;
