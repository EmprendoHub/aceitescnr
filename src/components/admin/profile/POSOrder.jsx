"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AuthContext from "@/context/AuthContext";
import FormattedPrice from "@/backend/helpers/FormattedPrice";
import { formatDate, formatTime } from "@/backend/helpers";
import ModalOrderUpdate from "@/components/modals/ModalOrderUpdate";
import { FaComment } from "react-icons/fa6";
import { FaCloudUploadAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const POSOrder = ({ order, deliveryAddress, id, orderPayments, customer }) => {
  const { updateOrder } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [orderStatus, setOrderStatus] = useState("pendiente");
  const [error, setError] = useState("");
  const [currentOrderStatus, setCurrentOrderStatus] = useState(
    order?.orderStatus
  );

  function getQuantities(orderItems) {
    // Use reduce to sum up the 'quantity' fields
    const totalQuantity = orderItems?.reduce(
      (sum, obj) => sum + obj.quantity,
      0
    );
    return totalQuantity;
  }

  function getTotal(orderItems) {
    // Use reduce to sum up the 'total' field
    const totalAmount = orderItems?.reduce(
      (acc, cartItem) => acc + cartItem.quantity * cartItem.price,
      0
    );
    return totalAmount;
  }

  function getPendingTotal(orderItems, orderAmountPaid) {
    // Use reduce to sum up the 'total' field
    const totalAmount = orderItems?.reduce(
      (acc, cartItem) => acc + cartItem.quantity * cartItem.price,
      0
    );
    const pendingAmount = totalAmount - orderAmountPaid;
    return pendingAmount;
  }

  function subtotal() {
    let sub = order?.paymentInfo?.amountPaid - order?.ship_cost;
    return sub;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.set("orderStatus", orderStatus);
      formData.set("_id", id);

      try {
        const res = await updateOrder(formData);

        if (res.ok) {
          const data = await res.json();
          Swal.fire({
            icon: "success",
            iconColor: "#0D121B",
            background: "#fff5fb",
            color: "#0D121B",
            toast: true,
            text: `El pedido se actualizo exitosamente`,
            showConfirmButton: false,
            timer: 2000,
          });
          setCurrentOrderStatus(data.payload.orderStatus);

          return;
        }
      } catch (error) {
        setError("Error actualizando pedido. Por favor Intenta de nuevo.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ModalOrderUpdate
        showModal={showModal}
        setShowModal={setShowModal}
        order={order}
      />
      <div className="relative overflow-x-auto shadow-md maxsm:rounded-lg p-5 maxsm:p-1 ">
        <div className="flex flex-col items-start justify-start gap-x-5 ml-4 ">
          <Link href={`/puntodeventa/cliente/${customer?._id}`}>
            <h2 className="text-3xl font-bold text-slate-700">
              {order?.customerName}{" "}
              <span className="text-sm text-red-800">
                {order?.email === "sucursal@shopout.com"
                  ? "(Sucursal)"
                  : "Cliente"}
              </span>
            </h2>
          </Link>
          <p className="text-gray-600">{order?.email}</p>
          <p className="text-gray-600">{order?.phone}</p>
        </div>
        <div className="flex flex-row maxsm:flex-col items-start justify-start gap-x-5">
          <h2 className="text-3xl mb-8 ml-4 font-bold ">
            Pedido #{order?.orderId}
          </h2>
          {order?.orderStatus === "Apartado" ? (
            <h2
              className={`text-3xl mb-8 ml-4 font-bold uppercase text-amber-700`}
            >
              Apartado
            </h2>
          ) : (
            <h2
              className={`text-3xl mb-8 ml-4 font-bold uppercase ${
                order?.paymentInfo?.status === "paid" ? "text-green-700" : ""
              }`}
            >
              {order?.paymentInfo?.amountPaid >= getTotal(order?.orderItems)
                ? "PAGADO"
                : "PENDIENTE"}
            </h2>
          )}
        </div>
        {order?.branch !== "Sucursal" ? (
          <table className="w-full text-sm text-left flex flex-col maxsm:flex-row">
            <thead className="text-l text-gray-700 uppercase">
              <tr className="flex flex-row maxsm:flex-col">
                <th scope="col" className="w-1/6 px-6 py-2">
                  Domicilio
                </th>
                <th scope="col" className="w-1/6 maxsm:w-full px-6 py-2">
                  Ciudad
                </th>
                <th scope="col" className="w-1/6 maxsm:w-full px-6 py-2">
                  Entidad
                </th>
                <th scope="col" className="w-1/6 maxsm:w-full px-6 py-2">
                  Código Postal
                </th>
                <th scope="col" className="w-1/6 maxsm:w-full px-6 py-2">
                  Tel
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white flex flex-row maxsm:flex-col">
                <td className="w-1/6 maxsm:w-full px-6 py-2">
                  {deliveryAddress?.street}
                </td>
                <td className="w-1/6 maxsm:w-full px-6 py-2">
                  {deliveryAddress?.city}
                </td>
                <td className="w-1/6 maxsm:w-full px-6 py-2">
                  {deliveryAddress?.province}
                </td>
                <td className="w-1/6 maxsm:w-full px-6 py-2">
                  {deliveryAddress?.zip_code}
                </td>
                <td className="w-1/6 maxsm:w-full px-6 py-2">
                  {deliveryAddress?.phone}
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div className="w-full flex maxsm:flex-col gap-3 justify-between">
            <div className="flex items-center gap-1 tracking-wide text-gray-600 pl-4">
              <FaComment size={20} />
              <em className="text-blue-800">{order?.comment}</em>
            </div>
            <div>
              <div
                onClick={() => setShowModal(true)}
                className="bg-black flex gap-1 items-center text-white rounded-sm px-6 py-2 cursor-pointer"
              >
                <FaCloudUploadAlt /> Actualizar
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-5">
        <table className="w-full text-sm text-left">
          <thead className="text-l text-gray-700 uppercase">
            <tr>
              <th scope="col" className="px-2 maxsm:px-0 py-3">
                Nombre
              </th>
              <th scope="col" className="px-2 maxsm:px-0 py-3">
                Img
              </th>
              <th scope="col" className="px-2 maxsm:px-0 py-3">
                Tamaño
              </th>
              <th scope="col" className="px-2 maxsm:px-0 py-3">
                Color
              </th>
              <th scope="col" className="px-2 maxsm:px-0 py-3">
                Cant.
              </th>
              <th scope="col" className="px-2 maxsm:px-0 py-3">
                Precio
              </th>
            </tr>
          </thead>
          <tbody>
            {order?.orderItems?.map((item, index) => (
              <tr className="bg-white" key={index}>
                <td className="px-2 maxsm:px-0 py-2">
                  {item.name.substring(0, 13)}...
                </td>
                <td className="px-2 maxsm:px-0 py-2">
                  <Image
                    alt="producto"
                    src={item.image}
                    width={50}
                    height={50}
                  />
                </td>
                <td className="px-2 maxsm:px-0 py-2">{item.size}</td>
                <td className="px-2 maxsm:px-0 py-2">{item.color}</td>
                <td className="px-2 maxsm:px-0 py-2">{item.quantity}</td>
                <td className="px-2 maxsm:px-0 py-2">
                  <FormattedPrice amount={item.price || 0} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="relative flex flex-row maxmd:flex-col-reverse items-start justify-start overflow-x-auto shadow-md sm:rounded-lg p-5 gap-12">
        <div className="w-1/3 maxmd:w-full">
          <div className=" max-w-screen-xl mx-auto bg-white flex flex-col p-2">
            <h2 className="text-2xl">Totales</h2>
            {order?.orderStatus === "Apartado" ? (
              <ul className="mb-5">
                <li className="flex justify-between gap-x-5 text-gray-600  mb-1">
                  <span>Total de Artículos:</span>
                  <span className="text-green-700">
                    {getQuantities(order?.orderItems)} (Artículos)
                  </span>
                </li>
                <li className="flex justify-between gap-x-5 text-gray-600  mb-1">
                  <span>Sub-Total:</span>
                  <span>
                    <FormattedPrice amount={subtotal() || 0} />
                  </span>
                </li>

                <li className="flex justify-between gap-x-5 text-gray-600  mb-1">
                  <span>Total:</span>
                  <span>
                    <FormattedPrice amount={getTotal(order?.orderItems) || 0} />
                  </span>
                </li>
                <li className="text-xl font-bold border-t flex justify-between gap-x-5  pt-3">
                  <span>Abono:</span>
                  <span>
                    - <FormattedPrice amount={order?.paymentInfo?.amountPaid} />
                  </span>
                </li>

                <li className="text-xl text-amber-700 font-bold border-t flex justify-between gap-x-5  pt-1">
                  <span>Pendiente:</span>
                  <span>
                    <FormattedPrice
                      amount={
                        getPendingTotal(
                          order?.orderItems,
                          order?.paymentInfo?.amountPaid
                        ) || 0
                      }
                    />
                  </span>
                </li>
              </ul>
            ) : (
              <ul className="mb-5">
                <li className="flex justify-between gap-x-5 text-gray-600  mb-1">
                  <span>Sub-Total:</span>
                  <span>
                    <FormattedPrice amount={subtotal() || 0} />
                  </span>
                </li>
                <li className="flex justify-between gap-x-5 text-gray-600  mb-1">
                  <span>Total de Artículos:</span>
                  <span className="text-green-700">
                    {getQuantities(order?.orderItems)} (Artículos)
                  </span>
                </li>
                <li className="flex justify-between gap-x-5 text-gray-600  mb-1">
                  <span>Envió:</span>
                  <span>
                    <FormattedPrice amount={order?.ship_cost || 0} />
                  </span>
                </li>
                <li className="text-3xl font-bold border-t flex justify-between gap-x-5 mt-3 pt-3">
                  <span>Total:</span>
                  <span>
                    <FormattedPrice
                      amount={order?.paymentInfo?.amountPaid || 0}
                    />
                  </span>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full ">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-3 w-full">
            <h2 className="text-2xl">Pagos</h2>
            <table className="w-full text-sm text-left">
              <thead className="text-l text-gray-700 uppercase">
                <tr className="flex flex-row justify-between ">
                  <th scope="col" className="px-2 maxsm:px-0 py-3  w-full">
                    Fecha
                  </th>
                  <th scope="col" className="px-2 maxsm:px-0 py-3  w-full">
                    Método
                  </th>
                  <th scope="col" className="px-2 maxsm:px-0 py-3  w-full">
                    Ref
                  </th>
                  <th scope="col" className="px-2 maxsm:px-0 py-3  w-full">
                    Cant.
                  </th>
                  <th
                    scope="col"
                    className="px-2 maxsm:px-0 py-3 maxsm:hidden w-full"
                  >
                    Nota.
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderPayments?.map((payment) => (
                  <tr
                    className="bg-white flex flex-row justify-between "
                    key={payment?._id}
                  >
                    <td className="px-2 maxsm:px-0 py-2 w-full">
                      {formatDate(payment?.pay_date)}
                      {formatTime(payment?.pay_date)}
                    </td>
                    <td className="px-2 maxsm:px-0 py-2  w-full uppercase text-xs">
                      {payment?.method === "card"
                        ? "tarjeta"
                        : payment?.method === "customer_balance"
                        ? "transferencia"
                        : `${payment?.method}`}
                    </td>
                    <td className="px-2 maxsm:px-0 py-2  w-full uppercase text-xs">
                      {payment?.reference}
                    </td>
                    <td className="px-2 maxsm:px-0 py-2  w-full font-bold">
                      <FormattedPrice amount={payment?.amount || 0} />
                    </td>
                    <td className="px-2 maxsm:px-0 py-2 maxsm:hidden w-full text-xs">
                      {payment?.comment}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr className="border border-gray-300" />
        </div>
      </div>
    </>
  );
};

export default POSOrder;
