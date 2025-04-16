"use client";
import React from "react";
import Link from "next/link";
import { IoLogoWhatsapp } from "react-icons/io";
import { useSession } from "next-auth/react";
import { FaTelegram } from "react-icons/fa6";

const WhatsAppButton = ({ lang }) => {
  const session = useSession();
  return (
    <>
      {session && session?.user?.role === "manager" ? (
        ""
      ) : lang === "es" ? (
        <Link
          className="fixed bottom-6 z-[20] cursor-pointer left-5 print:hidden"
          href="https://api.whatsapp.com/send?phone=528115914469&text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios."
          target="_blank"
          aria-label="WhatsApp"
        >
          <IoLogoWhatsapp className="text-[2.5rem] hover:scale-110 ease-in-out duration-300 text-emerald-700 dark:text-emerald-700" />
        </Link>
      ) : (
        <Link
          className="fixed bottom-6 z-[20] cursor-pointer left-5 print:hidden"
          href="https://api.whatsapp.com/send?phone=528115914469&text=Hello%2C%20I%20would%20like%20more%20information%20about%20your%20services."
          target="_blank"
          aria-label="WhatsApp"
        >
          <IoLogoWhatsapp className="text-[2.5rem] hover:scale-110 ease-in-out duration-300 text-emerald-700 dark:text-emerald-700" />
        </Link>
        // <Link
        //   className="fixed bottom-6 z-[20] cursor-pointer left-5 print:hidden"
        //   href="https://t.me/emprendomex"
        //   target="_blank"
        //   aria-label="Telegram"
        // >
        //   <FaTelegram className="text-[2.5rem] hover:scale-110 ease-in-out duration-300 text-dark dark:text-emerald-700" />
        // </Link>
      )}
    </>
  );
};

export default WhatsAppButton;
