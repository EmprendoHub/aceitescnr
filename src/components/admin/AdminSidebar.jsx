"use client";
import Image from "next/image";
import Link from "next/link";
import React, { createContext, useContext, useState } from "react";
import { BsChevronBarLeft, BsChevronBarRight } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const SidebarContext = createContext();
const backdropVariants = {
  animate: { opacity: 1, scale: 1 },
  initial: { opacity: 0, scale: 0.5 },
  duration: { duration: 1.5 },
};

const AdminSidebar = ({ children }) => {
  const [expandSidebar, setExpandSidebar] = useState(false);
  let user;
  const { data: session } = useSession();
  const isLoggedIn = Boolean(session?.user);
  if (isLoggedIn) {
    user = session?.user;
  }
  return (
    <aside className="h-screen print:hidden ">
      <nav className="h-full flex flex-col shadow-sm dark:shadow-light">
        <div className="pt-2 flex justify-center items-center">
          <Image
            alt="image"
            src={"/images/new_emprendomex_logo_horizontal.png"}
            width={180}
            height={55}
            priority
            className={`overflow-hidden transition-all ease-in-out ${
              expandSidebar ? "w-36 h-auto maxmd:ml-1" : "w-0 h-0"
            } dark:hidden`}
          />
          <Image
            alt="image"
            src={"/images/new_emprendomex_logo_horizontal_white.png"}
            width={180}
            height={55}
            priority
            className={`overflow-hidden transition-all ease-in-out ${
              expandSidebar ? "w-36 h-aut maxmd:ml-1" : "w-0 h-0"
            } hidden dark:block`}
          />
          <button
            onClick={() => setExpandSidebar((currentState) => !currentState)}
            className="p-1.5 rounded-lg "
          >
            {expandSidebar ? (
              <BsChevronBarLeft size={20} />
            ) : (
              <BsChevronBarRight size={20} />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ expandSidebar }}>
          <ul className="flex-1 ">{children}</ul>
        </SidebarContext.Provider>
        {/* user avatar */}
        <div
          onClick={() => setExpandSidebar((currentState) => !currentState)}
          className=" flex p-1 "
        >
          <Image
            alt={user?.name ? user?.name : "avatar"}
            src={user?.image ? user?.image : "/images/avatar_placeholder.jpg"}
            width={150}
            height={150}
            className="w-8 h-8 rounded-full cursor-pointer"
          />

          <div
            className={`flex items-center overflow-hidden transition-all ease-in-out  ${
              expandSidebar ? "w-full ml-3 maxmd:ml-1" : "w-0"
            }`}
          >
            <div className="leading-4 w-full">
              <div className="flex items-center">
                <h4 className="font-semibold text-xs leading-4 text-wrap w-2/3 ">
                  {user?.name}
                </h4>
                <div
                  className=" rounded-md cursor-pointer"
                  onClick={() => signOut()}
                >
                  <div
                    className={`${
                      expandSidebar ? "group absolute w-32" : "w-0"
                    }`}
                  >
                    <FiLogOut />
                    <span className="absolute -top-10 scale-0 transition-all rounded p-2 text-xs text-white group-hover:scale-100 z-50">
                      Cerrar Session!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;

export function SideBarItem({ icon, text, active, alert, url, dropdownItems }) {
  const { expandSidebar } = useContext(SidebarContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const handleDropdownToggle = () => {
    if (dropdownItems) {
      setDropdownOpen(!dropdownOpen);
    } else {
      // If no dropdown items, navigate to the URL directly
      router.push(url);
    }
  };

  return (
    <li
      className={`relative flex flex-col items-center justify-center h-8 my-2 mx-1 font-medium rounded-md cursor-pointer gap-x-1 transition-colors group ${
        active === "true"
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-secondary"
          : "hover:text-secondary dark:text-gray-200 text-gray-600"
      } ${expandSidebar ? " pl-2" : "w-8"}`}
      onClick={handleDropdownToggle}
    >
      <div className="flex h-full">
        <span className="flex flex-col justify-center items-center h-full ">
          {icon}
        </span>
        <span
          className={`flex text-xs justify-between items-center overflow-hidden transition-all ease-in-out  ${
            expandSidebar ? " w-36 ml-2  maxmd:w-36 maxmd:ml-1" : "w-0"
          }`}
        >
          {text}
        </span>

        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 text-xs bg-secondary rounded-full ${
              expandSidebar ? "" : "top-2"
            }`}
          />
        )}
      </div>

      {/* Render dropdown items if dropdown is open */}
      {dropdownOpen && dropdownItems && (
        <motion.ul
          variants={backdropVariants}
          initial="initial"
          animate="animate"
          className="relative flex flex-col mt-1 w-full bg-white"
        >
          {dropdownItems.map((item, index) => (
            <Link href={item.url} key={index}>
              <li
                className={`py-2 text-xs cursor-pointer flex items-center rounded-md ${
                  item.active
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-secondary"
                    : "hover:bg-indigo-50 text-gray-600 bg-opacity-0"
                }`}
              >
                {item.icon && item.icon}
                <span
                  className={`flex justify-between items-center overflow-hidden transition-all ease-in-out  ${
                    expandSidebar ? " w-36 ml-2  maxmd:w-36 maxmd:ml-1" : "w-0"
                  }`}
                >
                  {item.text}
                </span>
                {!expandSidebar && (
                  <div className="absolute z-50 left-full rounded-md px-2 py-1 ml-0 bg-indigo-100 text-[10px] text-secondary invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
                    {item.text}
                  </div>
                )}
              </li>
            </Link>
          ))}
        </motion.ul>
      )}

      {!expandSidebar && (
        <div className="absolute z-50 left-full rounded-md px-2 py-1 ml-0 bg-indigo-100 text-secondary text-[12px] invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
          {text}
        </div>
      )}
    </li>
  );
}
