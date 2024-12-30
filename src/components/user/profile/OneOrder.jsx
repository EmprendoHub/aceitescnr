"use client";
import Image from "next/image";
import FormattedPrice from "@/backend/helpers/FormattedPrice";
import {
  formatSpanishDate,
  getOrderItemsQuantities,
  getTotalFromItems,
} from "@/backend/helpers";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";

const OneOrder = ({ order, session, deliveryAddress, orderPayments }) => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE__KEY);
  const { affiliateInfo } = useSelector((state) => state.compras);

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const stringSession = JSON.stringify(session);
    const response = await fetch(`/api/layaway`, {
      method: "POST",
      headers: {
        Session: stringSession,
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        order: order,
        items: order?.orderItems,
        email: session?.user?.email,
        user: session?.user,
        shipping: order?.deliveryAddress,
        affiliateInfo: affiliateInfo,
      }),
    });

    try {
      const data = await response.json();
      stripe?.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.log(error);
    }
  };

  function checkIfPaid(orderItems, orderAmountPaid) {
    // Use reduce to sum up the 'total' field
    const totalAmount = orderItems?.reduce(
      (acc, cartItem) => acc + cartItem.quantity * cartItem.price,
      0
    );

    if (Number(orderAmountPaid) >= Number(totalAmount)) {
      return "pagado";
    } else return "pendiente de pago";
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
    let sub = getTotalFromItems(order?.orderItems);
    return sub;
  }
  return (
    <div className="p-3 bg-slate-300">
      <div className=" shadow-lg bg-white rounded-md">
        <div className="relative overflow-x-auto py-5 maxmd:pl-0">
          <div className="flex flex-row maxsm:flex-col items-start justify-start gap-x-5">
            <h2 className="text-3xl ml-4 font-bold ">
              Pedido #{order?.orderId}
            </h2>
            <h2
              className={`text-3xl ml-4 font-bold uppercase ${
                order && order?.orderStatus === "Apartado"
                  ? "text-amber-700"
                  : order.orderStatus === "En Camino"
                  ? "text-blue-700"
                  : order.orderStatus === "Entregado"
                  ? "text-green-700"
                  : "text-slate-600"
              }`}
            >
              {order?.orderStatus}
            </h2>
          </div>

          <div className="w-3/4 maxmd:w-full text-sm text-left">
            <div className="border-b border-gray-400 flex maxmd:flex-col items-start justify-start">
              <div className=" pb-2  w-full">
                <h3
                  scope="col"
                  className="text-l text-gray-700 uppercase pl-6 pt-3 w-full"
                >
                  Entregar a:
                </h3>
                <p className="pl-6 ">
                  {deliveryAddress?.street}, {deliveryAddress?.city}
                </p>
                <p className="pl-6 ">
                  {deliveryAddress?.province}, {deliveryAddress?.zip_code}
                </p>
                <p className="pl-6 ">{deliveryAddress?.country}</p>
              </div>
              <div className="pb-2 pl-6 w-full">
                <h3
                  scope="col"
                  className=" pt-3 text-l text-gray-700 uppercase w-full"
                >
                  Contacto:
                </h3>
                <div>{session?.user?.name}</div>
                <div>{deliveryAddress?.phone}</div>
                <div>{session?.user?.email}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative overflow-x-auto p-5">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase">
              <tr>
                <th scope="col" className="px-1 py-3">
                  Cant.
                </th>
                <th scope="col" className="px-1 py-3">
                  Prod.
                </th>
                <th scope="col" className="px-1 py-3">
                  Clr.
                </th>
                <th scope="col" className="px-1 py-3 ">
                  Med.
                </th>
                <th scope="col" className="px-1 py-3">
                  $
                </th>
                <th scope="col" className="px-1 py-3  maxsm:hidden">
                  Img
                </th>
              </tr>
            </thead>
            <tbody>
              {order?.orderItems?.map((item, index) => (
                <tr className=" border-b border-gray-300 text-xs" key={index}>
                  <td className="px-1 py-2">{item.quantity}</td>
                  <td className="px-1 py-2">{item.name.substring(0, 10)}...</td>
                  <td className="px-1 py-2">{item.color}</td>
                  <td className="px-1 py-2">{item.size}</td>
                  <td className="px-1 py-2">
                    <FormattedPrice amount={item?.price || 0} />
                  </td>
                  <td className="px-1 py-2 maxsm:hidden">
                    <Image
                      alt="producto"
                      src={item.image}
                      width={50}
                      height={50}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {order?.orderStatus === "Apartado" ? (
          <div className="relative flex fle-row maxmd:flex-col overflow-x-auto p-5">
            <div className="w-1/3 maxmd:w-full">
              <div className=" max-w-screen-xl mx-auto  border-b border-gray-300 flex flex-col p-2">
                <h2 className="text-2xl">Totales</h2>
                <ul className="mb-5 text-sm">
                  <li className="flex justify-between gap-x-5 text-gray-600  mb-1">
                    <span>Artículos:</span>
                    <span className="text-green-700">
                      {getOrderItemsQuantities(order?.orderItems)} (Artículos)
                    </span>
                  </li>
                  <li className="flex justify-between gap-x-5 text-gray-600  mb-1">
                    <span>Sub-Total:</span>
                    <FormattedPrice amount={subtotal() || 0} />
                  </li>
                  <li className="flex justify-between gap-x-5 text-gray-600  mb-1">
                    <span>Total:</span>
                    <FormattedPrice
                      amount={getTotalFromItems(order?.orderItems) || 0}
                    />
                  </li>
                  <li className="text-xl font-bold border-t flex justify-between gap-x-5  pt-3">
                    <span>Abono:</span>
                    -<FormattedPrice amount={order?.paymentInfo?.amountPaid} />
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
              </div>
            </div>
            <div className="w-2/3 maxmd:w-full flex flex-col justify-center items-center">
              <h3
                className={`text-4xl font-raleway font-bold uppercase  ${
                  checkIfPaid(
                    order?.orderItems,
                    order?.paymentInfo?.amountPaid
                  ) === "pagado"
                    ? "text-green-700"
                    : "text-amber-700"
                } `}
              >
                {checkIfPaid(order?.orderItems, order?.paymentInfo?.amountPaid)}
              </h3>

              <button
                onClick={() => handleCheckout()}
                className="bg-black w-1/2 text-slate-100 mt-4 py-3 px-6 hover:bg-slate-200 hover:text-black duration-300 ease-in-out cursor-pointer"
              >
                Pagar Total{" "}
              </button>
              <p className="pt-5">
                Si realizaste un pago por Oxxo o Transferencia Bancaria
              </p>
              <p>
                Permite hasta 24 horas después de tu pago para que se refleje en
                tu cuenta.
              </p>
            </div>
          </div>
        ) : (
          <div className="relative flex fle-row maxmd:flex-col overflow-x-auto p-5">
            <div className="w-1/3 maxmd:w-full">
              <div className="container max-w-screen-xl mx-auto border-b border-gray-300 flex flex-col  p-2">
                <ul className="mb-5 text-sm">
                  <li className="flex justify-between gap-x-5 text-gray-600  mb-1">
                    <span>Sub-Total:</span>
                    <FormattedPrice amount={subtotal() || 0} />
                  </li>
                  <li className="flex justify-between gap-x-5 text-gray-600  mb-1">
                    <span>Artículos:</span>
                    <span className="text-green-700">
                      {getOrderItemsQuantities(order?.orderItems)} (Artículos)
                    </span>
                  </li>
                  <li className="flex justify-between gap-x-5 text-gray-600  mb-1">
                    <span>Envió:</span>
                    <FormattedPrice amount={order?.ship_cost || 0} />
                  </li>
                  <li className="flex justify-between gap-x-5 text-gray-600  mb-1">
                    <span>Total:</span>
                    <FormattedPrice
                      amount={getTotalFromItems(order?.orderItems) || 0}
                    />
                  </li>
                  <li className="text-xl font-bold text-green-700 border-t flex justify-between gap-x-5  pt-3">
                    <span>Pagado:</span>
                    <FormattedPrice
                      amount={order?.paymentInfo?.amountPaid || 0}
                    />
                  </li>
                </ul>
              </div>
            </div>
            <div className="absolute right-0 top-5 w-2/3 maxmd:w-full flex justify-center items-center">
              <h3
                className={`text-2xl font-raleway uppercase ${
                  checkIfPaid(
                    order?.orderItems,
                    order?.paymentInfo?.amountPaid
                  ) === "pagado"
                    ? "text-green-700"
                    : "text-amber-700"
                } `}
              >
                {checkIfPaid(order?.orderItems, order?.paymentInfo?.amountPaid)}
              </h3>
            </div>
            {/* Payment History */}
            <div className="flex flex-col w-full ">
              <div className="relative overflow-x-auto p-3 w-full">
                <h2 className="text-sm tracking-wider">Historial de pagos</h2>
                <table className="w-full text-sm text-left">
                  <thead className="text-l text-gray-700 uppercase">
                    <tr className="flex flex-row justify-between text-xs">
                      <th scope="col" className="px-2 maxsm:px-0 py-3  w-full">
                        Fecha
                      </th>
                      <th
                        scope="col"
                        className="px-2 maxsm:px-0 py-3 maxsm:hidden  w-full"
                      >
                        Mtd.
                      </th>
                      <th scope="col" className="px-2 maxsm:px-0 py-3  w-full">
                        Ref.
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
                        className=" border-b border-gray-300 bg-opacity-30 flex flex-row justify-between text-xs"
                        key={payment?._id}
                      >
                        <td className="px-2 maxsm:px-0 py-2 w-full">
                          {formatSpanishDate(payment?.pay_date)}
                        </td>
                        <td className="px-2 maxsm:px-0 py-2  w-full uppercase text-xs maxsm:hidden">
                          {payment?.method === "card"
                            ? "tarjeta"
                            : payment?.method === "customer_balance"
                            ? "Banco"
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
            </div>
            <hr className="border border-gray-300" />
          </div>
        )}
      </div>
    </div>
  );
};

export default OneOrder;
