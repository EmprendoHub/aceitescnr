"use server";
import nodemailer from "nodemailer";
import Distributor from "@/backend/models/Distributor";
import dbConnect from "@/lib/db";
import axios from "axios";
import { getServerSession } from "next-auth";
import crypto from "crypto";
import { options } from "@/app/api/auth/[...nextauth]/options";

export async function addNewDistributor(data) {
  const session = await getServerSession(options);
  const user = { _id: session?.user?._id };
  let { username, phone, honeypot, recaptcha, email } =
    Object.fromEntries(data);

  //check for errors
  username = JSON.parse(username);
  phone = JSON.parse(phone);
  email = JSON.parse(email);
  honeypot = JSON.parse(honeypot);
  recaptcha = JSON.parse(recaptcha);

  //if (error) throw Error(error);
  if (honeypot) {
    console.log("no bots thank you!");
    throw new Error("hubo un error al iniciar session");
  }
  const secretKey = process?.env?.RECAPTCHA_SECRET_KEY;
  const formData = `secret=${secretKey}&response=${recaptcha}`;
  let response;
  try {
    response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  } catch (error) {
    console.log("recaptcha error:", error);
  }

  if (response && response.data?.success && response.data?.score > 0.5) {
    // Save data to the database from here
    await dbConnect();

    const isExistingDistributor = await Distributor?.findOne({
      $or: [{ phone: phone }],
    });

    if (isExistingDistributor) {
      console.log("Distributor is already registered");

      return { message: "Distributor is already registered", status: 400 };
    }
    // Generate a random 64-byte token
    const verificationToken = crypto.randomBytes(64).toString("hex");

    const newDistributor = await Distributor.create({
      name: username,
      phone,
      isActive: true,
    });

    // if (newDistributor?._id) {
    //   try {
    //     const subject = "Confirmar email";
    //     const body = `Por favor da click en confirmar email para verificar tu cuenta.`;
    //     const title = "Completar registro";
    //     const greeting = `Saludos ${username}`;
    //     const action = "CONFIRMAR EMAIL";
    //     const bestRegards = "Gracias por unirte a nuestro sitio.";
    //     const recipient_email = email;
    //     const sender_email = "aceitescnr01@gmail.com";
    //     const fromName = "Aceites CNR";

    //     var transporter = nodemailer.createTransport({
    //       service: "gmail",
    //       auth: {
    //         user: process.env.GOOGLE_MAIL,
    //         pass: process.env.GOOGLE_MAIL_PASS,
    //       },
    //     });

    //     const mailOption = {
    //       from: `"${fromName}" ${sender_email}`,
    //       to: recipient_email,
    //       subject,
    //       html: `
    //       <!DOCTYPE html>
    //       <html lang="es">
    //       <body>
    //       <p>${greeting}</p>
    //       <p>${title}</p>
    //       <div>${body}</div>
    //       <a href="${process.env.NEXTAUTH_URL}/exito?token=${verificationToken}">${action}</a>
    //       <p>${bestRegards}</p>
    //       </body>

    //       </html>

    //       `,
    //     };

    //     await transporter.sendMail(mailOption);

    //     return { message: "Email sent successfully", status: 200 };
    //   } catch (error) {
    //     console.log(error);
    //     return {
    //       message: "Failed to send email",
    //       status: 500,
    //     };
    //   }
    // }

    return {
      message: "New Distributor registered",
      status: 200,
      phone,
      score: response.data?.score,
    };
  } else {
    console.log("fail: res.data?.score:", response.data?.score);
    return {
      status: 500,
      email,
      score: response.data?.score,
    };
  }
}
