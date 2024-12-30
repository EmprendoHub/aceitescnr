import React from "react";
import styles from "./homestyles.module.scss";

const WhyUs = () => {
  return (
    <div className="w-full h-screen my-10 mx-auto flex items-center justify-center pb-20">
      <div
        className={`relative h-[550px] w-[70%] bg-secondary-gradient  ${styles.curvedTop} ${styles.curvedBottom}`}
      >
        <div className="w-full uppercase text-[9rem] maxlg:text-[7rem] maxmd:text-[5rem] maxsm:text-[4rem] leading-none absolute min-w-full text-center min-h-full flex flex-col items-center font-black justify-center  text- opacity-10 font-secondary overflow-hidden">
          <p>Porque</p>
          <p>Nosotros</p>
        </div>
        <p className="text-white text-sm">
          No te pierdas en el desierto tecnológico. Programa una asesoría gratis
          y descubre los beneficios de trabajar con Emprendomex.
        </p>
      </div>
    </div>
  );
};

export default WhyUs;
