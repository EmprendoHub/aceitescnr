import OneOrder from "@/components/user/profile/OneOrder";
import React from "react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getOneOrder } from "@/app/[lang]/_actions";

const UserOneOrderPage = async ({ params }) => {
  const session = await getServerSession(options);
  const data = await getOneOrder(params.id);
  const order = JSON.parse(data.order);
  const orderPayments = JSON.parse(data.orderPayments);
  const deliveryAddress = JSON.parse(data.deliveryAddress);
  const customer = JSON.parse(data.customer);
  return (
    <div>
      <OneOrder
        order={order}
        id={params?.id}
        session={session}
        deliveryAddress={deliveryAddress}
        customer={customer}
        orderPayments={orderPayments}
      />
    </div>
  );
};

export default UserOneOrderPage;
