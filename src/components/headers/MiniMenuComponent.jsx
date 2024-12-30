"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { IoMdCart, IoMdHeart } from "react-icons/io";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { useSession, signOut } from "next-auth/react";
import { useSelector } from "react-redux";
import FormattedPrice from "@/backend/helpers/FormattedPrice";
import { useState, useEffect } from "react";
import AuthContext from "@/context/AuthContext";
import Image from "next/image";
import { IoQrCode } from "react-icons/io5";
import { usePathname } from "next/navigation";

const MiniMenuComponent = () => {
  const pathname = usePathname();
  let currentPath;
  if (pathname.includes("admin")) {
    currentPath = "/admin/pos";
  } else {
    currentPath = "/puntodeventa";
  }
  const { data: session } = useSession();
  const { setUser } = useContext(AuthContext);
  useEffect(() => {
    if (session) {
      setUser(session?.user);
    }
  }, [session, setUser]);

  const isLoggedIn = Boolean(session?.user);

  const { productsData, favoritesData, emailListData, qrListData } =
    useSelector((state) => state.compras);

  const [totalCartAmt, setTotalCartAmt] = useState(0);

  useEffect(() => {
    let amt = 0;
    productsData.map((item) => {
      amt += item.price * item.quantity;
      return;
    });
    setTotalCartAmt(amt);
  }, [productsData]);

  return (
    <div className="self-stretch flex flex-row px-1 box-border items-center justify-end w-2/12 ml-10">
      <nav
        className={`m-0  flex flex-row pr-5 items-center  justify-end gap-x-3 font-poppins text-sm tracking-widest`}
      >
        {/* Admin */}
        {isLoggedIn && session?.user.role === "manager" ? (
          <>
            <Link href={"/admin"} className="w-6 h-6">
              {session?.user?.image ? (
                <Image
                  className="w-6 h-6 rounded-full "
                  src={
                    session?.user?.image ? session?.user?.image : "/next.svg"
                  }
                  alt={session?.user?.name ? session?.user?.name : "avatar"}
                  width={50}
                  height={50}
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center uppercase text-xl font-raleway">
                  {session?.user?.email.substring(0, 1)}
                </div>
              )}
            </Link>
          </>
        ) : (
          isLoggedIn && (
            <>
              <Link href={"/perfil"} className="w-6 h-6">
                {session?.user?.image ? (
                  <Image
                    className="w-6 h-6 rounded-full "
                    src={
                      session?.user?.image ? session?.user?.image : "/next.svg"
                    }
                    alt={session?.user?.name ? session?.user?.name : "avatar"}
                    width={50}
                    height={50}
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full  bg-black text-white flex items-center justify-center uppercase text-xl font-raleway">
                    {session?.user?.email.substring(0, 1)}
                  </div>
                )}
              </Link>
            </>
          )
        )}

        {/* Cart Button */}
        {productsData?.length > 0 && session?.user?.role != "manager" ? (
          <div className="flex items-center gap-x-3">
            <Link href={"/carrito"}>
              <div className="rounded-full text-slate-800  flex items-center justify-center  cursor-pointer">
                <IoMdCart className="text-lg" />
                <span className="bg-white text-black rounded-full font-bold text-xs relative  -top-2 flex items-center justify-center w-4 h-5 shadow-xl p-0">
                  {productsData ? productsData?.length : 0}
                </span>
              </div>
            </Link>
          </div>
        ) : (
          ""
        )}
        {(isLoggedIn &&
          qrListData?.length > 0 &&
          session?.user?.role === "sucursal") ||
        session?.user?.role === "manager" ? (
          <Link href={`${currentPath}/qr/generador`}>
            <div className="  flex items-center justify-center  ease-in-out duration-300 cursor-pointer">
              <IoQrCode className="text-base" />
              <span className="bg-white text-black rounded-full font-bold text-xs relative  -top-2 flex items-center justify-center w-4 h-5 shadow-xl ">
                {qrListData ? qrListData?.length : 0}
              </span>
            </div>
          </Link>
        ) : (
          ""
        )}
        {favoritesData &&
          favoritesData?.length > 0 &&
          session?.user?.role != "manager" && (
            <Link href={"/perfil/favoritos"}>
              <div className="  flex items-center justify-center  ease-in-out duration-300 cursor-pointer">
                <IoMdHeart className="text-base" />
                <span className="bg-white text-black rounded-full font-bold text-xs relative  -top-2 flex items-center justify-center w-4 h-5 shadow-xl ">
                  {favoritesData ? favoritesData?.length : 0}
                </span>
              </div>
            </Link>
          )}
        {/*  Emails Button */}
        {isLoggedIn &&
        session?.user?.role === "manager" &&
        emailListData?.length > 0 ? (
          <Link href={"/admin/correos"}>
            <div className="bg-gray-100 hover:bg-slate-100 rounded-full text-slate-800 hover:text-black relative flex items-center justify-center gap-x-1  border-[1px]  border-gray-100  ease-in-out duration-300 cursor-pointer">
              <AiOutlineMail className="text-xl absolute" />
              <span className="bg-white text-black rounded-full font-bold text-xs relative -right-2 -top-2 flex items-center justify-center w-3 h-3 shadow-xl ">
                {emailListData ? emailListData?.length : 0}
              </span>
            </div>
          </Link>
        ) : (
          ""
        )}
      </nav>
    </div>
  );
};

export default MiniMenuComponent;
