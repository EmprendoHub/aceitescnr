"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import AuthContext from "@/context/AuthContext";
import { updateClient } from "@/app/[lang]/_actions";
import {
  cstDateTimeClient,
  isValidEmail,
  isValidPhone,
} from "@/backend/helpers";
import Swal from "sweetalert2";

const UpdateProfileWithFormData = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  // const [avatarPreview, setAvatarPreview] = useState(
  //   '/images/avatar_placeholder.jpg'
  // );
  const [phone, setPhone] = useState("");
  const [updatedAt, setUpdatedAt] = useState(cstDateTimeClient());
  const [validationError, setValidationError] = useState(null);

  const handlePhoneChange = (e) => {
    const inputPhone = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    let formattedPhone = "";

    if (inputPhone.length <= 10) {
      formattedPhone = inputPhone.replace(
        /(\d{3})(\d{0,3})(\d{0,4})/,
        "$1 $2 $3"
      );
    } else {
      // If the phone number exceeds 10 digits, truncate it
      formattedPhone = inputPhone
        .slice(0, 10)
        .replace(/(\d{3})(\d{0,3})(\d{0,4})/, "$1 $2 $3");
    }

    setPhone(formattedPhone);
  };

  useEffect(() => {
    if (user) {
      // const userAvatar = user?.avatar
      //   ? user.avatar.url
      //   : '/images/avatar_placeholder.jpg';
      setName(user?.name);
      setEmail(user?.email);
      setPhone(user?.phone);
      // setAvatarPreview(userAvatar);
    }
  }, [user]);

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (name === "") {
      Swal.fire({
        icon: "warning",
        iconColor: "#0D121B",
        background: "#fff5fb",
        color: "#0D121B",
        toast: true,
        text: `Por favor complete el nombre de usuario para registrarse.`,
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    if (email === "") {
      Swal.fire({
        icon: "warning",
        iconColor: "#0D121B",
        background: "#fff5fb",
        color: "#0D121B",
        toast: true,
        text: `Por favor agregue su correo electrónico para registrarse.`,
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    if (!isValidEmail(email)) {
      Swal.fire({
        icon: "warning",
        iconColor: "#0D121B",
        background: "#fff5fb",
        color: "#0D121B",
        toast: true,
        text: `Utilice un correo electrónico válido.`,
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    if (phone === "") {
      Swal.fire({
        icon: "warning",
        iconColor: "#0D121B",
        background: "#fff5fb",
        color: "#0D121B",
        toast: true,
        text: `Por favor agregar un teléfono válido para continuar. El formato correcto es: 331 235 4455`,
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    if (!isValidPhone(phone)) {
      Swal.fire({
        icon: "warning",
        iconColor: "#0D121B",
        background: "#fff5fb",
        color: "#0D121B",
        toast: true,
        text: `Por favor agregar un teléfono válido para continuar. El formato correcto es: 331 235 4455`,
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    const formData = new FormData();
    formData.set("name", name);
    formData.set("_id", user?._id);
    formData.set("email", email);
    formData.set("phone", phone);
    // formData.set('avatar', avatar);
    formData.set("updatedAt", updatedAt);

    const result = await updateClient(formData);
    if (result?.error) {
      setValidationError(result.error);
      setLoading(null);
    } else {
      setValidationError(null);
      setLoading(null);
      Swal.fire({
        icon: "success",
        iconColor: "#0D121B",
        background: "#fff5fb",
        color: "#0D121B",
        toast: true,
        text: `El perfil se actualizo exitosamente`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  // const onImageChange = (e) => {
  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       setAvatarPreview(reader.result);
  //     }
  //   };
  //   reader.readAsDataURL(e);

  //   setAvatar(e);
  // };

  return (
    <>
      <div className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white max-w-[580px]">
        <form onSubmit={submitHandler}>
          <h2 className="mb-5 text-2xl font-semibold font-raleway">
            Actualizar Perfil
          </h2>

          <div className="mb-4">
            <label className="block mb-1  font-raleway">
              {" "}
              Nombre Completo{" "}
            </label>
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="text"
              placeholder="Ingresa tu nombre"
              required
              name="email"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {validationError?.name && (
              <p className="text-sm text-red-400">
                {validationError.name._errors.join(", ")}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1  font-raleway">
              {" "}
              Correo Electrónico{" "}
            </label>
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="text"
              placeholder="Ingresa tu correo electrónico"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {validationError?.email && (
              <p className="text-sm text-red-400">
                {validationError.email._errors.join(", ")}
              </p>
            )}
          </div>
          <div className="mb-4 md:col-span-1">
            <label className="block mb-1  font-raleway"> Teléfono </label>
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full "
              type="tel"
              placeholder="Ingresa tu teléfono"
              name="phone"
              value={phone}
              onChange={handlePhoneChange}
            />
            {validationError?.phone && (
              <p className="text-sm text-red-400">
                {validationError.phone._errors.join(", ")}
              </p>
            )}
            <p className="text-sm text-slate-500">331 235 4455</p>
          </div>

          {/* <div className="mb-4">
            <label className="block mb-1  font-raleway"> Avatar </label>
            <div className="mb-4 flex flex-col md:flex-row">
              <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer md:w-1/5 lg:w-1/4">
                <Image
                  className="w-14 h-14 rounded-full"
                  src={avatarPreview}
                  width={50}
                  height={50}
                  alt="logo"
                />
              </div>
              <div className="md:w-2/3 lg:w-80">
                <input
                  className="form-control block w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-6"
                  type="file"
                  id="file"
                  onChange={(e) => onImageChange(e.target.files?.[0])}
                />
              </div>
            </div>
          </div> */}

          <button
            type="submit"
            className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            disabled={loading ? true : false}
          >
            {loading ? "Actualizando..." : "Actualizar"}
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProfileWithFormData;
