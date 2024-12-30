"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { IoLogoGoogle } from "react-icons/io";
import { useSelector } from "react-redux";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const LoginComponent = ({ cookie, lang }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { loginAttempts } = useSelector((state) => state?.compras);
  const session = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callback = searchParams.get("callbackUrl");
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (session?.status === "authenticated") {
      if (callback) {
        router.replace(callback);
      } else {
        router.replace(`/${lang}`);
      }
    }
  }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === "" || email === "") {
      setError("Fill all fields!");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not available yet");
      setNotification(
        "Execute recaptcha not available yet likely meaning key not recaptcha key not set"
      );
      return;
    }
    executeRecaptcha("enquiryFormSubmit").then(async (gReCaptchaToken) => {
      try {
        const res = await signIn("credentials", {
          email,
          password,
          recaptcha: gReCaptchaToken,
          honeypot,
          cookie,
        });

        if (res?.data?.success === true) {
          setNotification(`Success with score: ${res?.data?.score}`);
        } else {
          setNotification(`Failure with score: ${res?.data?.score}`);
        }

        if (res.status === 400) {
          setError("This email is already in use");
        }
        if (res.ok) {
          setTimeout(() => {
            router.push(`/${lang}/tienda`);
          }, 200);
          return;
        }
      } catch (error) {
        setError("Error occured while loggin");
        console.log(error);
      }
    });
  };

  return (
    <main className="flex  min-h-screen maxsm:min-h-[70vh] flex-col items-center justify-center ">
      {loginAttempts > 30 ? (
        <div>Excediste el limite de inicios de session</div>
      ) : (
        <div className="w-fit dark:bg-gray-200 bg-dark  p-20 maxsm:p-8 shadow-xl text-center  mx-auto flex flex-col items-center justify-center">
          <h2 className="flex justify-center py-5 text-white dark:text-black">
            Iniciar Session
          </h2>

          <button
            className="w-full hover:text-darkblack hover:bg-slate-300 hover:text-black duration-500 ease-in-out text-white bg-black mb-4 flex flex-row gap-4 items-center py-4 justify-center"
            onClick={() => {
              signIn("google");
            }}
          >
            <IoLogoGoogle />
            Iniciar con Google
          </button>
          <div className="text-center text-white dark:text-black my-4 ">
            - O -
          </div>
          <form
            className="flex flex-col justify-center items-center text-center gap-y-4"
            onSubmit={handleSubmit}
          >
            <input
              className="text-center py-2"
              type="email"
              placeholder="Correo Electrónico..."
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              hidden
              className="text-center py-2"
              type="text"
              placeholder="Honeypot"
              onChange={(e) => setHoneypot(e.target.value)}
            />
            <input
              className="text-center py-2"
              type="password"
              placeholder="contraseña..."
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-black text-white w-[150px] p-2 rounded-sm mt-5">
              Iniciar
            </button>
          </form>
          <Link
            className="text-xs text-center mt-3 text-white dark:text-black"
            href={`${lang}/registro`}
          >
            ¿Aun no tienes cuenta? <br /> Registrar aquí.
          </Link>
        </div>
      )}
    </main>
  );
};

export default LoginComponent;
