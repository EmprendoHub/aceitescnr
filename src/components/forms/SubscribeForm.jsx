"use client";
import React from "react";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { isValidEmail } from "@/backend/helpers";
import Swal from "sweetalert2";
import { FaLongArrowAltRight } from "react-icons/fa";
import "./formscss.scss";

const SubscribeForm = ({ cookie, homeDic }) => {
  const [notification, setNotification] = useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [email, setEmail] = useState("");
  const [activeButton, setActiveButton] = useState(false);
  const [formStatus, setFormStatus] = useState(false);

  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "") {
      Swal.fire({
        icon: "error",
        title: "Por favor agregue su correo para enviar el mensaje.",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    if (!isValidEmail(email)) {
      Swal.fire({
        icon: "error",
        title: "Utilice un correo electrónico válido.",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    if (!executeRecaptcha) {
      console.log("Execute recaptcha not available yet");
      setNotification(
        "Execute recaptcha not available yet likely meaning key not recaptcha key not set"
      );
      return;
    }
    setActiveButton(true);

    executeRecaptcha("enquiryFormSubmit").then(async (gReCaptchaToken) => {
      try {
        const res = await fetch(`/api/subscribe`, {
          headers: {
            "Content-Type": "application/json",
            Cookie: cookie,
          },
          method: "POST",
          body: JSON.stringify({
            email,
            recaptcha: gReCaptchaToken,
            honeypot,
          }),
        });

        if (res?.data?.success === true) {
          setNotification(`Success with score: ${res?.data?.score}`);
        } else {
          setNotification(`Failure with score: ${res?.data?.score}`);
        }

        if (res.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Este correo electrónico ya suscrito.",
            showConfirmButton: false,
            timer: 2000,
          });
          setActiveButton(false);

          setError("Este correo electrónico ya suscrito.");
        }
        if (res.ok) {
          Swal.fire({
            icon: "success",
            title: "Su mensaje se envió exitosamente",
            showConfirmButton: false,
            timer: 2000,
          });
          setFormStatus(true);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <div className="relative bg-main-gradient flex flex-col p-20 maxmd:p-10 maxsm:p-5 mx-auto w-full ">
      <div className="w-full text-center">
        <p className="font-bold text-2xl font-primary mb-1">
          {homeDic.contactCta.title}
        </p>
        <p className="text-xs mb-3 font-secondary">
          {homeDic.contactCta.subtitle}
        </p>
      </div>
      {!formStatus ? (
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center w-full gap-y-4"
        >
          <div className="flex h-5 w-12" />
          <input
            type="email"
            placeholder={homeDic.contactCta.placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 w-full italic text-sm border-black border-b font-playfair-display appearance-none bg-white bg-opacity-0 outline-none"
          />

          <input
            hidden
            type="text"
            placeholder="Honeypot"
            onChange={(e) => setHoneypot(e.target.value)}
          />

          <button
            aria-label="submit"
            className="w-1/6"
            type="submit"
            disabled={activeButton}
          >
            <svg id="right" className="flex h-5 w-12">
              <path
                d="M0.5 9.35772H20.9956L14.2001 2.29941L16.4134 0L27 11L16.4134 22L14.2001 19.7006L20.9956 12.6423H0.5V9.35772Z"
                fill="#000"
              ></path>
            </svg>
          </button>
        </form>
      ) : (
        <div className="text-primary text-xs">
          {homeDic.contactCta.messageSent}
        </div>
      )}
    </div>
  );
};

export default SubscribeForm;
