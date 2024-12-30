import React from "react";
import Image from "next/image";

const SideToSide = () => {
  return (
    <div className="w-full my-10">
      {/* underhero */}

      <section className=" py-8">
        <div className="container max-w-5xl mx-auto m-8">
          <div className="flex maxmd:flex-wrap items-center justify-center">
            <div className="w-2/5 maxmd:w-full p-6">
              <h2 className="text-3xl text-gray-800 dark:text-gray-300 font-primary leading-none mb-3">
                <span>Transforma tu experiencia digital con </span>
                <span className="text-secondary">Aceites CNR</span>
              </h2>
              <p className="font-secondary italic text-sm font-semibold mb-1">
                Nuestro equipo de expertos esta listo para asistir.
              </p>
              <p className="text-gray-800 dark:text-gray-300 font-secondary text-sm mb-8  maxmd:text-sm">
                Nos especializamos aplicaciones web escalables y de alto. Ya sea
                que sea una startup que busca dejar su huella o una empresa
                establecida que busca elevar su presencia digital, tenemos la
                experiencia y las herramientas para hacer realidad su visión.
              </p>
              <button
                aria-label="Contactar"
                className="bg-dark dark:bg-secondary px-4 py-3 text-white flex items-center justify-center uppercase text-xs tracking-widest"
              >
                Contáctenos
              </button>
            </div>
            <div className="relative w-full pl-6">
              {/* <!-- not-animated blob --> */}
              <div className="relative w-full">
                <div className={`relative `}>
                  <Image
                    className="object-cover w-full h-full z-50"
                    src="/images/h1-img2.jpg"
                    alt="Diseño Gráfico Profesional"
                    width={1080}
                    height={1080}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SideToSide;
