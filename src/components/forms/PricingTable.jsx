import React from "react";
import "./formscss.scss";
import { TbWorldWww } from "react-icons/tb";
import { GiServerRack } from "react-icons/gi";
import { SiAdobeindesign } from "react-icons/si";
import { RiPagesFill } from "react-icons/ri";
import { BsSpeedometer2, BsStripe } from "react-icons/bs";
import { MdLocalGroceryStore } from "react-icons/md";
import { TfiPanel } from "react-icons/tfi";
import { FaCashRegister, FaExpeditedssl } from "react-icons/fa6";
import { LuDatabaseBackup } from "react-icons/lu";

const PricingTable = () => {
  return (
    <div className="my-10 ">
      <section className=" py-8">
        <div className="container mx-auto px-2 pt-4 pb-12 text-gray-800">
          <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-slate-900">
            Precios
          </h1>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>
          <div className="flex gap-5 flex-col sm:flex-row items-center justify-center pt-12 my-12 sm:my-4">
            {/* Price 1 */}
            <div className="relative flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-2xl mt-4">
              {/* <!-- Tag element --> */}
              <span className="tag-special font-sans font-bold tracking-wide text-xl top-20 bg-purple-700 before:border-t-[45px]  before:border-l-[0px]  before:border-purple-700 text-white shadow-md shadow-black py-1 pl-1 after:shadow-md ">
                INFORMATIVA
              </span>
              <div className="flex-1 bg-purple-100  text-gray-600 rounded-t-2xl rounded-b-none overflow-hidden shadow  p-3">
                <div className="pb-2 pt-20 text-xl font-bold text-center ">
                  BÁSICO
                </div>
                <div className="h-1 w-full  from-purple-500 to-purple-800 bg-gradient-to-t bg-black my-0 py-0 rounded-t p-3"></div>
                <ul className="w-full flex flex-col items-center text-center text-xs">
                  <li className="border-b py-4 flex items-center gap-2">
                    <TbWorldWww /> Dominio (.com)
                  </li>
                  <li className="border-b py-4 flex items-center gap-2">
                    <GiServerRack />
                    Servidor Privado
                  </li>
                  <li className="border-b py-4 flex items-center gap-2">
                    <SiAdobeindesign />
                    Diseño Moderno
                  </li>
                  <li className="border-b py-4 flex items-center gap-2">
                    <RiPagesFill />3 Paginas
                  </li>
                </ul>
              </div>
              <div className="flex-none mt-auto bg-purple-500 rounded-b-2xl rounded-t-none overflow-hidden shadow p-6">
                <div className="w-full maxlg:text-xl pt-6 text-3xl font-bold text-center text-white">
                  $1,499.00
                  <span className="text-base">/Men.</span>
                </div>
                <div className="flex items-center justify-center">
                  <button className="mx-auto lg:mx-0  bg-gradient-to-tr from-purple-700 to-purple-900  text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                    Contratar
                  </button>
                </div>
              </div>
            </div>
            {/*  Price 2 */}
            <div className="relative flex flex-col w-5/6 lg:w-1/3 mx-auto lg:mx-0 rounded-2xl bg-white mt-4 sm:-mt-6 shadow-lg z-10">
              {/* <!-- Tag element --> */}
              <span className="tag-special font-sans font-bold tracking-wide text-3xl top-20 bg-orange-700 before:border-t-[55px]  before:border-l-[0px]  before:border-orange-700 text-white shadow-md shadow-black py-1 pl-1 after:shadow-md ">
                E-Commerce
              </span>
              <div className="flex-1 bg-orange-100 rounded-t-2xl rounded-b-none overflow-hidden shadow p-3">
                <div className="w-full pt-20 pb-2 text-xl text-center  text-gray-600 uppercase font-bold">
                  PREMIUM
                </div>
                <div className="h-1 w-full from-orange-500 to-orange-800 bg-gradient-to-t bg-black my-0 py-0 rounded-t"></div>
                <ul className="w-full text-center text-xs flex flex-col items-center ">
                  <li className="font-bold  border-b py-4 flex items-center gap-2">
                    Todo en el plan básico mas...
                  </li>
                  <li className="border-b py-4 flex items-center gap-2">
                    <BsSpeedometer2 /> Servidor de Alta Velocidad
                  </li>
                  <li className="border-b py-4 flex items-center gap-2">
                    <MdLocalGroceryStore /> Tienda e-commerce*
                  </li>
                  <li className="border-b py-4 flex items-center gap-2">
                    <BsStripe /> Pagos Automatizados
                  </li>
                  <li className="border-b py-4 flex items-center gap-2">
                    <TfiPanel />
                    Panel de Control
                  </li>
                  <li className="border-b py-4 flex items-center gap-2">
                    <FaExpeditedssl /> Seguridad Avanzada
                  </li>
                  <li className="border-b py-4 flex items-center gap-2">
                    <LuDatabaseBackup /> Respaldo semanal
                  </li>
                </ul>
              </div>
              <div className="flex-none mt-auto bg-orange-700 rounded-b-2xl rounded-t-none overflow-hidden shadow p-6">
                <div className="w-full text-white pt-6  maxlg:text-2xl text-4xl font-bold text-center">
                  $2,499.99
                  <span className="text-base">/Men.</span>
                </div>
                <div className="flex items-center justify-center">
                  <button className="mx-auto lg:mx-0  bg-gradient-to-tr from-orange-800 to-orange-950 text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                    Contratar
                  </button>
                </div>
              </div>
            </div>
            {/* Price 3 */}
            <div className="relative flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0  rounded-2xl bg-white mt-4">
              {/* <!-- Tag element --> */}
              <span className="tag-special font-sans font-bold tracking-wide text-xl top-20 bg-sky-700 before:border-t-[45px]  before:border-l-[0px]  before:border-sky-700 text-white shadow-md shadow-black py-1 pl-1 after:shadow-md ">
                PUNTO DE VENTA
              </span>
              <div className="flex-1  bg-teal-100  text-gray-600 rounded-t-2xl rounded-b-none overflow-hidden shadow  p-3">
                <div className="pb-2 pt-20 text-xl font-bold text-center ">
                  PROFESIONAL
                </div>
                <div className="h-1 w-full from-sky-600 to-sky-800 bg-gradient-to-t bg-black my-0 py-0 rounded-t"></div>
                <ul className="w-full flex flex-col items-center text-center text-xs">
                  <li className="font-bold  border-b py-4 flex items-center gap-2">
                    Todo en el plan premium mas...
                  </li>
                  <li className="border-b py-4 flex items-center gap-2">
                    <FaCashRegister />
                    Punto de Venta*
                  </li>
                  <li className="border-b py-4 flex items-center gap-2">
                    <SiAdobeindesign />
                    Diseño Moderno
                  </li>
                  <li className="border-b py-4 flex items-center gap-2">
                    <RiPagesFill />3 Paginas
                  </li>
                </ul>
              </div>
              <div className="flex-none mt-auto bg-sky-700  rounded-b-2xl rounded-t-none overflow-hidden shadow p-6">
                <div className="w-full pt-6  maxlg:text-xl text-3xl text-white font-bold text-center">
                  $4,499.99
                  <span className="text-base">/Men.</span>
                </div>
                <div className="flex items-center justify-center">
                  <button className="mx-auto lg:mx-0  bg-gradient-to-tr from-sky-800 to-sky-900 text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                    Contratar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingTable;
