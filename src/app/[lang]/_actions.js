"use server";
import Address from "@/backend/models/Address";
import dbConnect from "@/lib/db";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import {
  AddressEntrySchema,
  ClientPasswordUpdateSchema,
  ClientUpdateSchema,
  PageEntrySchema,
  PageUpdateSchema,
  PostEntrySchema,
  PostUpdateSchema,
  ProductEntrySchema,
  VariationProductEntrySchema,
  VariationUpdateProductEntrySchema,
  VerifyEmailSchema,
} from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import Post from "@/backend/models/Post";
import Product from "@/backend/models/Product";
import User from "@/backend/models/User";
import Affiliate from "@/backend/models/Affiliate";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import axios from "axios";
import { cstDateTime, getTotalFromItems } from "@/backend/helpers";
import Order from "@/backend/models/Order";
import APIPostsFilters from "@/lib/APIPostsFilters";
import APIFilters from "@/lib/APIFilters";
import APIOrderFilters from "@/lib/APIOrderFilters";
import APIClientFilters from "@/lib/APIClientFilters";
import APIAffiliateFilters from "@/lib/APIAffiliateFilters";
import Page from "@/backend/models/Page";
import Payment from "@/backend/models/Payment";
import Customer from "@/backend/models/Customer";
import Author from "@/backend/models/Author";
import Analytic from "@/backend/models/Analytic";
import Visitor from "@/backend/models/Visitor";
import Onboarding from "@/backend/models/Onboarding";
import OpenAI from "openai";
import fs from "fs";
import path, { join } from "path";
import mainLogo from "../../../public/logos/CNR_LOGO_true.png";
import { writeFile } from "fs/promises";
import { mc } from "@/lib/minio";
import Category from "@/backend/models/Category";

function generateUrlSafeTitle(title) {
  // Convert the title to lowercase and replace spaces with dashes
  let urlSafeTitle = title.toLowerCase().replace(/\s+/g, "-");

  // Remove special characters and non-alphanumeric characters
  urlSafeTitle = urlSafeTitle.replace(/[^\w-]+/g, "");

  return urlSafeTitle;
}
// Function to get the document count for all from the previous month
const getDocumentCountPreviousMonth = async (model) => {
  const now = new Date();
  const firstDayOfPreviousMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1
  );
  const lastDayOfPreviousMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  try {
    const documentCount = await model.countDocuments(
      {
        createdAt: {
          $gte: firstDayOfPreviousMonth,
          $lte: lastDayOfPreviousMonth,
        },
      },
      {
        published: { $ne: "false" },
      }
    );

    return documentCount;
  } catch (error) {
    console.error("Error counting documents from the previous month:", error);
    throw error;
  }
};

async function getQuantities(orderItems) {
  // Use reduce to sum up the 'quantity' fields
  const totalQuantity = orderItems?.reduce((sum, obj) => sum + obj.quantity, 0);
  return totalQuantity;
}

const formatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});

async function getTotal(orderItems) {
  // Use reduce to sum up the 'total' field
  let totalAmount = orderItems?.reduce(
    (acc, cartItem) => acc + cartItem.quantity * cartItem.price,
    0
  );
  totalAmount = formatter.format(totalAmount);
  return totalAmount;
}

async function getPendingTotal(orderItems, orderAmountPaid) {
  // Use reduce to sum up the 'total' field
  const totalAmount = orderItems?.reduce(
    (acc, cartItem) => acc + cartItem.quantity * cartItem.price,
    0
  );
  let pendingAmount = totalAmount - orderAmountPaid;
  pendingAmount = formatter.format(pendingAmount);
  return pendingAmount;
}

async function subtotal(order) {
  let sub = order?.paymentInfo?.amountPaid - order?.ship_cost;
  sub = formatter.format(sub);
  return sub;
}

