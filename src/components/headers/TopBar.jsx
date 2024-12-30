"use client";
import React from "react";
import Link from "next/link";
import { AiOutlineLogout } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";
import { MdAttachEmail } from "react-icons/md";

const TopBar = ({ session, lang }) => {
  const { emailListData } = useSelector((state) => state.compras);

  return (
    <div className="w-full h-full flex justify-between items-center text-white bg-dark dark:bg-black dark:bg-opacity-50 p-1 px-3">
      {/* User Profile */}
      <div className=" ease-in-out hover:scale-105 duration-300">
        {session?.user.role === "manager" ? (
          <>
            <Link href={`/${lang}/admin`}>
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
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center uppercase text-xl font-primary">
                  {session?.user?.email.substring(0, 1)}
                </div>
              )}
            </Link>
          </>
        ) : session?.user?.role === "afiliado" ? (
          <>
            <Link href={`/${lang}/afiliado`}>
              {session?.user?.image ? (
                <Image
                  className="w-6 h-6 rounded-full "
                  src={session?.user?.image}
                  alt={"avatar"}
                  width={50}
                  height={50}
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center uppercase text-xl font-primary">
                  {session?.user?.email.substring(0, 1)}
                </div>
              )}
            </Link>
          </>
        ) : (
          <>
            <Link href={`/${lang}/perfil`}>
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
                <div className="  flex items-center justify-center cursor-pointer text-popSecondary  hover:text-popPrimary hover:scale-105 ease-in-out duration-300">
                  <FaUser className="text-lg" />
                </div>
              )}
            </Link>
          </>
        )}
      </div>
      {/* right bar */}
      <div className="flex items-center gap-3">
        {/*  Emails Button */}
        {session?.user.role === "manager" && emailListData?.length > 0 && (
          <Link href={`/${lang}/admin/correos`}>
            <div className="  flex items-end justify-center cursor-pointer text-white">
              <MdAttachEmail className="text-base absolute" />
              <span className=" text-xs relative -right-3 -top-2 flex items-center justify-center w-4 h-5  ">
                {emailListData ? emailListData?.length : 0}
              </span>
            </div>
          </Link>
        )}
        {/* Logout */}
        <div
          onClick={() => signOut()}
          className="pt-1 cursor-pointer flex justify-center items-center gap-x-1 "
        >
          <AiOutlineLogout className="text-base flex text-white" />
          {/* <p className='text-sm font-semibold'>Logout</p> */}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
