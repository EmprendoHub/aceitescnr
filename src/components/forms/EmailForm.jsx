"use client";
import React from "react";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { isValidEmail, isValidPhone } from "@/backend/helpers";

const EmailForm = ({ cookie, contactDic }) => {
  const [notification, setNotification] = useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [activeButton, setActiveButton] = useState(false);
  const [formStatus, setFormStatus] = useState(false);

  const [honeypot, setHoneypot] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === "") {
      setError("Por favor complete para enviar el mensaje.");
      return;
    }

    if (email === "") {
      setError("Por favor agregue su correo para enviar el mensaje.");
      return;
    }

    if (message === "") {
      setError("Por favor agregue su mensaje para continuar.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Utilice un correo electrónico válido.");
      return;
    }

    if (!isValidPhone(phone)) {
      setError("Utilice un teléfono válido.");
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
        const res = await fetch(`/api/email`, {
          headers: {
            "Content-Type": "application/json",
            Cookie: cookie,
          },
          method: "POST",
          body: JSON.stringify({
            name,
            phone,
            email,
            message,
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
          setError("Este correo electrónico y/o el teléfono ya esta en uso");
          setActiveButton(false);

          setError("Este correo electrónico y/o el teléfono ya esta en uso");
        }
        if (res.ok) {
          // toast.success("Su mensaje se envió exitosamente");
          setFormStatus(true);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handlePhoneChange = (e) => {
    const inputPhone = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    let formattedPhone = "";

    if (inputPhone.length <= 10) {
      formattedPhone = inputPhone.replace(
        /(\d{3})(\d{0,3})(\d{0,4})/,
        "$1$2$3"
      );
    } else {
      // If the phone number exceeds 10 digits, truncate it
      formattedPhone = inputPhone
        .slice(0, 10)
        .replace(/(\d{3})(\d{0,3})(\d{0,4})/, "$1 $2 $3");
    }

    setPhone(formattedPhone);
  };

  return (
    <div className="relative flex fle-col m-auto w-full rounded-xl z-10">
      {!formStatus ? (
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-y-4">
          <input
            type="text"
            placeholder={contactDic.contactForm.placeName}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border-black border-b font-playfair-display bg-white bg-opacity-0"
          />
          <input
            type="email"
            placeholder={contactDic.contactForm.placeEmail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border-black border-b font-playfair-display appearance-none bg-white bg-opacity-0 "
          />
          <input
            className="p-2 border-black border-b font-playfair-display appearance-none bg-white bg-opacity-0 "
            type="text"
            placeholder={contactDic.contactForm.placePhone}
            value={phone}
            onChange={handlePhoneChange}
          />
          <input
            hidden
            type="text"
            placeholder="Honeypot"
            onChange={(e) => setHoneypot(e.target.value)}
          />
          <textarea
            cols="30"
            rows="5"
            placeholder={contactDic.contactForm.placeNote}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="p-2 border-black border-b font-playfair-display bg-white bg-opacity-0"
          ></textarea>
          <button
            type="submit"
            className="mt-5 bg-primary dark:bg-dark"
            disabled={activeButton}
          >
            <p className=" bg-fourth  text-white py-3">
              {contactDic.contactForm.btnText}
            </p>
          </button>
        </form>
      ) : (
        <div className="text-green-700">{contactDic.contactForm.success}</div>
      )}
    </div>
  );
};

export default EmailForm;
