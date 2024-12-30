"use client";
import { requestContact } from "@/app/[lang]/_actions";
import React, { useState } from "react";
import { FaCircleCheck, FaCircleExclamation } from "react-icons/fa6";
import Swal from "sweetalert2";
import "../../scss/components/_loader.scss";

const HireUsForm = ({ setShowModal, lang }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState({
    en: "Ecommerce With API",
    es: "API Con Comercio Electrónico",
  });
  const [email, setEmail] = useState("");
  const services_list = [
    { en: "Ecommerce With API", es: "API Con Comercio Electrónico" },
    { en: "Ecommerce With POS", es: "API Con Punto de Venta" },
    { en: "Lottery Web App", es: "Web App de Sorteos" },
    { en: "Optimized Ecommerce", es: "Comercio Electrónico Optimizado" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "") {
      Swal.fire({
        icon: "error",
        iconColor: "#0D121B",
        background: "#fff5fb",
        color: "#0D121B",
        toast: true,
        text: `Por favor agrega tu nombre para continuar.`,
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    if (phone === "") {
      Swal.fire({
        icon: "error",
        iconColor: "#0D121B",
        background: "#fff5fb",
        color: "#0D121B",
        toast: true,
        text: `Por favor agregar un teléfono de contacto para continuar.`,
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    if (email === "") {
      Swal.fire({
        icon: "error",
        iconColor: "#0D121B",
        background: "#fff5fb",
        color: "#0D121B",
        toast: true,
        text: `Por favor agregar un email de contacto para continuar.`,
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.set("name", name);
      formData.set("phone", phone);
      formData.set("email", email);
      formData.set("service", service);
      formData.set("lang", lang);
      formData.set("honeypot", honeypot);

      try {
        const res = await requestContact(formData);
        Swal.fire({
          icon: "error",
          iconColor: "#0D121B",
          background: "#fff5fb",
          color: "#0D121B",
          toast: true,
          text: `El Mensaje se envió correctamente.`,
          showConfirmButton: false,
          timer: 2000,
        });
        setShowModal(false);
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          iconColor: "#0D121B",
          background: "#fff5fb",
          color: "#0D121B",
          toast: true,
          text: `Error enviando el formulario. Por favor Intenta de nuevo.`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <div className="w-1/3 maxmd:w-5/6 bg-gray-200 dark:bg-dark pl-4 rounded-md ">
        <section className="relative p-4 w-full">
          <FaCircleExclamation
            onClick={() => setShowModal(false)}
            className="absolute top-3 right-3 text-center text-white bg-red-800 border border-transparent  hover:bg-red-900 w-5 h-5 rounded-full flex flex-row items-center justify-center  cursor-pointer"
          />
          <h1 className="text-3xl maxmd:text-2xl text-center font-semibold mb-8 font-primary">
            Contrata nuestros servicios
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start gap-3 justify-start w-full "
          >
            <div className="flex-col flex justify-start px-2 gap-y-3 w-full">
              <div className="gap-y-5 flex-col flex w-full">
                <div className="mb-2">
                  <input
                    type="text"
                    className="appearance-none border bg-gray-100 bg-opacity-20 rounded-md py-2 px-3 border-gray-300 focus:outline-none focus:border-gray-400 w-full"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                  />
                </div>
              </div>
              <div className="gap-y-5 flex-col flex w-full">
                <div className="mb-2">
                  <input
                    type="text"
                    className="appearance-none border bg-gray-100 bg-opacity-20 rounded-md py-2 px-3 border-gray-300 focus:outline-none focus:border-gray-400 w-full"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                  />
                </div>
              </div>
              <div className="gap-y-5 flex-col flex w-full">
                <div className="mb-2">
                  <input
                    type="text"
                    className="appearance-none border bg-gray-100 bg-opacity-20 rounded-md py-2 px-3 border-gray-300 focus:outline-none focus:border-gray-400 w-full"
                    placeholder="Teléfono"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    name="phone"
                  />
                </div>
                <input
                  hidden
                  className="text-center py-2"
                  type="text"
                  placeholder="Honeypot"
                  onChange={(e) => setHoneypot(e.target.value)}
                />
                <div className="mb-2">
                  <select
                    className="block appearance-none border border-gray-400 bg-gray-100 bg-opacity-20 rounded-md py-2 px-3 focus:outline-none focus:border-gray-400 w-full"
                    name="service"
                    value={service[`${lang}`]}
                    htmlFor="service"
                    onChange={(e) => setService(e.target.value)}
                  >
                    {services_list.map((service, index) => (
                      <option
                        className="dark:bg-dark"
                        key={service[`${lang}`] + index}
                        value={service[`${lang}`]}
                      >
                        {service[`${lang}`]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between w-full gap-2">
              {!isLoading ? (
                <button
                  type="submit"
                  className="my-2 px-4 py-2 text-center text-white bg-main-gradient border border-transparent rounded-md hover:bg-emerald-900 w-full flex flex-row items-center justify-center gap-1"
                >
                  <FaCircleCheck className="text-xl" /> Enviar
                </button>
              ) : (
                <span class="loader w-full justify-self-center"></span>
              )}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default HireUsForm;
