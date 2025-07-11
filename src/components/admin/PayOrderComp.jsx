"use client";
import React, { useState } from "react";
import { FaCircleCheck, FaCircleExclamation } from "react-icons/fa6";
import { updateOneOrder } from "@/app/[lang]/_actions";
import Swal from "sweetalert2";

const PayOrderComp = ({ setShowModal, orderId, isPaid }) => {
  const [transactionNo, setTransactionNo] = useState("EFECTIVO");
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Number(amount) <= 0) {
      Swal.fire({
        icon: "error",
        iconColor: "#0D121B",
        background: "#fff5fb",
        color: "#0D121B",
        toast: true,
        text: `Por favor agrega la cantidad del pedido para continuar.`,
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    if (transactionNo === "") {
      Swal.fire({
        icon: "error",
        iconColor: "#0D121B",
        background: "#fff5fb",
        color: "#0D121B",
        toast: true,
        text: `Por favor agregar una referencia de pago para continuar.`,
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.set("transactionNo", transactionNo);
      formData.set("paidOn", new Date());
      formData.set("amount", amount);
      formData.set("note", note);
      formData.set("orderId", orderId);
      try {
        const res = await updateOneOrder(formData);
        setShowModal(false);
      } catch (error) {
        Swal.fire({
          icon: "error",
          iconColor: "#0D121B",
          background: "#fff5fb",
          color: "#0D121B",
          toast: true,
          text: `Error actualizando el pedido. Por favor Intenta de nuevo.`,
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
      <div className="w-1/2 maxmd:w-5/6 bg-white pl-4">
        <section className=" p-6 w-full">
          <h1 className="text-xl maxmd:text-5xl font-semibold text-black mb-8 font-primary">
            Recibir Pago
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start gap-5 justify-start w-full "
          >
            <div className="flex-col flex justify-start px-2 gap-y-5 w-full">
              <div className="gap-y-5 flex-col flex px-2 w-full">
                <div className="mb-4">
                  <label className="block mb-1"> Numero de Transacción </label>
                  <input
                    type="text"
                    className="appearance-none border bg-gray-100 rounded-md py-2 px-3 border-gray-300 focus:outline-none focus:border-gray-400 w-full"
                    placeholder="No de Transacción"
                    onChange={(e) => setTransactionNo(e.target.value)}
                    name="transactionNo"
                  />
                </div>
              </div>
              <div className="gap-y-5 flex-col flex px-2 w-full">
                <div className="mb-4">
                  <label className="block mb-1"> Cantidad </label>
                  <input
                    type="text"
                    className="appearance-none border bg-gray-100 rounded-md py-2 px-3 border-gray-300 focus:outline-none focus:border-gray-400 w-full"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    name="amount"
                  />
                </div>
              </div>
              <div className="gap-y-5 flex-col flex px-2 w-full">
                <div className="mb-4">
                  <label className="block mb-1"> Nota </label>
                  <input
                    type="text"
                    className="appearance-none border bg-gray-100 rounded-md py-2 px-3 border-gray-300 focus:outline-none focus:border-gray-400 w-full"
                    placeholder="Nota"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    name="note"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div
                onClick={() => setShowModal(false)}
                className="my-2 px-4 py-2 text-center text-white bg-red-700 border border-transparent rounded-md hover:bg-red-800 w-full flex flex-row items-center justify-center gap-1 cursor-pointer"
              >
                <FaCircleExclamation className="text-xl" />
                Cancelar
              </div>
              <button
                type="submit"
                className="my-2 px-4 py-2 text-center text-white bg-emerald-700 border border-transparent rounded-md hover:bg-emerald-900 w-full flex flex-row items-center justify-center gap-1"
              >
                <FaCircleCheck className="text-xl" /> Aceptar
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default PayOrderComp;