export async function payPOSDrawer(data) {
  try {
    let {
      items,
      transactionNo,
      payType,
      amountReceived,
      note,
      email,
      phone,
      name,
    } = Object.fromEntries(data);

    await dbConnect();
    let customer;
    let customerEmail;
    let customerPhone;
    let customerName;

    if (email.length > 3) {
      console.log("if  email", email);
      customerEmail = email;
    } else {
      if (phone.length > 3 || name.length > 3) {
        console.log("if phone or name", phone, name);
        customerEmail =
          phone + name.replace(/\s/g, "").substring(0, 8) + "@noemail.com";
      } else {
        console.log("if sucursal");
        customerEmail = "sucursal@shopout.com";
      }
    }

    if (name.length > 3) {
      customerName = name;
    } else {
      customerName = "SUCURSAL";
    }

    const query = { $or: [{ email: customerEmail }] };
    if (phone.length > 3) {
      customerPhone = phone;
      query.$or.push({ phone: phone });
    } else {
      customerPhone = "";
    }

    const customerExists = await Customer.findOne(query);

    if (!customerExists) {
      // Generate a random 64-byte token
      const newCustomer = new Customer({
        name: customerName,
        phone: customerPhone,
        email: customerEmail,
      });
      await newCustomer.save();
      customer = newCustomer;
    } else {
      customer = customerExists;
    }
    items = JSON.parse(items);
    const branchInfo = "Sucursal";
    const ship_cost = 0;
    const date = cstDateTime();

    let paymentInfo;
    let layAwayIntent;
    let currentOrderStatus;
    let payMethod;
    let payIntent;

    if (payType === "layaway") {
      payIntent = "partial";
    } else {
      payIntent = "paid";
    }

    if (transactionNo === "EFECTIVO") {
      payMethod = "EFECTIVO";
    } else if (!isNaN(transactionNo)) {
      payMethod = "TERMINAL";
    }
    if (payType === "layaway") {
      paymentInfo = {
        id: "partial",
        status: "unpaid",
        amountPaid: amountReceived,
        taxPaid: 0,
        paymentIntent: "partial",
      };
      currentOrderStatus = "Apartado";
      layAwayIntent = true;
    } else {
      paymentInfo = {
        id: "paid",
        status: "paid",
        amountPaid: amountReceived,
        taxPaid: 0,
        paymentIntent: "paid",
      };
      currentOrderStatus = "Pagado";
      layAwayIntent = false;
    }

    const cartItems = [];
    await Promise.all(
      items?.map(async (item) => {
        const variationId = item._id.toString();
        const product = await Product.findOne({
          "variations._id": variationId,
        });

        const variation = product.variations.find((variation) =>
          variation._id.equals(variationId)
        );
        // Check if there is enough stock
        if (variation.stock < item.quantity) {
          console.log("Este producto no cuenta con existencias");
          return {
            error: {
              title: { _errors: ["Este producto no cuenta con existencias"] },
            },
          };
        } else {
          variation.stock -= 1;
          product.stock -= 1;
          cartItems.push({
            product: product._id,
            variation: variationId,
            name: item.title,
            color: item.color,
            size: item.size,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          });
          product.save();
        }
      })
    );

    let orderData = {
      customer: customer._id,
      phone: customer?.phone,
      email: customer?.email,
      customerName: customerName,
      comment: note,
      ship_cost,
      createdAt: date,
      branch: branchInfo,
      paymentInfo,
      orderItems: cartItems,
      orderStatus: currentOrderStatus,
      layaway: layAwayIntent,
      affiliateId: "",
    };

    let newOrder = await new Order(orderData);
    await newOrder.save();
    const newOrderString = JSON.stringify(newOrder);

    let paymentTransactionData = {
      type: "sucursal",
      paymentIntent: payIntent,
      amount: amountReceived,
      reference: transactionNo,
      pay_date: date,
      method: payMethod,
      order: newOrder?._id,
      customer: newOrder?.customer,
    };
    try {
      const newPaymentTransaction = await new Payment(paymentTransactionData);

      await newPaymentTransaction.save();
    } catch (error) {
      console.log("dBberror", error);
    }

    // send email after order is confirmed
    if (
      customerEmail.includes("@noemail.com") ||
      customerEmail === "sucursal@shopout.com"
    ) {
      console.log("did not send email");
    } else {
      try {
        const subject = "¡Gracias por tu compra!";
        const bodyOne = `Queríamos expresarte nuestro más sincero agradecimiento por haber elegido SHOP OUT MX para realizar tu compra reciente. Nos complace enormemente saber que confías en nuestros servicios/servicios.`;
        const bodyTwo = `Tu apoyo significa mucho para nosotros y nos comprometemos a brindarte la mejor experiencia posible. Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en ponerte en contacto con nuestro equipo de atención al cliente. Estamos aquí para ayudarte en cualquier momento.`;
        const title = "Recibo de compra";
        const greeting = `Estimado/a ${customer?.name}`;
        const senderName = "www.shopout.com.mx";
        const bestRegards = "¡Que tengas un excelente día!";
        const recipient_email = customer?.email;
        const sender_email = "contacto@shopout.com.mx";
        const fromName = "Shopout Mx";

        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GOOGLE_MAIL,
            pass: process.env.GOOGLE_MAIL_PASS,
          },
        });

        const formattedAmountPaid = formatter.format(
          newOrder?.paymentInfo?.amountPaid || 0
        );

        const mailOption = {
          from: `"${fromName}" ${sender_email}`,
          to: recipient_email,
          subject,
          html: `
        <!DOCTYPE html>
        <html lang="es">
        <body>
        <div>
        <p>${greeting}</p>
        <div>${bodyOne}</div>
        <p>${title}</p>
        <table style="width: 100%; font-size: 0.875rem; text-align: left;">
          <thead style="font-size: .7rem; color: #4a5568;  text-transform: uppercase;">
            <tr>
              <th style="padding: 0.75rem;">Nombre</th>
              <th style="padding: 0.75rem;">Tamaño</th>
              <th style="padding: 0.75rem;">Color</th>
              <th style="padding: 0.75rem;">Cant.</th>
              <th style="padding: 0.75rem;">Precio</th>
            </tr>
          </thead>
          <tbody>
            ${newOrder?.orderItems
              ?.map(
                (item, index) =>
                  `<tr style="background-color: #fff;" key="${index}">
                <td style="padding: 0.75rem;">${item.name}</td>
                <td style="padding: 0.75rem;">${item.size}</td>
                <td style="padding: 0.75rem;">${item.color}</td>
                <td style="padding: 0.75rem;">${item.quantity}</td>
                <td style="padding: 0.75rem;">${item.price}</td>
              </tr>`
              )
              .join("")}
              <tr>
              <div style="max-width: 100%; width: 100%; margin: 0 auto; background-color: #ffffff; display: flex; flex-direction: column; padding: 0.5rem;">
        ${
          newOrder?.orderStatus === "Apartado"
            ? `<ul style="margin-bottom: .75rem; padding-left: 0px;">
            <li style="display: flex; justify-content: space-between; gap: 0.75rem; color: #4a5568; margin-bottom: 0.25rem;">
              <span>Total de Artículos:</span>
              <span style="color: #48bb78;">
                ${await getQuantities(newOrder?.orderItems)} (Artículos)
              </span>
            </li>
            <li style="display: flex; justify-content: space-between; gap: 0.75rem; color: #4a5568; margin-bottom: 0.25rem;">
              <span>Sub-Total:</span>
              <span>
                ${(await subtotal(newOrder)) || 0}
              </span>
            </li>
            <li style="display: flex; justify-content: space-between; gap: 0.75rem; color: #4a5568; margin-bottom: 0.25rem;">
              <span>Total:</span>
              <span>
                ${(await getTotal(newOrder?.orderItems)) || 0}
              </span>
            </li>
            <li style="font-size: 1.25rem; font-weight: bold; border-top: 1px solid #cbd5e0; display: flex; justify-content: space-between; gap: 0.75rem; padding-top: 0.75rem;">
              <span>Abono:</span>
              <span>
                - ${formattedAmountPaid}
              </span>
            </li>
            <li style="font-size: 1.25rem; color: #ff9900; font-weight: bold; border-top: 1px solid #cbd5e0; display: flex; justify-content: space-between; gap: 0.75rem; padding-top: 0.25rem;">
              <span>Pendiente:</span>
              <span>
                ${
                  (await getPendingTotal(
                    newOrder?.orderItems,
                    newOrder?.paymentInfo?.amountPaid
                  )) || 0
                }
                
              </span>
            </li>
          </ul>`
            : `<ul style="margin-bottom: 1.25rem;">
            <li style="display: flex; justify-content: space-between; gap: 0.75rem; color: #4a5568; margin-bottom: 0.25rem;">
              <span>Sub-Total:</span>
              <span>
                ${(await subtotal(newOrder)) || 0}
              </span>
            </li>
            <li style="display: flex; justify-content: space-between; gap: 0.75rem; color: #4a5568; margin-bottom: 0.25rem;">
              <span>Total de Artículos:</span>
              <span style="color: #086e4f;">
                ${await getQuantities(newOrder?.orderItems)} (Artículos)
              </span>
            </li>
            <li style="display: flex; justify-content: space-between; gap: 0.75rem; color: #4a5568; margin-bottom: 0.25rem;">
              <span>Envió:</span>
              <span>
                ${newOrder?.ship_cost}
              </span>
            </li>
            <li style="font-size: 1.875rem; font-weight: bold; border-top: 1px solid #cbd5e0; display: flex; justify-content: space-between; gap: 0.75rem; margin-top: 1rem; padding-top: 0.75rem;">
              <span>Total:</span>
              <span>
                ${formattedAmountPaid}
                
              </span>
            </li>
          </ul>`
        }
        </div>
              </tr>
          </tbody>
        </table>
        <div>${bodyTwo}</div>
        <p>${senderName}</p>
        <p>${bestRegards}</p>
        </div>
        </body>
        </html>
        `,
        };

        await transporter.sendMail(mailOption);
        console.log(`Email sent successfully to ${recipient_email}`);
      } catch (error) {
        console.log(error);
        throw Error(error);
      }
    }

    revalidatePath("/admin/");
    revalidatePath("/puntodeventa/");
    return { newOrder: newOrderString };
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function getDashboard(lang) {
  try {
    await dbConnect();
    let visitors;
    let analytics;
    let orders;
    let products;
    let affiliates;
    let clients;
    let posts;
    let thisWeeksOrder;
    let totalPaymentsThisWeek;
    let dailyOrders;
    let dailyPaymentsTotals;
    let monthlyOrdersTotals;
    let yearlyOrdersTotals;

    const cstOffset = 6 * 60 * 60 * 1000; // CST is UTC+6

    const minusCstOffset = -6 * 60 * 60 * 1000; // CST is UTC+6

    // Create a new date with the offset applied
    const today = new Date(Date.now() + minusCstOffset);
    today.setUTCHours(0, 0, 0, 0); // Set time to midnight
    // Set start of the current year
    const startOfYear = new Date(
      today.getFullYear(),
      0,
      1,
      0,
      0,
      0,
      0 - cstOffset
    );

    // Set end of the current year
    const endOfYear = new Date(
      today.getFullYear() + 1,
      0,
      0,
      23, // 23 hours
      59, // 59 minutes
      59, // 59 seconds
      999 - cstOffset
    );
    // Set start of the current month
    const startOfMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1,
      0,
      0,
      0,
      0 - cstOffset
    );

    // Set end of the current month
    const endOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1, // Next month
      0, // Day 0 of next month is the last day of the current month
      23, // 23 hours
      59, // 59 minutes
      59, // 59 seconds
      999 - cstOffset
    );

    const startOfCurrentWeek = new Date(today);
    startOfCurrentWeek.setDate(today.getDate() - today.getDay());
    startOfCurrentWeek.setUTCHours(0, 0, 0, 0); // Set time to midnight

    // Clone the start of the current week to avoid mutating it
    const endOfCurrentWeek = new Date(startOfCurrentWeek);
    endOfCurrentWeek.setDate(startOfCurrentWeek.getDate() + 6); // Add six days to get to the end of the week
    endOfCurrentWeek.setUTCHours(23, 59, 59, 999); // Set time to the end of the day

    // End of the last 7 days (yesterday at 23:59:59.999)
    const endOfLast7Days = new Date(today);
    endOfLast7Days.setDate(today.getDate()); // Go back one day to get yesterday
    endOfLast7Days.setUTCHours(23, 59, 59, 999); // Set to the end of the day

    // Start of the last 7 days (7 days before the end date, at 00:00:00.000)
    const startOfLast7Days = new Date(endOfLast7Days);
    startOfLast7Days.setDate(endOfLast7Days.getDate() - 6); // Go back 6 more days to cover the last 7 days
    startOfLast7Days.setUTCHours(0, 0, 0, 0); // Set to the start of the day

    const startOfLastWeek = new Date(today);
    startOfLastWeek.setDate(today.getDate() - 14);
    startOfLastWeek.setUTCHours(0, 0, 0, 0); // Set time to midnight

    // Clone the start of the current week to avoid mutating it
    const endOfLastWeek = new Date(startOfLastWeek);
    endOfLastWeek.setDate(startOfLastWeek.getDate() + 6); // Add six days to get to the end of the week
    endOfLastWeek.setUTCHours(23, 59, 59, 999); // Set time to the end of the day

    const startOfLastMonth = new Date(today);
    startOfLastMonth.setDate(today.getDate() - 60);
    startOfLastMonth.setUTCHours(0, 0, 0, 0); // Set time to midnight

    // Clone the start of the current week to avoid mutating it
    const endOfLastMonth = new Date(startOfLastMonth);
    endOfLastMonth.setDate(startOfLastMonth.getDate() + 30); // Add six days to get to the end of the week
    endOfLastMonth.setUTCHours(23, 59, 59, 999); // Set time to the end of the day

    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getUTCDate(),
      0,
      0,
      0,
      0 - cstOffset
    );

    const endOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getUTCDate(),
      23,
      59,
      59,
      999 + minusCstOffset
    );

    // Calculate yesterday's date
    const yesterday = new Date(today);
    // Set start and end of yesterday

    yesterday.setDate(today.getDate() - 1, 0, 0, 0, 0); // Set it to yesterday
    const endOfYesterday = new Date(
      yesterday.getFullYear(),
      yesterday.getMonth(),
      yesterday.getUTCDate(),
      23,
      59,
      59,
      999 + minusCstOffset
    );

    orders = await Order.find({ orderStatus: { $ne: "Cancelado" } })
      .sort({ createdAt: -1 }) // Sort in descending order of creation date
      .limit(5);

    affiliates = await Affiliate.find({ published: { $ne: "false" } })
      .sort({ createdAt: -1 }) // Sort in descending order of creation date
      .limit(5);
    clients = await Customer.find()
      .sort({ createdAt: -1 }) // Sort in descending order of creation date
      .limit(5);
    posts = await Post.find({ published: { $ne: "false" } })
      .sort({ createdAt: -1 }) // Sort in descending order of creation date
      .limit(5);

    let weeklyData = await Payment.aggregate([
      {
        $match: {
          pay_date: {
            $gte: startOfLast7Days,
            $lt: endOfLast7Days,
          },
        },
      },
      {
        $group: {
          // Group by day using the $dateToString operator
          _id: { $dateToString: { format: "%m-%d-%Y", date: "$pay_date" } },
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0, // Optional: Remove the _id field
          date: "$_id", // Rename _id to date
          Total: "$totalAmount", // Rename totalAmount to Total
          count: 1, // Include the count field as is
        },
      },
      {
        $sort: { _id: 1 }, // Sort by date in ascending order
      },
    ]);

    let weeklyVisitorData = await Analytic.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfLast7Days,
            $lt: endOfLast7Days,
          },
        },
      },
      {
        $unwind: "$source", // Unwind the source array to access visits
      },
      {
        $group: {
          _id: { $dateToString: { format: "%m-%d-%Y", date: "$createdAt" } },
          totalVisits: { $sum: "$source.visits" }, // Sum visits from unwound source documents
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0, // Optional: Remove the _id field
          date: "$_id", // Rename _id to date
          Total: "$totalVisits", // Rename totalVisits to Total
          count: 1, // Include the count field as is
        },
      },
      {
        $sort: { date: 1 }, // Sort by date in ascending order
      },
    ]);

    let deviceUsageData = await Visitor.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfMonth,
            $lt: endOfMonth,
          },
        },
      },
      {
        $unwind: "$actions",
      },
      {
        $group: {
          _id: "$actions.viewport",
          totalVisits: { $sum: "$actions.visits" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0, // Optional: Remove the _id field
          label: "$_id", // Rename _id to label
          Total: "$totalVisits", // Rename totalVisits to Total
          count: 1, // Include the count field as is
        },
      },
      {
        $sort: { label: 1 }, // Sort by label in ascending order
      },
    ]);

    let dailyData = await Payment.aggregate([
      // Match documents for the desired day
      {
        $match: {
          // Filter documents based on the pay_date field
          pay_date: {
            $gte: startOfToday, // Start of the day
            $lt: endOfToday, // End of the day
          },
        },
      },
      // Group documents by day
      {
        $group: {
          // Group by day using the $dateToString operator on the pay_date field
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$pay_date" } }, // Group by date in YYYY-MM-DD format
          totalAmount: { $sum: "$amount" }, // Sum up the amount field for each day
          count: { $sum: 1 }, // Count the number of payments for each day (optional)
        },
      },
    ]);

    dailyOrders = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfToday,
            $lt: endOfToday,
          },
        },
      },
      {
        $unwind: "$orderItems",
      },
      {
        $group: {
          _id: {
            orderStatus: "$orderStatus",
            orderId: "$orderId",
            _id: "$_id",
          },
          total: { $sum: "$orderItems.price" },
        },
      },
      {
        $project: {
          _id: "$_id._id",
          total: 1,
          orderStatus: "$_id.orderStatus",
          orderId: "$_id.orderId",
        },
      },
    ]);

    dailyPaymentsTotals = await Payment.aggregate([
      {
        $match: {
          pay_date: {
            $gte: startOfToday,
            $lt: endOfToday,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }, // Sum up the amount field for each payment
        },
      },
    ]);

    // Perform aggregation to get yesterday's totals
    let yesterdaysOrdersTotals = await Payment.aggregate([
      {
        $match: {
          pay_date: {
            $gte: yesterday,
            $lt: endOfYesterday,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }, // Sum up the amount field for each payment
        },
      },
    ]);

    // Perform aggregation to get last weeks totals
    let lastWeeksPaymentsTotals = await Payment.aggregate([
      {
        $match: {
          pay_date: {
            $gte: startOfLastWeek,
            $lt: endOfLastWeek,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }, // Sum up the amount field for each payment
        },
      },
    ]);

    // Perform aggregation to get last months totals
    let lastMonthsPaymentsTotals = await Payment.aggregate([
      {
        $match: {
          pay_date: {
            $gte: startOfLastMonth,
            $lt: endOfLastMonth,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }, // Sum up the amount field for each payment
        },
      },
    ]);

    thisWeeksOrder = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfCurrentWeek,
            $lt: endOfCurrentWeek,
          },
        },
      },
      {
        $unwind: "$orderItems", // Deconstruct the orderItems array
      },
      {
        $group: {
          _id: {
            orderStatus: "$orderStatus",
            orderId: "$orderId", // Include orderId in the _id
            _id: "$_id", // Include _id in the _id
          },
          total: { $sum: "$orderItems.price" }, // Calculate the total sum of prices
        },
      },
      {
        $project: {
          _id: "$_id._id", // Project the _id from _id
          total: 1,
          orderStatus: "$_id.orderStatus",
          orderId: "$_id.orderId", // Project orderId
        },
      },
    ]);

    totalPaymentsThisWeek = await Payment.aggregate([
      {
        $match: {
          pay_date: {
            $gte: startOfLast7Days,
            $lt: endOfLast7Days,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }, // Sum up the amount field for each payment
        },
      },
    ]);

    // Perform aggregation to get last weeks totals
    let lastWeeksLayawayPaymentsTotals = await Payment.aggregate([
      {
        $match: {
          $and: [
            {
              pay_date: {
                $gte: startOfLastWeek,
                $lt: endOfLastWeek,
              },
            },
            {
              paymentIntent: "partial",
            },
          ],
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }, // Sum up the amount field for each payment
        },
      },
    ]);

    // Perform aggregation to get this month's totals
    monthlyOrdersTotals = await Payment.aggregate([
      {
        $match: {
          pay_date: {
            $gte: startOfMonth,
            $lt: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }, // Sum up the amount field for each payment
        },
      },
    ]);

    // Perform aggregation to get this year's totals
    yearlyOrdersTotals = await Payment.aggregate([
      {
        $match: {
          pay_date: {
            $gte: startOfYear,
            $lt: endOfYear,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }, // Sum up the amount field for each payment
        },
      },
    ]);

    products = await Product.find({ published: { $ne: "false" } })
      .sort({ createdAt: -1 }) // Sort in descending order of creation date
      .limit(5);

    analytics = await Analytic.find({}).sort({ createdAt: -1 }); // Sort in descending order of creation date

    visitors = await Visitor.find({}).sort({ createdAt: -1 }).limit(5); // Sort in descending order of creation date

    const totalOrderCount = await Order.countDocuments({
      orderStatus: { $ne: "Cancelado" },
    });
    const totalPostCount = await Post.countDocuments();
    const totalCustomerCount = await Customer.countDocuments({
      name: { $ne: "SUCURSAL" },
    });
    const totalProductCount = await Product.countDocuments({
      published: { $ne: "false" },
    });
    const orderCountPreviousMonth = await getDocumentCountPreviousMonth(Order);

    analytics = JSON.stringify(analytics);
    visitors = JSON.stringify(visitors);
    orders = JSON.stringify(orders);
    clients = JSON.stringify(clients);
    dailyOrders = JSON.stringify(dailyOrders);
    affiliates = JSON.stringify(affiliates);
    products = JSON.stringify(products);
    posts = JSON.stringify(posts);
    weeklyData = JSON.stringify(weeklyData);
    weeklyVisitorData = JSON.stringify(weeklyVisitorData);
    deviceUsageData = JSON.stringify(deviceUsageData);
    dailyData = JSON.stringify(dailyData);
    thisWeeksOrder = JSON.stringify(thisWeeksOrder);
    totalPaymentsThisWeek = totalPaymentsThisWeek[0]?.total;
    dailyPaymentsTotals = dailyPaymentsTotals[0]?.total;
    yesterdaysOrdersTotals = yesterdaysOrdersTotals[0]?.total;
    monthlyOrdersTotals = monthlyOrdersTotals[0]?.total;
    yearlyOrdersTotals = yearlyOrdersTotals[0]?.total;
    lastWeeksPaymentsTotals = lastWeeksPaymentsTotals[0]?.total;
    lastMonthsPaymentsTotals = lastMonthsPaymentsTotals[0]?.total;
    return {
      analytics: analytics,
      visitors: visitors,
      dailyData: dailyData,
      weeklyData: weeklyData,
      weeklyVisitorData: weeklyVisitorData,
      deviceUsageData: deviceUsageData,
      orders: orders,
      clients: clients,
      posts: posts,
      affiliates: affiliates,
      dailyOrders: dailyOrders,
      dailyPaymentsTotals: dailyPaymentsTotals,
      yesterdaysOrdersTotals: yesterdaysOrdersTotals,
      thisWeeksOrder: thisWeeksOrder,
      products: products,
      totalOrderCount: totalOrderCount,
      totalCustomerCount: totalCustomerCount,
      orderCountPreviousMonth: orderCountPreviousMonth,
      totalProductCount: totalProductCount,
      totalPaymentsThisWeek: totalPaymentsThisWeek,
      monthlyOrdersTotals: monthlyOrdersTotals,
      yearlyOrdersTotals: yearlyOrdersTotals,
      totalPostCount: totalPostCount,
      lastWeeksPaymentsTotals: lastWeeksPaymentsTotals,
      lastMonthsPaymentsTotals: lastMonthsPaymentsTotals,
    };
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function getPOSDashboard() {
  try {
    await dbConnect();
    const session = await getServerSession(options);
    let orders;
    let todaysOrders;
    let products;
    let thisWeeksOrder;
    let totalOrdersThisWeek;
    let dailyOrders;
    let dailyOrdersTotals;

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0); // Set time to midnight

    const startOfCurrentWeek = new Date(today);
    startOfCurrentWeek.setDate(today.getDate() - today.getDay());
    startOfCurrentWeek.setUTCHours(0, 0, 0, 0); // Set time to midnight

    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      0,
      0,
      0,
      0
    );

    const endOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
      0,
      0,
      0,
      0
    );

    if (session) {
      if (session?.user?.role === "sucursal") {
        orders = await Order.find({ orderStatus: { $ne: "Cancelado" } })
          .sort({ createdAt: -1 }) // Sort in descending order of creation date
          .limit(5);

        dailyOrders = await Order.aggregate([
          {
            $match: {
              createdAt: {
                $gte: startOfToday,
                $lt: endOfToday,
              },
            },
          },
          {
            $unwind: "$orderItems",
          },
          {
            $group: {
              _id: {
                orderStatus: "$orderStatus",
                orderId: "$orderId",
                _id: "$_id",
              },
              total: { $sum: "$orderItems.price" },
            },
          },
          {
            $project: {
              _id: "$_id._id",
              total: 1,
              orderStatus: "$_id.orderStatus",
              orderId: "$_id.orderId",
            },
          },
        ]);
        dailyOrdersTotals = await Order.aggregate([
          {
            $match: {
              createdAt: {
                $gte: startOfToday,
                $lt: endOfToday,
              },
            },
          },
          {
            $unwind: "$orderItems",
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$orderItems.price" },
            },
          },
        ]);

        thisWeeksOrder = await Order.aggregate([
          {
            $match: {
              createdAt: {
                $gte: startOfCurrentWeek,
                $lt: today,
              },
            },
          },
          {
            $unwind: "$orderItems", // Deconstruct the orderItems array
          },
          {
            $group: {
              _id: {
                orderStatus: "$orderStatus",
                orderId: "$orderId", // Include orderId in the _id
                _id: "$_id", // Include _id in the _id
              },
              total: { $sum: "$orderItems.price" }, // Calculate the total sum of prices
            },
          },
          {
            $project: {
              _id: "$_id._id", // Project the _id from _id
              total: 1,
              orderStatus: "$_id.orderStatus",
              orderId: "$_id.orderId", // Project orderId
            },
          },
        ]);
        totalOrdersThisWeek = await Order.aggregate([
          {
            $match: {
              createdAt: {
                $gte: startOfCurrentWeek,
                $lt: today,
              },
            },
          },
          {
            $unwind: "$orderItems", // Deconstruct the orderItems array
          },
          {
            $group: {
              _id: null, // Group all documents without any specific criteria
              total: { $sum: "$orderItems.price" }, // Calculate the total sum of prices
            },
          },
        ]);

        products = await Product.find({ published: { $ne: "false" } })
          .sort({ createdAt: -1 }) // Sort in descending order of creation date
          .limit(5);
      }
    }

    const totalOrderCount = await Order.countDocuments({
      orderStatus: { $ne: "Cancelado" },
    });
    const totalProductCount = await Product.countDocuments({
      published: { $ne: "false" },
    });
    const orderCountPreviousMonth = await getDocumentCountPreviousMonth(Order);

    orders = JSON.stringify(orders);
    dailyOrders = JSON.stringify(dailyOrders);

    products = JSON.stringify(products);
    thisWeeksOrder = JSON.stringify(thisWeeksOrder);
    const thisWeekOrderTotals = totalOrdersThisWeek[0]?.total;
    dailyOrdersTotals = dailyOrdersTotals[0]?.total;
    return {
      orders: orders,
      dailyOrders: dailyOrders,
      dailyOrdersTotals: dailyOrdersTotals,
      thisWeeksOrder: thisWeeksOrder,
      products: products,
      totalOrderCount: totalOrderCount,
      orderCountPreviousMonth: orderCountPreviousMonth,
      totalProductCount: totalProductCount,
      thisWeekOrderTotals: thisWeekOrderTotals,
    };
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function getInstagramDashboard() {
  try {
    await dbConnect();
    const session = await getServerSession(options);
    let orders;
    let todaysOrders;
    let products;
    let thisWeeksOrder;
    let totalOrdersThisWeek;
    let dailyOrders;
    let dailyOrdersTotals;
    const today = new Date();
    const startOfCurrentWeek = new Date(today);
    startOfCurrentWeek.setDate(
      startOfCurrentWeek.getDate() - startOfCurrentWeek.getDay()
    );
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    if (session) {
      if (session?.user?.role === "sucursal") {
        orders = await Order.find({ orderStatus: { $ne: "Cancelado" } })
          .sort({ createdAt: -1 }) // Sort in descending order of creation date
          .limit(5);

        dailyOrders = await Order.aggregate([
          {
            $match: {
              createdAt: {
                $gte: startOfToday,
                $lt: endOfToday,
              },
            },
          },
          {
            $unwind: "$orderItems",
          },
          {
            $group: {
              _id: {
                orderStatus: "$orderStatus",
                orderId: "$orderId",
                _id: "$_id",
              },
              total: { $sum: "$orderItems.price" },
            },
          },
          {
            $project: {
              _id: "$_id._id",
              total: 1,
              orderStatus: "$_id.orderStatus",
              orderId: "$_id.orderId",
            },
          },
        ]);
        dailyOrdersTotals = await Order.aggregate([
          {
            $match: {
              createdAt: {
                $gte: startOfToday,
                $lt: endOfToday,
              },
            },
          },
          {
            $unwind: "$orderItems",
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$orderItems.price" },
            },
          },
        ]);

        thisWeeksOrder = await Order.aggregate([
          {
            $match: {
              createdAt: {
                $gte: startOfCurrentWeek,
                $lt: today,
              },
            },
          },
          {
            $unwind: "$orderItems", // Deconstruct the orderItems array
          },
          {
            $group: {
              _id: {
                orderStatus: "$orderStatus",
                orderId: "$orderId", // Include orderId in the _id
                _id: "$_id", // Include _id in the _id
              },
              total: { $sum: "$orderItems.price" }, // Calculate the total sum of prices
            },
          },
          {
            $project: {
              _id: "$_id._id", // Project the _id from _id
              total: 1,
              orderStatus: "$_id.orderStatus",
              orderId: "$_id.orderId", // Project orderId
            },
          },
        ]);
        totalOrdersThisWeek = await Order.aggregate([
          {
            $match: {
              createdAt: {
                $gte: startOfCurrentWeek,
                $lt: today,
              },
            },
          },
          {
            $unwind: "$orderItems", // Deconstruct the orderItems array
          },
          {
            $group: {
              _id: null, // Group all documents without any specific criteria
              total: { $sum: "$orderItems.price" }, // Calculate the total sum of prices
            },
          },
        ]);

        products = await Product.find({ published: { $ne: "false" } })
          .sort({ createdAt: -1 }) // Sort in descending order of creation date
          .limit(5);
      }
    }

    const totalOrderCount = await Order.countDocuments({
      orderStatus: { $ne: "Cancelado" },
    });
    const totalProductCount = await Product.countDocuments({
      published: { $ne: "false" },
    });
    const orderCountPreviousMonth = await getDocumentCountPreviousMonth(Order);

    orders = JSON.stringify(orders);
    dailyOrders = JSON.stringify(dailyOrders);

    products = JSON.stringify(products);
    thisWeeksOrder = JSON.stringify(thisWeeksOrder);
    const thisWeekOrderTotals = totalOrdersThisWeek[0]?.total;
    dailyOrdersTotals = dailyOrdersTotals[0]?.total;
    return {
      orders: orders,
      dailyOrders: dailyOrders,
      dailyOrdersTotals: dailyOrdersTotals,
      thisWeeksOrder: thisWeeksOrder,
      products: products,
      totalOrderCount: totalOrderCount,
      orderCountPreviousMonth: orderCountPreviousMonth,
      totalProductCount: totalProductCount,
      thisWeekOrderTotals: thisWeekOrderTotals,
    };
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function getOnePost(slug, lang) {
  try {
    await dbConnect();

    let post = await Post.findOne({ slug: slug });
    let author = await Author.findOne({ user: post.authorId });
    const postCategory = post.category[`${lang}`];
    // Find products matching any of the tag values
    let trendingProducts = await Product.find({
      "tags.value": postCategory,
    }).limit(4);
    // convert to string
    post = JSON.stringify(post);
    trendingProducts = JSON.stringify(trendingProducts);
    author = JSON.stringify(author);
    return { post: post, trendingProducts: trendingProducts, author: author };
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function getLatestPost() {
  try {
    await dbConnect();
    let recentPost = await Post.find({}).limit(3);
    // Find products matching any of the tag values
    recentPost = JSON.stringify(recentPost);
    return { recentPost: recentPost };
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function getOnePage(category) {
  try {
    await dbConnect();
    let page = await Page.findOne({ category: category });
    // convert to string
    page = JSON.stringify(page);

    return { page: page };
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function addNewPage(data) {
  const session = await getServerSession(options);
  const user = { _id: session?.user?._id };
  let {
    category,
    preTitle,
    mainTitle,
    subTitle,
    mainImage,
    sections,
    createdAt,
  } = Object.fromEntries(data);

  sections = JSON.parse(sections);
  createdAt = new Date(createdAt);
  // validate form data
  const result = PageEntrySchema.safeParse({
    mainTitle: mainTitle,
    mainImage: mainImage,
    createdAt: createdAt,
  });
  const { error: zodError } = result;
  if (zodError) {
    return { error: zodError.format() };
  }

  //check for errors
  await dbConnect();
  const slug = generateUrlSafeTitle(mainTitle);

  const slugExists = await Page.findOne({ slug: slug });
  if (slugExists) {
    return {
      error: {
        title: { _errors: ["Este Titulo de Pagina ya esta en uso"] },
      },
    };
  }
  const { error } = await Page.create({
    category,
    preTitle,
    mainTitle,
    subTitle,
    slug,
    mainImage,
    sections,
    createdAt,
    published: true,
    authorId: { _id: session?.user._id },
  });
  if (error) throw Error(error);
  revalidatePath("/");
}

export async function updatePage(data) {
  const session = await getServerSession(options);
  let {
    _id,
    category,
    preTitle,
    mainTitle,
    subTitle,
    mainImage,
    sections,
    createdAt,
  } = Object.fromEntries(data);
  sections = JSON.parse(sections);
  const updatedAt = new Date(createdAt);
  // validate form data
  const result = PageUpdateSchema.safeParse({
    category: category,
    mainTitle: mainTitle,
    mainImage: mainImage,
    updatedAt: updatedAt,
  });
  const { error: zodError } = result;
  if (zodError) {
    return { error: zodError.format() };
  }

  //check for errors
  await dbConnect();
  const slug = generateUrlSafeTitle(mainTitle);
  const slugExists = await Page.findOne({
    slug: slug,
    _id: { $ne: _id },
  });
  if (slugExists) {
    return {
      error: {
        title: { _errors: ["Este Titulo de Pagina ya esta en uso"] },
      },
    };
  }
  const { error } = await Page.updateOne(
    { _id },
    {
      category,
      preTitle,
      mainTitle,
      subTitle,
      slug,
      mainImage,
      sections,
      updatedAt,
      published: true,
      authorId: { _id: session?.user._id },
    }
  );
  if (error) throw Error(error);
  revalidatePath("/");
}

export async function getAllPost(searchQuery) {
  const session = await getServerSession(options);

  try {
    await dbConnect();
    let postQuery;
    if (session) {
      if (session?.user?.role === "manager") {
        postQuery = Post.find({});
      } else {
        postQuery = Post.find({ published: true });
      }
    } else {
      postQuery = Post.find({ published: true });
    }

    const searchParams = new URLSearchParams(searchQuery);
    const resPerPage = 10;
    // Extract page and per_page from request URL
    const page = Number(searchParams.get("page")) || 1;
    // total number of documents in database
    const itemCount = await Post.countDocuments();
    // Extract all possible categories
    const allCategories = await Post.distinct("category");

    // Apply search Filters
    const apiPostFilters = new APIPostsFilters(postQuery, searchParams)
      .searchAllFields()
      .filter();

    let postsData = await apiPostFilters.query;

    const filteredPostsCount = postsData.length;

    // Pagination filter
    apiPostFilters.pagination(resPerPage, page);
    postsData = await apiPostFilters.query.clone();

    let sortedPosts = postsData
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    sortedPosts = JSON.stringify(sortedPosts);
    return {
      posts: sortedPosts,
      itemCount: itemCount,
      filteredPostsCount: filteredPostsCount,
    };
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function getOneOrder(id) {
  try {
    await dbConnect();

    let order = await Order.findOne({ _id: id });
    let deliveryAddress = await Address.findOne(order.shippingInfo);
    let orderPayments = await Payment.find({ order: order._id });
    let customer = await Customer.findOne({ email: order.email });

    // convert to string
    order = JSON.stringify(order);
    deliveryAddress = JSON.stringify(deliveryAddress);
    orderPayments = JSON.stringify(orderPayments);
    customer = JSON.stringify(customer);

    return {
      order: order,
      customer: customer,
      deliveryAddress: deliveryAddress,
      orderPayments: orderPayments,
    };
    // return { product };
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function getAllOrder(searchQuery) {
  try {
    await dbConnect();
    // Enable profiling for all database operations (level 2)

    const session = await getServerSession(options);
    let orderQuery;
    if (
      session?.user?.role === "manager" ||
      session?.user?.role === "sucursal"
    ) {
      orderQuery = Order.find({ orderStatus: { $ne: "Cancelado" } }).populate(
        "user"
      );
    } else if (session?.user?.role === "afiliado") {
      const affiliate = await Affiliate.findOne({ user: session?.user?._id });
      orderQuery = Order.find({
        affiliateId: affiliate?._id.toString(),
        orderStatus: { $ne: "Cancelado" },
      }).populate("user");
    } else {
      orderQuery = Order.find({
        user: session?.user?._id,
        orderStatus: { $ne: "Cancelado" },
      }).populate("user");
    }

    const searchParams = new URLSearchParams(searchQuery);
    const resPerPage = Number(searchParams.get("perpage")) || 10;
    // Extract page and per_page from request URL
    const page = Number(searchParams.get("page")) || 1;
    // Apply descending order based on a specific field (e.g., createdAt)
    orderQuery = orderQuery.sort({ createdAt: -1 });
    const totalOrderCount = await Order.countDocuments();

    // Apply search Filters including order_id and orderStatus
    const apiOrderFilters = new APIOrderFilters(
      orderQuery,
      searchParams
    ).searchAllFields();

    let ordersData = await apiOrderFilters.query;

    const itemCount = ordersData.length;
    apiOrderFilters.pagination(resPerPage, page);
    ordersData = await apiOrderFilters.query.clone();

    let orders = JSON.stringify(ordersData);

    return {
      orders: orders,
      totalOrderCount: totalOrderCount,
      itemCount: itemCount,
      resPerPage: resPerPage,
    };
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function updateOneOrder(data) {
  try {
    let { transactionNo, paidOn, note, amount, orderId } =
      Object.fromEntries(data);
    let newOrderStatus;
    let newOrderPaymentStatus;
    // Define the model name with the suffix appended with the lottery ID
    await dbConnect();
    // Retrieve the dynamically created Ticket model
    const order = await Order.findOne({ _id: orderId });
    // Calculate total amount based on items
    const date = cstDateTime();
    const orderTotal = await getTotalFromItems(order?.orderItems);
    if (order.paymentInfo.amountPaid + Number(amount) >= orderTotal) {
      newOrderStatus = "Entregado";
      newOrderPaymentStatus = "Pagado";
    } else {
      newOrderStatus = "Apartado";
      newOrderPaymentStatus = "Pendiente";
    }

    let payMethod;
    if (transactionNo === "EFECTIVO") {
      payMethod = "EFECTIVO";
    } else if (!isNaN(transactionNo)) {
      payMethod = "TERMINAL";
    }
    const updatedOrder = await Order.updateOne(
      { _id: orderId },
      {
        orderStatus: newOrderStatus,
        "paymentInfo.status": newOrderPaymentStatus,
        $inc: { "paymentInfo.amountPaid": Number(amount) },
      }
    );

    const lastOrder = await Order.findById(orderId);

    let paymentTransactionData = {
      type: "sucursal",
      paymentIntent: "",
      amount: amount,
      comment: note,
      reference: transactionNo,
      pay_date: date,
      method: payMethod,
      order: lastOrder?._id,
      user: lastOrder?.user,
    };

    try {
      const newPaymentTransaction = await new Payment(paymentTransactionData);

      await newPaymentTransaction.save();
    } catch (error) {
      console.log("dBberror", error);
    }
    revalidatePath(`/admin/pedidos`);
    revalidatePath(`/admin/pedido/${lastOrder?._id}`);
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function requestContact(data) {
  try {
    let { name, phone, email, service, lang } = Object.fromEntries(data);
    const date = cstDateTime();
    try {
      let subject;
      let body;
      let bodyTwo;
      let title;
      let greeting;
      let bestRegards;
      if (lang === "es") {
        subject = "Gracias por contactarnos ";
        body = `Esto es un correo automatizado confirmando el interés de ${service}. Pronto uno de nuestros representantes te contactara al teléfono ${phone}.`;
        bodyTwo = `Esto es un correo automatizado generado por ${name}. Que muestra interés en ${service}. Contactara al teléfono ${phone} o al email ${email}`;
        title = "Gracias por contactarnos ";
        greeting = `Saludos ${name}`;
        bestRegards = "Gracias por tu interés.";
      } else {
        subject = "Thank you for contacting us ";
        body = `This is an automated email confirming your interest in ${service}. Soon one of our representatives will contact you by phone at ${phone}.`;
        bodyTwo = `This is an automated email generated by ${name} showing interest in ${service}. Contact by phone at ${phone} or email at ${email}`;
        title = "Thank you for contacting us ";
        greeting = `Greeting ${name}`;
        bestRegards = "Thanks for your interest in out services.";
      }

      const recipient_email = email;
      const sender_email = "aceitescnr01@gmail.com";
      const fromName = "Aceites CNR";

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.GOOGLE_MAIL,
          pass: process.env.GOOGLE_MAIL_PASS,
        },
      });

      try {
        // Verify your transporter
        //await transporter.verify();

        const mailOptions = {
          from: `"${fromName}" ${sender_email}`,
          to: recipient_email,
          subject,
          html: `
          <!DOCTYPE html>
          <html lang="es">
          <body>
          <p>${greeting}</p>
          <p>${title}</p>
          <div>${body}</div>
          <p>${bestRegards}</p>
          </body>
          
          </html>
          
          `,
        };

        const mailOptionsTwo = {
          from: `"Nueva Cotización" ${recipient_email}`,
          to: sender_email,
          subject,
          html: `
          <!DOCTYPE html>
          <html lang="es">
          <body>
          <p>Llego una nueva solicitud de cotización.</p>
          <p>${title}</p>
          <div>${bodyTwo}</div>
          <p>${bestRegards}</p>
          </body>
          
          </html>
          
          `,
        };
        await transporter.sendMail(mailOptions);
        await transporter.sendMail(mailOptionsTwo);

        return {
          error: {
            success: {
              _errors: [
                "El correo se envió exitosamente revisa tu bandeja de entrada y tu correo no deseado",
              ],
            },
          },
        };
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      return { error: { email: { _errors: ["Error al enviar email"] } } };
    }
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function changeOrderNoteStatus(data) {
  try {
    let { orderId, note, orderStatus } = Object.fromEntries(data);
    const newStatus = orderStatus;
    const newNote = note;
    await dbConnect();
    const date = cstDateTime();

    const updateOrder = await Order.updateOne(
      { _id: orderId },
      {
        orderStatus: newStatus,
        comment: newNote,
        updatedAt: date,
      }
    );
    revalidatePath(`/admin/pedidos`);
    revalidatePath(`/admin/pedido/${orderId}`);
    return {
      ok: true,
    };
  } catch (error) {
    throw Error(error);
  }
}

export async function getAllPOSOrder(searchQuery) {
  try {
    await dbConnect();
    const session = await getServerSession(options);
    let orderQuery;
    if (session?.user?.role === "sucursal") {
      orderQuery = Order.find({
        $and: [{ branch: "Sucursal" }, { orderStatus: { $ne: "Cancelado" } }],
      }).populate("user");
    }

    const searchParams = new URLSearchParams(searchQuery);

    const resPerPage = Number(searchParams.get("perpage")) || 10;
    // Extract page and per_page from request URL
    const page = Number(searchParams.get("page")) || 1;
    // Apply descending order based on a specific field (e.g., createdAt)
    orderQuery = orderQuery.sort({ createdAt: -1 });

    // Apply search Filters including order_id and orderStatus
    const apiOrderFilters = new APIOrderFilters(orderQuery, searchParams)
      .searchAllFields()
      .filter();
    let ordersData = await apiOrderFilters.query;

    const itemCount = ordersData.length;

    apiOrderFilters.pagination(resPerPage, page);
    ordersData = await apiOrderFilters.query.clone();
    let orders = JSON.stringify(ordersData);

    return {
      orders: orders,
      itemCount: itemCount,
      resPerPage: resPerPage,
    };
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function getOneProduct(slug, id) {
  try {
    await dbConnect();
    let product;
    if (id) {
      product = await Product.findOne({ _id: id }).populate("category");
    } else {
      product = await Product.findOne({ slug: slug }).populate("category");
    }

    // convert to string
    product = JSON.stringify(product);
    return { product: product };
    // return { product };
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function getOneProductWithTrending(slug, id) {
  try {
    await dbConnect();
    let product;
    if (id) {
      product = await Product.findOne({ _id: id }).populate("category");
    } else {
      product = await Product.findOne({ slug: slug }).populate("category");
    }

    let trendingProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    }).limit(4);
    // convert to string
    product = JSON.stringify(product);
    trendingProducts = JSON.stringify(trendingProducts);
    return { product: product, trendingProducts: trendingProducts };
    // return { product };
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function getHomeProductsData() {
  try {
    await dbConnect();
    // Extract tag values from post.tags array
    let trendingProducts = await Product.find({}).limit(100);
    let editorsProducts = await Product.find({}).limit(10);

    trendingProducts = JSON.stringify(trendingProducts);
    editorsProducts = JSON.stringify(editorsProducts);
    return {
      trendingProducts: trendingProducts,
      editorsProducts: editorsProducts,
    };
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function updateProductQuantity(variationId) {
  try {
    await dbConnect();
    // Find the product that contains the variation with the specified variation ID
    let product = await Product.findOne({ "variations._id": variationId });

    if (product) {
      // Find the variation within the variations array
      let variation = product.variations.find(
        (variation) => variation._id.toString() === variationId
      );
      // Update the stock of the variation
      variation.stock -= 1; // Example stock update
      // Save the product to persist the changes
      await product.save();
    } else {
      console.log("Product not found");
      throw Error("Product not found");
    }
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function changeProductStatus(productId) {
  try {
    await dbConnect();
    // Find the product that contains the variation with the specified variation ID
    let product = await Product.findOne({ _id: productId });

    if (product.active === true) {
      product.active = false; // Deactivate Product
    } else {
      product.active = true; // ReActivate Product
    }
    // Save the product to persist the changes
    await product.save();
    revalidatePath("/admin/productos");
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function deleteOneProduct(productId) {
  try {
    await dbConnect();
    // Find the product that contains the variation with the specified variation ID
    await Product.findOneAndDelete({ _id: productId });

    revalidatePath("/admin/productos");
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function deleteOnePost(blogId) {
  try {
    await dbConnect();
    // Find the product that contains the variation with the specified variation ID
    await Post.findOneAndDelete({ _id: blogId });

    revalidatePath("/admin/blog");
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function changeProductAvailability(productId, location) {
  try {
    await dbConnect();
    // Find the product that contains the variation with the specified variation ID
    let product = await Product.findOne({ _id: productId });
    if (location === "Instagram") {
      if (product.availability.instagram === true) {
        product.availability.instagram = false; // Remove from physical branch
      } else {
        product.availability.instagram = true; // Add to physical branch
      }
    } else if (location === "Branch") {
      if (product.availability.branch === true) {
        product.availability.branch = false; // Remove from physical branch
      } else {
        product.availability.branch = true; // Add to physical branch
      }
    } else if (location === "Online") {
      if (product.availability.online === true) {
        product.availability.online = false; // Remove from physical branch
      } else {
        product.availability.online = true; // Add to physical branch
      }
    }
    // Save the product to persist the changes
    await product.save();
    revalidatePath("/admin/productos");
    revalidatePath("/admin/pos/tienda");
    revalidatePath("/puntodeventa/tienda");
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function getVariationStock(variationId) {
  try {
    await dbConnect();
    // Find the product that contains the variation with the specified variation ID
    let product = await Product.findOne({ "variations._id": variationId });

    if (product) {
      // Find the variation within the variations array
      let variation = product.variations.find(
        (variation) => variation._id.toString() === variationId
      );
      return { currentStock: variation.stock };
    } else {
      throw Error("Product not found");
    }
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function getOnePOSProduct(variationId) {
  try {
    await dbConnect();
    // Find the product that contains the variation with the specified variation ID
    let product = await Product.findOne({ "variations._id": variationId });

    if (product) {
      // Find the variation within the variations array
      let variation = product.variations.find(
        (variation) => variation._id.toString() === variationId
      );

      // Add product name and brand to the variation
      let { title, brand } = product;
      variation = {
        ...variation.toObject(), // Convert Mongoose document to plain object
        title: title,
        brand: brand,
      };

      // convert to string
      product = JSON.stringify(product);
      variation = JSON.stringify(variation);
      return { product: product, variation: variation };
    } else {
      throw Error("Product not found");
    }
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function getAllPOSProductOld(searchQuery) {
  try {
    await dbConnect();
    let productQuery;
    // Find the product that contains the variation with the specified variation ID
    productQuery = Product.find({
      $and: [{ stock: { $gt: 0 } }, { "availability.branch": true }],
    });

    const searchParams = new URLSearchParams(searchQuery);
    const resPerPage = Number(searchParams.get("perpage")) || 10;
    // Extract page and per_page from request URL
    const page = Number(searchParams.get("page")) || 1;
    // total number of documents in database
    const productsCount = await Product.countDocuments();
    // Apply search Filters
    const apiProductFilters = new APIFilters(productQuery, searchParams)
      .searchAllFields()
      .filter();

    let productsData = await apiProductFilters.query;

    const filteredProductsCount = productsData.length;

    apiProductFilters.pagination(resPerPage, page);
    productsData = await apiProductFilters.query.clone();

    // descending order
    let sortedProducts = productsData
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    sortedProducts = JSON.stringify(sortedProducts);
    return {
      products: sortedProducts,
      productsCount: productsCount,
      filteredProductsCount: filteredProductsCount,
      resPerPage: resPerPage,
    };
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function getAllPOSProduct(searchQuery) {
  try {
    await dbConnect();
    // Find the product that contains the variation with the specified variation ID
    let productQuery = Product.find({
      $and: [{ stock: { $gt: 0 } }, { "availability.branch": true }],
    });
    const searchParams = new URLSearchParams(searchQuery);
    const resPerPage = Number(searchParams.get("perpage")) || 10;
    // Extract page and per_page from request URL
    const page = Number(searchParams.get("page")) || 1;
    productQuery = productQuery.sort({ createdAt: -1 });
    // total number of documents in database
    const productsCount = await Product.countDocuments();
    // Apply search Filters
    const apiProductFilters = new APIFilters(productQuery, searchParams)
      .searchAllFields()
      .filter();

    let productsData = await apiProductFilters.query;

    const filteredProductsCount = productsData.length;

    apiProductFilters.pagination(resPerPage, page);
    productsData = await apiProductFilters.query.clone();
    let products = JSON.stringify(productsData);
    revalidatePath("/admin/pos/servicios/");
    return {
      products: products,
      filteredProductsCount: filteredProductsCount,
    };
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function getAllPOSProductNoFilter(searchQuery) {
  try {
    await dbConnect();
    // Find the product that contains the variation with the specified variation ID
    let productsData = await Product.find({
      $and: [{ stock: { $gt: 0 } }, { "availability.branch": true }],
    });

    const filteredProductsCount = productsData.length;
    let products = JSON.stringify(productsData);

    return {
      products: products,
      filteredProductsCount: filteredProductsCount,
    };
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function getAllProduct(searchQuery) {
  try {
    await dbConnect();
    const session = await getServerSession(options);
    let productQuery;
    if (session) {
      if (
        session?.user?.role === "manager" ||
        session?.user?.role === "sucursal"
      ) {
        productQuery = Product.find().populate("category");
      }
    } else {
      productQuery = Product.find({ published: true });
    }

    const searchParams = new URLSearchParams(searchQuery);
    const resPerPage = Number(searchParams.get("perpage")) || 10;
    // Extract page and per_page from request URL
    const page = Number(searchParams.get("page")) || 1;
    productQuery = productQuery.sort({ createdAt: -1 });
    // total number of documents in database
    const productsCount = await Product.countDocuments();
    // Extract all possible categories
    const allCategoriesData = await Category.find({}); // Adjust field names as per your schema
    const productCategories = await Product.distinct("category");

    // Filter allCategoriesData to include only categories with IDs in productCategories
    let allCategories = allCategoriesData
      .filter((category) =>
        productCategories.some((id) => id.equals(category._id))
      )
      .map((category) => {
        return { id: category._id, name: category.name };
      });

    // Extract all possible categories
    let allBrands = await Product.distinct("brand");
    // Apply search Filters
    const apiProductFilters = new APIFilters(productQuery, searchParams)
      .searchAllFields()
      .filter();

    let productsData = await apiProductFilters.query;

    const filteredProductsCount = productsData.length;

    apiProductFilters.pagination(resPerPage, page);
    productsData = await apiProductFilters.query.clone();
    let sortedProducts = JSON.stringify(productsData);
    allCategories = JSON.stringify(allCategories);
    allBrands = JSON.stringify(allBrands);
    revalidatePath("/admin/productos/");
    return {
      products: sortedProducts,
      productsCount: productsCount,
      filteredProductsCount: filteredProductsCount,
      allCategories: allCategories,
      allBrands: allBrands,
    };
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function getAllUserOrder(searchQuery, id) {
  try {
    await dbConnect();
    const session = await getServerSession(options);
    let orderQuery;

    orderQuery = Order.find({
      user: id,
      orderStatus: { $ne: "Cancelado" },
    });
    let client = await User.findOne({ _id: id });

    const searchParams = new URLSearchParams(searchQuery);
    const resPerPage = Number(searchParams.get("perpage")) || 10;
    // Extract page and per_page from request URL
    const page = Number(searchParams.get("page")) || 1;
    // Apply descending order based on a specific field (e.g., createdAt)
    orderQuery = orderQuery.sort({ createdAt: -1 });
    const totalOrderCount = await Order.countDocuments();

    // Apply search Filters including order_id and orderStatus
    const apiOrderFilters = new APIOrderFilters(orderQuery, searchParams)
      .searchAllFields()
      .filter();
    let ordersData = await apiOrderFilters.query;

    const itemCount = ordersData.length;
    apiOrderFilters.pagination(resPerPage, page);
    ordersData = await apiOrderFilters.query.clone();

    let orders = JSON.stringify(ordersData);
    client = JSON.stringify(client);

    return {
      orders: orders,
      client: client,
      totalOrderCount: totalOrderCount,
      itemCount: itemCount,
      resPerPage: resPerPage,
    };
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function getAllCustomerOrders(searchQuery, id) {
  try {
    await dbConnect();
    const session = await getServerSession(options);
    let orderQuery;

    orderQuery = Order.find({
      customer: id,
      orderStatus: { $ne: "Cancelado" },
    });
    let client = await Customer.findOne({ _id: id });

    const searchParams = new URLSearchParams(searchQuery);
    const resPerPage = Number(searchParams.get("perpage")) || 10;
    // Extract page and per_page from request URL
    const page = Number(searchParams.get("page")) || 1;
    // Apply descending order based on a specific field (e.g., createdAt)
    orderQuery = orderQuery.sort({ createdAt: -1 });
    const totalOrderCount = await Order.countDocuments();

    // Apply search Filters including order_id and orderStatus
    const apiOrderFilters = new APIOrderFilters(orderQuery, searchParams)
      .searchAllFields()
      .filter();
    let ordersData = await apiOrderFilters.query;

    const itemCount = ordersData.length;
    apiOrderFilters.pagination(resPerPage, page);
    ordersData = await apiOrderFilters.query.clone();

    let orders = JSON.stringify(ordersData);
    client = JSON.stringify(client);

    return {
      orders: orders,
      client: client,
      totalOrderCount: totalOrderCount,
      itemCount: itemCount,
      resPerPage: resPerPage,
    };
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function getAllClient(searchQuery) {
  try {
    await dbConnect();
    const session = await getServerSession(options);
    let clientQuery;

    if (session) {
      if (
        session?.user?.role === "manager" ||
        session?.user?.role === "sucursal"
      ) {
        clientQuery = Customer.find({});
      }
    }

    const searchParams = new URLSearchParams(searchQuery);
    const resPerPage = Number(searchParams.get("perpage")) || 10;
    // Extract page and per_page from request URL
    const page = Number(searchParams.get("page")) || 1;
    // total number of documents in database
    const clientsCount = await User.countDocuments();
    // Extract all possible categories
    // Apply search Filters
    const apiClientFilters = new APIClientFilters(clientQuery, searchParams)
      .searchAllFields()
      .filter();

    let clientsData = await apiClientFilters.query;

    const filteredClientsCount = clientsData.length;

    apiClientFilters.pagination(resPerPage, page);
    clientsData = await apiClientFilters.query.clone();

    let sortedClients = clientsData
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    let clients = JSON.stringify(sortedClients);

    return {
      clients: clients,
      clientsCount: clientsCount,
      filteredClientsCount: filteredClientsCount,
      resPerPage: resPerPage,
    };
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function changeClientStatus(_id) {
  try {
    await dbConnect();
    const client = await User.findOne({ _id: _id });
    if (client && client.active === false) {
      client.active = true;
    } else {
      client.active = false;
    }
    client.save();
    revalidatePath("/admin/clientes");
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function updateClient(data) {
  let { _id, name, phone, email, updatedAt } = Object.fromEntries(data);

  updatedAt = new Date(updatedAt);

  try {
    // validate form data
    const result = ClientUpdateSchema.safeParse({
      name: name,
      phone: phone,
      email: email,
      updatedAt: updatedAt,
    });

    //check for errors
    const { error: zodError } = result;
    if (zodError) {
      return { error: zodError.format() };
    }

    await dbConnect();
    let CustomZodError;
    const client = await User.findOne({ _id: _id });

    if (client?.email != email) {
      const emailExist = await User.find({ email: email });
      if (emailExist) {
        CustomZodError = {
          _errors: [],
          email: { _errors: ["El email ya esta en uso"] },
        };
        return { error: CustomZodError };
      }
    }

    if (client?.phone != phone) {
      const phoneExist = await User.find({ phone: phone });
      if (phoneExist.length > 0) {
        CustomZodError = {
          _errors: [],
          phone: { _errors: ["El teléfono ya esta en uso"] },
        };
        console.log({ error: CustomZodError });
        return { error: CustomZodError };
      }
    }

    client.name = name;
    client.phone = phone;
    client.email = email;
    client.updatedAt = updatedAt;
    // client.avatar = avatar;
    client.save();
    revalidatePath("/perfil/actualizar");
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function getAuthor(id) {
  const authorModel = await Author.findOne({ user: { _id: id } });
  let author = JSON.stringify(authorModel);
  return author;
}

export async function updateAuthor(data) {
  let { _id, name, avatarUrl, aboutAuthor, socials, updatedAt } =
    Object.fromEntries(data);
  aboutAuthor = JSON.parse(aboutAuthor);
  socials = JSON.parse(socials);
  updatedAt = new Date(updatedAt);

  try {
    // validate form data
    // const result = ClientUpdateSchema.safeParse({
    //   name: name,
    //   phone: phone,
    //   email: email,
    //   updatedAt: updatedAt,
    // });

    // //check for errors
    // const { error: zodError } = result;
    // if (zodError) {
    //   return { error: zodError.format() };
    // }

    await dbConnect();
    let CustomZodError;

    const author = await Author.findOne({ user: { _id: _id } });

    const updateAuthor = await Author.findOneAndUpdate(
      { user: _id },
      {
        $set: {
          name: name,
          avatar: avatarUrl,
          aboutAuthor: aboutAuthor,
          socials: socials,
        },
      },
      { upsert: true, new: true }
    );

    revalidatePath("/admin/actualizar");
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function updateClientPassword(data) {
  let { _id, newPassword, currentPassword, updatedAt } =
    Object.fromEntries(data);

  updatedAt = new Date(updatedAt);

  try {
    // validate form data
    const result = ClientPasswordUpdateSchema.safeParse({
      newPassword: newPassword,
      currentPassword: currentPassword,
      updatedAt: updatedAt,
    });

    //check for errors
    const { error: zodError } = result;
    if (zodError) {
      return { error: zodError.format() };
    }

    await dbConnect();
    let CustomZodError;
    let hashedPassword;
    const client = await User.findOne({ _id: _id }).select("+password");
    const comparePass = await bcrypt.compare(currentPassword, client.password);
    if (!comparePass) {
      CustomZodError = {
        _errors: [],
        currentPassword: {
          _errors: ["La contraseña actual no es la correcta"],
        },
      };
      return { error: CustomZodError };
    } else {
      hashedPassword = await bcrypt.hash(newPassword, 10);
    }

    client.password = hashedPassword;
    client.updatedAt = updatedAt;
    client.save();
    revalidatePath("/perfil/actualizar_contrasena");
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function getAllAffiliate(searchQuery) {
  try {
    await dbConnect();
    const session = await getServerSession(options);
    let affiliateQuery;

    if (session) {
      if (session?.user?.role === "manager") {
        affiliateQuery = Affiliate.find({});
      }
    }

    const searchParams = new URLSearchParams(searchQuery);
    const resPerPage = Number(searchParams.get("perpage")) || 5;
    // Extract page and per_page from request URL
    const page = Number(searchParams.get("page")) || 1;
    // total number of documents in database
    const affiliatesCount = await Affiliate.countDocuments();
    // Extract all possible categories
    // Apply search Filters
    const apiAffiliateFilters = new APIAffiliateFilters(
      affiliateQuery,
      searchParams
    )
      .searchAllFields()
      .filter();

    let affiliatesData = await apiAffiliateFilters.query;

    const filteredAffiliatesCount = affiliatesData.length;

    apiAffiliateFilters.pagination(resPerPage, page);
    affiliatesData = await apiAffiliateFilters.query.clone();

    let sortedAffiliates = affiliatesData
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    let affiliates = JSON.stringify(sortedAffiliates);

    return {
      affiliates: affiliates,
      affiliatesCount: affiliatesCount,
      filteredAffiliatesCount: filteredAffiliatesCount,
      resPerPage: resPerPage,
    };
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function getAllAffiliateOrder(searchQuery, id) {
  const session = await getServerSession(options);

  try {
    await dbConnect();
    const session = await getServerSession(options);
    let orderQuery;
    let affiliate;
    if (session) {
      orderQuery = Order.find({
        affiliateId: id,
        orderStatus: { $ne: "Cancelado" },
      });
      affiliate = await Affiliate.findOne({ _id: id });
    }

    const searchParams = new URLSearchParams(searchQuery);
    const resPerPage = Number(searchParams.get("perpage")) || 5;
    // Extract page and per_page from request URL
    const page = Number(searchParams.get("page")) || 1;
    // Apply descending order based on a specific field (e.g., createdAt)
    orderQuery = orderQuery.sort({ createdAt: -1 });
    const totalOrderCount = await Order.countDocuments();

    // Apply search Filters including order_id and orderStatus
    const apiOrderFilters = new APIOrderFilters(orderQuery, searchParams)
      .searchAllFields()
      .filter();
    let ordersData = await apiOrderFilters.query;

    const itemCount = ordersData.length;
    apiOrderFilters.pagination(resPerPage, page);
    ordersData = await apiOrderFilters.query.clone();

    let orders = JSON.stringify(ordersData);
    affiliate = JSON.stringify(affiliate);

    return {
      orders: orders,
      affiliate: affiliate,
      totalOrderCount: totalOrderCount,
      itemCount: itemCount,
      resPerPage: resPerPage,
    };
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function updateAffiliate(_id) {
  //check for errors
  await dbConnect();
  try {
    const affiliate = await Affiliate.findOne({ _id: _id });
    if (affiliate && affiliate.isActive === false) {
      affiliate.isActive = true;
    } else {
      affiliate.isActive = false;
    }
    affiliate.save();
    revalidatePath("/admin/clientes");
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function getOnboarding() {
  const session = await getServerSession(options);
  const user = { _id: session?.user?._id };
  //check for errors
  await dbConnect();
  const res = await Onboarding.findOne({
    user: user._id,
  });
  const answers = JSON.stringify(res);
  // if (error) throw Error(error);
  return {
    answers: answers,
  };
}

export async function addOnboarding(data) {
  const session = await getServerSession(options);
  const user = { _id: session?.user?._id };
  const answers = JSON.parse(data);
  //check for errors
  await dbConnect();
  const { error } = await Onboarding.create({
    "step1.answer": answers[0].answer,
    "step2.answer": answers[1].answer,
    "step3.answer": answers[2].answer,
    "step4.answer": answers[3].answer,
    "step5.answer": answers[4].answer,
    "step6.answer": answers[5].answer,
    "step7.answer": answers[6].answer,
    "step8.answer": answers[7].answer,
    "step9.answer": answers[8].answer,
    "step10.answer": answers[9].answer,
    "step11.answer": answers[10].answer,
    "step12.answer": answers[11].answer,
    "step13.answer": answers[12].answer,
    "step14.answer": answers[13].answer,
    "step15.answer": answers[14].answer,
    "step16.answer": answers[15].answer,
    "step17.answer": answers[16].answer,
    "step18.answer": answers[17].answer,
    "step19.answer": answers[18].answer,
    "step20.answer": answers[19].answer,
    "step21.answer": answers[20].answer,
    "step22.answer": answers[21].answer,
    user,
  });
  if (error) throw Error(error);
  revalidatePath("/perfil/direcciones");
}

export async function addAddress(data) {
  const session = await getServerSession(options);
  const user = { _id: session?.user?._id };
  const { street, city, province, zip_code, country, phone } =
    Object.fromEntries(data);

  // validate form data

  const { error: zodError } = AddressEntrySchema.safeParse({
    street,
    city,
    province,
    zip_code,
    country,
    phone,
  });
  if (zodError) {
    return { error: zodError.format() };
  }
  //check for errors
  await dbConnect();
  const { error } = await Address.create({
    street,
    city,
    province,
    zip_code,
    country,
    phone,
    user,
  });
  if (error) throw Error(error);
  revalidatePath("/perfil/direcciones");
  revalidatePath("/carrito/envio");
}

export async function deleteAddress(id) {
  //check for errors
  try {
    await dbConnect();
    const deleteAddress = await Address.findByIdAndDelete(id);
    revalidatePath("/perfil/direcciones");
    revalidatePath("/carrito/envio");
  } catch (error) {
    if (error) throw Error(error);
  }
}

export async function addNewProduct(data) {
  const session = await getServerSession(options);
  const user = { _id: session?.user?._id };
  let {
    title,
    packing,
    packingTwo,
    description,
    category,
    categoryId,
    weight,
    featured,
    onlineAvailability,
    mainImage,
    origins,
    tags,
    presentations,
    price,
    cost,
    stock,
    createdAt,
  } = Object.fromEntries(data);

  createdAt = new Date(createdAt);

  //check for errors
  title = JSON.parse(title);
  packing = JSON.parse(packing);
  packingTwo = JSON.parse(packingTwo);
  categoryId = JSON.parse(categoryId);
  category = JSON.parse(category);
  weight = JSON.parse(weight);
  description = JSON.parse(description);
  featured = JSON.parse(featured);
  onlineAvailability = JSON.parse(onlineAvailability);
  mainImage = JSON.parse(mainImage);
  origins = JSON.parse(origins);
  tags = JSON.parse(tags);
  presentations = JSON.parse(presentations);
  await dbConnect();
  const slug = generateUrlSafeTitle(title.es);

  const slugExists = await Product.findOne({ slug: slug });
  if (slugExists) {
    return {
      error: {
        title: "Este Titulo del producto ya esta en uso",
      },
    };
  }
  const newProduct = await Product.create({
    title,
    slug,
    packing,
    packingTwo,
    description,
    weight,
    featured,
    onlineAvailability,
    origins,
    tags,
    presentations,
    price,
    cost,
    stock,
    images: [{ url: mainImage }],
    createdAt,
    published: true,
    category: category._id,
    user,
  });
  //if (error) throw Error(error);
  revalidatePath("/admin/productos");
  return {
    success: {
      ok: "Producto se creo con exito",
    },
  };
}

export async function updateProduct(data) {
  const session = await getServerSession(options);
  const user = { _id: session?.user?._id };
  let {
    id,
    title,
    packing,
    packingTwo,
    description,
    category,
    weight,
    weightTwo,
    featured,
    onlineAvailability,
    mainImage,
    origins,
    tags,
    presentations,
    price,
    cost,
    stock,
    updatedAt,
  } = Object.fromEntries(data);

  updatedAt = new Date(updatedAt);

  // Check for errors
  title = JSON.parse(title);
  packing = JSON.parse(packing);
  packingTwo = JSON.parse(packingTwo);
  category = JSON.parse(category);
  weight = JSON.parse(weight);
  weightTwo = JSON.parse(weightTwo);
  description = JSON.parse(description);
  featured = featured;
  onlineAvailability = JSON.parse(onlineAvailability);
  mainImage = JSON.parse(mainImage);
  origins = JSON.parse(origins);
  tags = JSON.parse(tags);
  presentations = JSON.parse(presentations);

  await dbConnect();
  const slug = generateUrlSafeTitle(title.es);
  const slugExists = await Product.findOne({ slug: slug, _id: { $ne: id } });
  if (slugExists) {
    return {
      error: {
        title: "Este Titulo del producto ya esta en uso",
      },
    };
  }
  console.log("category._id", category._id);

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      title,
      slug,
      packing,
      packingTwo,
      description,
      category: { _id: category._id },
      weight,
      weightTwo,
      featured,
      onlineAvailability,
      origins,
      tags,
      presentations,
      price,
      cost,
      stock,
      images: [{ url: mainImage }],
      updatedAt,
      published: true,
      user,
    },
    { new: true }
  );

  if (!updatedProduct) {
    return {
      error: {
        title: "No se encontró el producto para actualizar",
      },
    };
  }

  revalidatePath("/admin/productos");

  return {
    success: {
      ok: "Producto se actualizó con éxito",
    },
  };
}

export async function addNewPost(data) {
  const session = await getServerSession(options);
  const user = { _id: session?.user?._id };
  let {
    category,
    metaDescription,
    keywords,
    mainTitle,
    mainImage,
    sectionTwoTitle,
    sectionTwoParagraphOne,
    sectionTwoParagraphTwo,
    sectionThreeTitle,
    sectionThreeParagraphOne,
    sectionThreeImage,
    sectionThreeParagraphFooter,
    sectionFourTitle,
    sectionFourParagraphOne,
    sectionFourImage,
    sectionFourParagraphFooter,
    sectionFiveTitle,
    sectionFiveImage,
    sectionFiveParagraphOne,
    sectionFiveParagraphTwo,
    sectionSixColOneTitle,
    sectionSixColOneParagraph,
    sectionSixColOneImage,
    sectionSixColTwoTitle,
    sectionSixColTwoParagraph,
    sectionSixColTwoImage,
    sectionSixColOneParagraphFooter,
    sectionSevenTitle,
    sectionSevenImage,
    sectionSevenParagraph,
    createdAt,
  } = Object.fromEntries(data);

  createdAt = new Date(createdAt);
  // validate form data
  // const result = PostEntrySchema.safeParse({
  //   category: category,
  //   mainTitle: mainTitle,
  //   mainImage: mainImage,
  //   createdAt: createdAt,
  // });
  // const { error: zodError } = result;
  // if (zodError) {
  //   return { error: zodError.format() };
  // }

  //check for errors
  mainTitle = JSON.parse(mainTitle);
  keywords = JSON.parse(keywords);
  category = JSON.parse(category);
  sectionTwoTitle = JSON.parse(sectionTwoTitle);
  sectionTwoParagraphOne = JSON.parse(sectionTwoParagraphOne);
  sectionTwoParagraphTwo = JSON.parse(sectionTwoParagraphTwo);
  sectionThreeTitle = JSON.parse(sectionThreeTitle);
  sectionThreeParagraphOne = JSON.parse(sectionThreeParagraphOne);
  sectionThreeParagraphFooter = JSON.parse(sectionThreeParagraphFooter);
  sectionFourTitle = JSON.parse(sectionFourTitle);
  sectionFourParagraphOne = JSON.parse(sectionFourParagraphOne);
  sectionFourParagraphFooter = JSON.parse(sectionFourParagraphFooter);
  sectionFiveTitle = JSON.parse(sectionFiveTitle);
  sectionFiveParagraphOne = JSON.parse(sectionFiveParagraphOne);
  sectionFiveParagraphTwo = JSON.parse(sectionFiveParagraphTwo);
  sectionSixColOneTitle = JSON.parse(sectionSixColOneTitle);
  sectionSixColOneParagraph = JSON.parse(sectionSixColOneParagraph);
  sectionSixColTwoTitle = JSON.parse(sectionSixColTwoTitle);
  sectionSixColTwoParagraph = JSON.parse(sectionSixColTwoParagraph);
  sectionSixColOneParagraphFooter = JSON.parse(sectionSixColOneParagraphFooter);
  sectionSevenTitle = JSON.parse(sectionSevenTitle);
  sectionSevenParagraph = JSON.parse(sectionSevenParagraph);
  await dbConnect();
  const slug = generateUrlSafeTitle(mainTitle.es);

  const slugExists = await Post.findOne({ slug: slug });
  if (slugExists) {
    return {
      error: {
        title: { _errors: ["Este Titulo de publicación ya esta en uso"] },
      },
    };
  }
  const newPost = await Post.create({
    category,
    metaDescription,
    keywords,
    mainTitle,
    slug,
    mainImage,
    sectionTwoTitle,
    sectionTwoParagraphOne,
    sectionTwoParagraphTwo,
    sectionThreeTitle,
    sectionThreeParagraphOne,
    sectionThreeImage,
    sectionThreeParagraphFooter,
    sectionFourTitle,
    sectionFourParagraphOne,
    sectionFourImage,
    sectionFourParagraphFooter,
    sectionFiveTitle,
    sectionFiveImage,
    sectionFiveParagraphOne,
    sectionFiveParagraphTwo,
    sectionSixColOneTitle,
    sectionSixColOneParagraph,
    sectionSixColOneImage,
    sectionSixColTwoTitle,
    sectionSixColTwoParagraph,
    sectionSixColTwoImage,
    sectionSixColOneParagraphFooter,
    sectionSevenTitle,
    sectionSevenImage,
    sectionSevenParagraph,
    createdAt,
    published: true,
    authorId: { _id: session?.user._id },
  });
  //if (error) throw Error(error);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function updatePost(data, lang) {
  const session = await getServerSession(options);
  const user = { _id: session?.user?._id };
  let {
    _id,
    category,
    metaDescription,
    keywords,
    mainTitle,
    mainImage,
    sectionTwoTitle,
    sectionTwoParagraphOne,
    sectionTwoParagraphTwo,
    sectionThreeTitle,
    sectionThreeParagraphOne,
    sectionThreeImage,
    sectionThreeParagraphFooter,
    sectionFourTitle,
    sectionFourParagraphOne,
    sectionFourImage,
    sectionFourParagraphFooter,
    sectionFiveTitle,
    sectionFiveImage,
    sectionFiveParagraphOne,
    sectionFiveParagraphTwo,
    sectionSixColOneTitle,
    sectionSixColOneParagraph,
    sectionSixColOneImage,
    sectionSixColTwoTitle,
    sectionSixColTwoParagraph,
    sectionSixColTwoImage,
    sectionSixColOneParagraphFooter,
    sectionSevenTitle,
    sectionSevenImage,
    sectionSevenParagraph,
    updatedAt,
  } = Object.fromEntries(data);
  //check for errors
  mainTitle = JSON.parse(mainTitle);
  keywords = JSON.parse(keywords);
  category = JSON.parse(category);
  sectionTwoTitle = JSON.parse(sectionTwoTitle);
  sectionTwoParagraphOne = JSON.parse(sectionTwoParagraphOne);
  sectionTwoParagraphTwo = JSON.parse(sectionTwoParagraphTwo);
  sectionThreeTitle = JSON.parse(sectionThreeTitle);
  sectionThreeParagraphOne = JSON.parse(sectionThreeParagraphOne);
  sectionThreeParagraphFooter = JSON.parse(sectionThreeParagraphFooter);
  sectionFourTitle = JSON.parse(sectionFourTitle);
  sectionFourParagraphOne = JSON.parse(sectionFourParagraphOne);
  sectionFourParagraphFooter = JSON.parse(sectionFourParagraphFooter);
  sectionFiveTitle = JSON.parse(sectionFiveTitle);
  sectionFiveParagraphOne = JSON.parse(sectionFiveParagraphOne);
  sectionFiveParagraphTwo = JSON.parse(sectionFiveParagraphTwo);
  sectionSixColOneTitle = JSON.parse(sectionSixColOneTitle);
  sectionSixColOneParagraph = JSON.parse(sectionSixColOneParagraph);
  sectionSixColTwoTitle = JSON.parse(sectionSixColTwoTitle);
  sectionSixColTwoParagraph = JSON.parse(sectionSixColTwoParagraph);
  sectionSixColOneParagraphFooter = JSON.parse(sectionSixColOneParagraphFooter);
  sectionSevenTitle = JSON.parse(sectionSevenTitle);
  sectionSevenParagraph = JSON.parse(sectionSevenParagraph);

  updatedAt = new Date(updatedAt);
  // validate form data
  // const result = PostUpdateSchema.safeParse({
  //   category: category,
  //   mainTitle: mainTitle,
  //   mainImage: mainImage,
  //   updatedAt: updatedAt,
  // });
  // const { error: zodError } = result;
  // if (zodError) {
  //   return { error: zodError.format() };
  // }

  //check for errors
  await dbConnect();
  const slug = generateUrlSafeTitle(mainTitle.es);
  const slugExists = await Post.findOne({ slug: slug, _id: { $ne: _id } });
  if (slugExists) {
    return {
      error: {
        title: { _errors: ["Este Titulo de publicación ya esta en uso"] },
      },
    };
  }
  const updatePost = await Post.updateOne(
    { slug: slug },
    {
      category,
      mainTitle,
      slug,
      mainImage,
      sectionTwoTitle,
      sectionTwoParagraphOne,
      sectionTwoParagraphTwo,
      sectionThreeTitle,
      sectionThreeParagraphOne,
      sectionThreeImage,
      sectionThreeParagraphFooter,
      sectionFourTitle,
      sectionFourParagraphOne,
      sectionFourImage,
      sectionFourParagraphFooter,
      sectionFiveTitle,
      sectionFiveImage,
      sectionFiveParagraphOne,
      sectionFiveParagraphTwo,
      sectionSixColOneTitle,
      sectionSixColOneParagraph,
      sectionSixColOneImage,
      sectionSixColTwoTitle,
      sectionSixColTwoParagraph,
      sectionSixColTwoImage,
      sectionSixColOneParagraphFooter,
      sectionSevenTitle,
      sectionSevenImage,
      sectionSevenParagraph,
      updatedAt,
      published: true,
      authorId: { _id: session?.user._id },
    }
  );
  //if (error) throw Error(error);
  revalidatePath("/admin/blog");
  revalidatePath("/blog/publicacion/");
  revalidatePath("/admin/blog/editor");
  revalidatePath("/blog");
}

export async function addVariationProduct(data) {
  const session = await getServerSession(options);
  const user = { _id: session?.user?._id };

  let {
    title,
    description,
    category,
    tags,
    featured,
    branchAvailability,
    instagramAvailability,
    onlineAvailability,
    mainImage,
    brand,
    gender,
    variations,
    salePrice,
    salePriceEndDate,
    createdAt,
  } = Object.fromEntries(data);
  // Parse variations JSON string with reviver function to convert numeric strings to numbers
  let colors = [];
  variations = JSON.parse(variations, (key, value) => {
    if (key === "color") {
      const color = {
        value: value,
        label: value,
      };
      //check array of object to see if values exists
      const exists = colors.some((c) => c.value === value || c.label === value);
      if (!exists) {
        colors.push(color); // add to colors array
      }
    }
    // Check if the value is a string and represents a number
    if (!isNaN(value) && value !== "" && !Array.isArray(value)) {
      if (key != "size") {
        return Number(value); // Convert the string to a number
      }
    }
    return value; // Return unchanged for other types of values
  });

  tags = JSON.parse(tags);
  const sale_price = Number(salePrice);
  const sale_price_end_date = salePriceEndDate;
  const images = [{ url: mainImage }];

  // calculate product stock
  const stock = variations.reduce(
    (total, variation) => total + variation.stock,
    0
  );
  createdAt = new Date(createdAt);

  // validate form data
  const result = VariationProductEntrySchema.safeParse({
    title: title,
    description: description,
    brand: brand,
    category: category,
    tags: tags,
    images: images,
    variations: variations,
    stock: stock,
    gender: gender,
    createdAt: createdAt,
  });

  //check for errors
  const { error: zodError } = result;
  if (zodError) {
    return { error: zodError.format() };
  }
  // Create a new Product in the database
  await dbConnect();
  const slug = generateUrlSafeTitle(title);

  const slugExists = await Product.findOne({ slug: slug });
  if (slugExists) {
    return {
      error: {
        title: { _errors: ["Este Titulo de producto ya esta en uso"] },
      },
    };
  }
  const availability = {
    instagram: instagramAvailability,
    branch: branchAvailability,
    online: onlineAvailability,
  };

  const { error } = await Product.create({
    type: "variation",
    title,
    slug,
    description,
    featured,
    availability,
    brand,
    gender,
    category,
    tags,
    images,
    colors,
    variations,
    stock,
    sale_price,
    sale_price_end_date,
    createdAt,
    user,
  });
  console.log(error);
  if (error) throw Error(error);
  revalidatePath("/admin/productos");
  revalidatePath("/tienda");
}

export async function updateVariationProduct(data) {
  const session = await getServerSession(options);
  const user = { _id: session?.user?._id };

  let {
    title,
    description,
    category,
    tags,
    featured,
    branchAvailability,
    instagramAvailability,
    onlineAvailability,
    mainImage,
    brand,
    gender,
    variations,
    salePrice,
    salePriceEndDate,
    updatedAt,
    _id,
  } = Object.fromEntries(data);
  // Parse variations JSON string with reviver function to convert numeric strings to numbers
  let colors = [];
  variations = JSON.parse(variations, (key, value) => {
    if (key === "color") {
      const color = {
        value: value,
        label: value,
      };
      //check array of object to see if values exists
      const exists = colors.some((c) => c.value === value || c.label === value);
      if (!exists) {
        colors.push(color); // add to colors array
      }
    }
    // Check if the value is a string and represents a number
    if (!isNaN(value) && value !== "" && !Array.isArray(value)) {
      if (key != "size") {
        return Number(value); // Convert the string to a number
      }
    }
    return value; // Return unchanged for other types of values
  });

  tags = JSON.parse(tags);
  const sale_price = Number(salePrice);
  const sale_price_end_date = salePriceEndDate;
  const images = [{ url: mainImage }];

  // calculate product stock
  const stock = variations.reduce(
    (total, variation) => total + variation.stock,
    0
  );
  updatedAt = new Date(updatedAt);
  // validate form data
  const result = VariationUpdateProductEntrySchema.safeParse({
    title: title,
    description: description,
    brand: brand,
    category: category,
    tags: tags,
    images: images,
    variations: variations,
    stock: stock,
    gender: gender,
    updatedAt: updatedAt,
  });

  //check for errors
  const { error: zodError } = result;
  if (zodError) {
    return { error: zodError.format() };
  }

  // Create a new Product in the database
  await dbConnect();

  const slug = generateUrlSafeTitle(title);
  const slugExists = await Product.findOne({ slug: slug, _id: { $ne: _id } });
  if (slugExists) {
    return {
      error: {
        title: { _errors: ["Este Titulo de producto ya esta en uso"] },
      },
    };
  }
  const availability = {
    instagram: instagramAvailability,
    branch: branchAvailability,
    online: onlineAvailability,
  };

  const { error } = await Product.updateOne(
    { _id },
    {
      type: "variation",
      title,
      slug,
      description,
      featured,
      availability,
      brand,
      gender,
      category,
      tags,
      images,
      colors,
      variations,
      stock,
      sale_price,
      sale_price_end_date,
      updatedAt,
      user,
    }
  );
  if (error) throw Error(error);
  revalidatePath("/admin/productos");
  revalidatePath("/tienda");
}

export async function updateRevalidateProduct() {
  revalidatePath("/admin/productos");
  revalidatePath("/tienda");
}

export async function addProduct(data) {
  const session = await getServerSession(options);
  const user = { _id: session?.user?._id };

  let {
    title,
    description,
    category,
    cost,
    price,
    sizes,
    tags,
    colors,
    featured,
    images,
    brand,
    gender,
    salePrice,
    salePriceEndDate,
    stock,
    createdAt,
  } = Object.fromEntries(data);
  // Parse images as JSON
  images = JSON.parse(images);
  sizes = JSON.parse(sizes);
  tags = JSON.parse(tags);
  colors = JSON.parse(colors);
  stock = Number(stock);
  cost = Number(cost);
  price = Number(price);
  const sale_price = Number(salePrice);
  const sale_price_end_date = salePriceEndDate;

  createdAt = new Date(createdAt);

  // validate form data
  const result = ProductEntrySchema.safeParse({
    title: title,
    description: description,
    brand: brand,
    category: category,
    colors: colors,
    sizes: sizes,
    tags: tags,
    images: images,
    gender: gender,
    stock: stock,
    price: price,
    cost: cost,
    createdAt: createdAt,
  });

  //check for errors
  const { error: zodError } = result;
  if (zodError) {
    return { error: zodError.format() };
  }
  // Create a new Product in the database
  await dbConnect();
  const slug = generateUrlSafeTitle(title.es);
  const slugExists = await Post.findOne({ slug: slug });
  if (slugExists) {
    return {
      error: {
        title: { _errors: ["Este Titulo de producto ya esta en uso"] },
      },
    };
  }
  const { error } = await Product.create({
    type: "simple",
    title,
    slug,
    description,
    featured,
    brand,
    gender,
    category,
    colors,
    sizes,
    tags,
    images,
    stock,
    price,
    sale_price,
    sale_price_end_date,
    cost,
    createdAt,
    user,
  });
  if (error) throw Error(error);
  revalidatePath("/admin/productos");
  revalidatePath("/tienda");
}

export async function resendEmail(data) {
  let { email, gReCaptchaToken } = Object.fromEntries(data);
  const secretKey = process?.env?.RECAPTCHA_SECRET_KEY;

  //check for errors
  const { error: zodError } = VerifyEmailSchema.safeParse({
    email,
  });
  if (zodError) {
    return { error: zodError.format() };
  }

  const formData = `secret=${secretKey}&response=${gReCaptchaToken}`;
  let res;
  try {
    res = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  } catch (e) {
    console.log("recaptcha error:", e);
  }

  if (res && res.data?.success && res.data?.score > 0.5) {
    // Save data to the database from here
    try {
      await dbConnect();
      const user = await User.findOne({ email: email });
      if (!user) {
        return { error: { email: { _errors: ["Email does not exist"] } } };
      }
      if (user?.isActive === true) {
        return { error: { email: { _errors: ["Email is already verified"] } } };
      }
      if (user?._id) {
        try {
          const subject = "Confirmar email";
          const body = `Por favor da click en confirmar email para verificar tu cuenta.`;
          const title = "Completar registro";
          const greeting = `Saludos ${user?.name}`;
          const action = "CONFIRMAR EMAIL";
          const bestRegards = "Gracias por unirte a nuestro sitio.";
          const recipient_email = email;
          const sender_email = "contacto@shopout.com.mx";
          const fromName = "Shopout Mx";

          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: process.env.GOOGLE_MAIL,
              pass: process.env.GOOGLE_MAIL_PASS,
            },
          });

          try {
            // Verify your transporter
            //await transporter.verify();

            const mailOptions = {
              from: `"${fromName}" ${sender_email}`,
              to: recipient_email,
              subject,
              html: `
        <!DOCTYPE html>
        <html lang="es">
        <body>
        <p>${greeting}</p>
        <p>${title}</p>
        <div>${body}</div>
        <a href="${process.env.NEXTAUTH_URL}/exito?token=${user?.verificationToken}">${action}</a>
        <p>${bestRegards}</p>
        </body>
        
        </html>
        
        `,
            };
            await transporter.sendMail(mailOptions);

            return {
              error: {
                success: {
                  _errors: [
                    "El correo se envió exitosamente revisa tu bandeja de entrada y tu correo no deseado",
                  ],
                },
              },
            };
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          return { error: { email: { _errors: ["Error al enviar email"] } } };
        }
      }
    } catch (error) {
      console.log(error);
      throw Error(error);
    }
  } else {
    return {
      error: {
        email: { _errors: [`Failed Google Captcha Score: ${res.data?.score}`] },
      },
    };
  }
}

export async function resetAccountEmail(data) {
  let { email, gReCaptchaToken } = Object.fromEntries(data);
  const secretKey = process?.env?.RECAPTCHA_SECRET_KEY;

  //check for errors
  const { error: zodError } = VerifyEmailSchema.safeParse({
    email,
  });
  if (zodError) {
    return { error: zodError.format() };
  }

  const formData = `secret=${secretKey}&response=${gReCaptchaToken}`;
  let res;
  try {
    res = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  } catch (e) {
    console.log("recaptcha error:", e);
  }

  if (res && res.data?.success && res.data?.score > 0.5) {
    // Save data to the database from here
    try {
      await dbConnect();
      const user = await User.findOne({ email: email });
      if (!user) {
        return { error: { email: { _errors: ["El correo no existe"] } } };
      }
      if (user?.active === false) {
        return {
          error: { email: { _errors: ["El correo no esta verificado"] } },
        };
      }
      if (user?._id) {
        try {
          const subject = "Desbloquear Cuenta Shopout Mx";
          const body = `Por favor da click en desbloquear para reactivar tu cuenta`;
          const title = "Desbloquear Cuenta";
          const btnAction = "DESBLOQUEAR";
          const greeting = `Saludos ${user?.name}`;
          const bestRegards =
            "¿Problemas? Ponte en contacto contacto@shopout.com.mx";
          const recipient_email = email;
          const sender_email = "contacto@shopout.com.mx";
          const fromName = "Shopout Mx";

          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: process.env.GOOGLE_MAIL,
              pass: process.env.GOOGLE_MAIL_PASS,
            },
          });

          const mailOption = {
            from: `"${fromName}" ${sender_email}`,
            to: recipient_email,
            subject,
            html: `
              <!DOCTYPE html>
              <html lang="es">
              <body>
              <p>${greeting}</p>
              <p>${title}</p>
              <div>${body}</div>
              <a href="${process.env.NEXTAUTH_URL}/reiniciar?token=${user?.verificationToken}">${btnAction}</a>
              <p>${bestRegards}</p>
              </body>
              
              </html>
              
              `,
          };

          await transporter.sendMail(mailOption);

          return {
            error: {
              success: {
                _errors: [
                  "El correo electrónico fue enviado exitosamente revisa tu bandeja de entrada y spam",
                ],
              },
            },
          };
        } catch (error) {
          return { error: { email: { _errors: ["Failed to send email"] } } };
        }
      }
    } catch (error) {
      if (error) throw Error(error);
    }
  } else {
    return {
      error: {
        email: { _errors: [`Failed Google Captcha Score: ${res.data?.score}`] },
      },
    };
  }
}

export async function addAnalytics(source, country) {
  createdAt = new Date();
  const dayExists = await Analytic.findOne({ createdAt: date });
  const ipExists = await Analytic.findOne({ ips: ip });
  if (dayExists) {
    if (ipExists) {
      await Analytic.updateOne(
        { _id: dayExists._id },
        {
          $inc: { visits: 1 },
        }
      );
    } else {
      await Analytic.updateOne(
        { _id: dayExists._id },
        {
          ips: [ip],
          $inc: { visits: 1 },
        }
      );
    }
  } else {
    await Analytic.create({
      createdAt,
      country,
      source,
    });
  }

  revalidatePath("/admin/analytic");
}

export async function imageToText(imageUrl) {
  const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
  });

  await dbConnect();
  const categories = await Category.find({}, "name _id");

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `extract all the product fields from this product image and create a product object to save to a mongoose db connection with the following product structure:{ title: {    es: { type: String },    en: { type: String },  }, description: {    es: { type: String },    en: { type: String },  }, brand: {    type: String,  }, weight: {    es: { type: Number },    en: { type: Number },  },\npacking: {    es: { type: String },    en: { type: String },  }, category: {    es: { type: String },    en: { type: String },  }, categoryId: {  type: String }, images: [    {      url: {        type: String,      },    },  ]}. Pick The best suiting category name and its corresponding id from exclusively the following list ${categories}. Adjust the English and Spanish translations as necessary for the actual product text.`,
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
        {
          role: "assistant",
          content: [
            {
              type: "text",
              text: `Please return the response with only the following JSON format:{  title: { es: "Aditivo para Motocicletas 2 Tiempos",  en: "Additive for 2-Stroke Motorcycles" },  description: {  es: "CNR Oil calidad superior para motores de 2 tiempos.",    en: "CNR Oil superior quality for 2-stroke engines."  },  brand: {  type: "CNR Oil"  },  weight: {    es: 220,    en: 220 },  packing: { es: "Botella de 220 ml",  en: "220 ml bottle"  },  category: {  es: "DIESEL MASSIMO PLUS API CK4/SN SAE 15W40",   en: "DIESEL MASSIMO PLUS API CK4/SN SAE 15W40" }, categoryId: {  64asd6f8765465sd4f6a5sdf }, images: [ { url: ${imageUrl} } ]} . Pick The best suiting category name and its corresponding id from exclusively the following list ${categories}. Adjust the English and Spanish translations as necessary for the actual product text.`,
            },
          ],
        },
      ],
      response_format: {
        type: "text",
      },
      temperature: 1,
      max_completion_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const contentString = response.choices[0].message.content;

    let cleanString = contentString.split("```json");
    cleanString = cleanString[1].split("```");

    return {
      data: cleanString[0],
      status: 200,
    };
  } catch (error) {
    console.error("Error analyzing image with OpenAI API:", error);
    return { data: "Failed to analyze image", status: 500 };
  }
}

export async function createFBPost(prompt, productImageUrl) {
  const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
  });

  const aiPromptRequest = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
          Actúa como un experto en marketing digital y diseño gráfico para redes sociales. Trabajas para una marca llamada **AceitesCNR**, especializada en aceites para motores.
          
          **Objetivo:** Generar contenido atractivo y SEO-friendly para una publicación en redes sociales, acompañado de un diseño de imagen alineado con el branding de AceitesCNR.
  
          ### Requisitos para la imagen:
          1. Utiliza la imagen del producto proporcionada como base (no reinventes el producto).
          2. Aplica los colores de la marca: **azul rey** y **rojo **.
          3. El diseño debe ser profesional, moderno y visualmente atractivo para destacar en plataformas como Instagram o Facebook.
          4. Incluye:
            - Un llamado a la acción (CTA) claro en español con ortografía verificada.
            - ${prompt}.
            - Un diseño limpio y en línea con las mejores prácticas de diseño gráfico para redes sociales.
          
          ### Requisitos para el copy:
          1. Genera un texto en **español** que sea:
            - SEO-friendly, persuasivo y enfocado en atraer clientes potenciales.
            - Destacando los beneficios del producto y fomentando interacción.
          2. Incluye hashtags relevantes para el mercado automotriz.
          
          El resultado debe ser estrictamente en el siguiente formato JSON:
          {
            "content": "Texto optimizado para la publicación.",
            "imagePrompt": "Descripción detallada del diseño en inglés."
          }
        `,
      },
      {
        role: "user",
        content: `
          Crea contenido optimizado para SEO y un diseño de imagen siguiendo este concepto: **${prompt}**. El contenido debe estar en español, mientras que la descripción del diseño (imagePrompt) debe estar en español. Siempre devuelve la respuesta estrictamente en el siguiente formato JSON:
          {
            "content": "Texto optimizado para la publicación.",
            "imagePrompt": "Descripción detallada del diseño en español."
          }
        `,
      },
    ],
    model: "gpt-4o-mini",
  });

  if (aiPromptRequest.choices[0].message.content) {
    await aiPromptRequest.choices[0].message.content.replace("```", "").trim();
    await aiPromptRequest.choices[0].message.content.replace("json", "").trim();

    const responseContent = JSON.parse(
      aiPromptRequest.choices[0].message.content
    );

    const imagePrompt = responseContent.imagePrompt;
    const content = responseContent.content;

    if (imagePrompt) {
      try {
        // Generate post image with Dall E

        const response = await openai.images.generate({
          model: "dall-e-3",
          prompt: imagePrompt,
          n: 1,
          size: "1024x1024",
        });

        const baseImageUrl = response.data[0].url;
        const result = await uploadImageFromUrl(baseImageUrl, "/social/");
        const logo =
          "https://www.aceitescnr.com/_next/image?url=%2Flogos%2FCNR_LOGO_true.png&w=256&q=75";

        // Fetch both images
        // const [mainImage, logoImage] = await Promise.all([
        //   fetchImageAsFile(result.imageUrl),
        //   fetchImageAsFile(logo),
        // ]);
        // const responseMod = await openai.images.edit({
        //   model: "dall-e-2",
        //   prompt: "Add the mask as an overlay logo for the image",
        //   image: mainImage,
        //   mask: logoImage,
        //   n: 1,
        //   size: "1024x1024",
        // });

        return {
          status: 200,
          url: response.data[0].url,
          modUrl: result.imageUrl,
          content: content,
        };
      } catch (error) {
        console.error(
          "Failed to respond to Facebook post:",
          error.response?.data || error.message
        );
        return { status: 400, error: error.response?.data || error.message };
      }
    }
  }
}

async function fetchImageAsFile(url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Create a Blob-like object that OpenAI's API will accept
  return {
    buffer,
    name: "image.png",
    data: buffer,
    type: "image/png",
  };
}

// Helper to fetch image from URL and convert to buffer
async function fetchImageBuffer(imageUrl) {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// Put a file in bucket my-bucketname
const uploadToBucket = async (bucket, filename, filePath) => {
  return new Promise((resolve, reject) => {
    mc.fPutObject(bucket, filename, filePath, function (err, result) {
      if (err) {
        console.error("Error uploading to MinIO:", err);
        reject(err);
      } else {
        resolve({
          etag: result.etag,
          url: `${process.env.MINIO_URL}${filename}`,
        });
      }
    });
  });
};

export async function uploadImageFromUrl(imageUrl, folder) {
  try {
    // Get session for auth check
    const session = await getServerSession(options);

    if (!session?.user?.role || session.user.role !== "manager") {
      throw new Error("Unauthorized access");
    }

    // Generate a unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const fileName = `${timestamp}${randomString}.jpg`;

    // Fetch and save image temporarily
    const imageBuffer = await fetchImageBuffer(imageUrl);
    const tempPath = join("/", "tmp", fileName);
    await writeFile(tempPath, imageBuffer);

    // Upload to MinIO
    const result = await uploadToBucket(
      "aceitescnr",
      `${folder}${fileName}`,
      tempPath
    );

    return {
      success: true,
      message: "Image uploaded successfully",
      imageUrl: result.url,
    };
  } catch (error) {
    console.error("Error in uploadImageFromUrl:", error);
    return {
      success: false,
      message: error.message || "Failed to upload image",
      error: error.toString(),
    };
  }
}

// Optional: Generate presigned URL for client-side uploads
export async function generatePresignedUrl(folder, name) {
  try {
    const session = await getServerSession(options);
    if (
      !session?.user?.role ||
      !["manager", "instagram"].includes(session.user.role)
    ) {
      throw new Error("Unauthorized access");
    }

    const filename = folder + name;
    const url = await new Promise((resolve, reject) => {
      mc.presignedPutObject(
        "aceitescnr",
        filename,
        900, // 15 min expiry
        function (err, url) {
          if (err) reject(err);
          else resolve(url);
        }
      );
    });

    return {
      success: true,
      url: url,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Failed to generate presigned URL",
      error: error.toString(),
    };
  }
}
