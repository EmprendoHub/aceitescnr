"use client";
import React, { useContext, useState } from "react";
import AuthContext from "@/context/AuthContext";
import { updateClientPassword } from "@/app/[lang]/_actions";
import { cstDateTimeClient } from "@/backend/helpers";
import Swal from "sweetalert2";

const UpdatePassword = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updatedAt, setUpdatedAt] = useState(cstDateTimeClient());
  const [validationError, setValidationError] = useState(null);

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (currentPassword === "") {
      Swal.fire({
        icon: "warning",
        iconColor: "#0D121B",
        background: "#fff5fb",
        color: "#0D121B",
        toast: true,
        text: `Por favor tu contraseña actual.`,
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    if (newPassword === "") {
      Swal.fire({
        icon: "warning",
        iconColor: "#0D121B",
        background: "#fff5fb",
        color: "#0D121B",
        toast: true,
        text: `Por favor una contraseña nueva.`,
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    const formData = new FormData();
    formData.set("_id", user?._id);
    formData.set("newPassword", newPassword);
    formData.set("currentPassword", currentPassword);
    formData.set("updatedAt", updatedAt);

    const result = await updateClientPassword(formData);
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
        text: `La contraseña se actualizo exitosamente`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <>
      <div className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white max-w-[580px]">
        <form onSubmit={submitHandler}>
          <h2 className="mb-5 text-2xl font-semibold font-raleway">
            Actualizar contraseña
          </h2>

          <div className="mb-4">
            <label className="block mb-1  font-raleway">
              Contraseña Actual
            </label>
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="password"
              placeholder="Ingresa tu contraseña"
              required
              name="currentPass"
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            {validationError?.currentPassword && (
              <p className="text-sm text-red-400">
                {validationError.currentPassword._errors.join(", ")}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1  font-raleway">Nueva contraseña</label>
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="password"
              placeholder="Ingresa tu nueva contraseña"
              minLength={8}
              required
              name="newPass"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {validationError?.newPassword && (
              <p className="text-sm text-red-400">
                {validationError.newPassword._errors.join(", ")}
              </p>
            )}
          </div>

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

export default UpdatePassword;
