"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const POSProductSearch = () => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword) {
      if (pathname.includes("admin")) {
        router.push(`/admin/pos/servicios/?keyword=${keyword}`);
      } else {
        router.push(`/puntodeventa/servicios/?keyword=${keyword}`);
      }
    } else {
      if (pathname.includes("admin")) {
        router.push("/admin/pos/servicios");
      } else {
        router.push("/puntodeventa/servicios");
      }
    }
  };
  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-nowrap items-center w-full order-last maxmd:order-none my-5 maxmd:mt-0 maxmd:w-2/4 lg:w-2/4"
    >
      <input
        className="flex-grow text-black appearance-none border border-gray-200 bg-gray-100 rounded-md mr-2 py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400"
        type="text"
        placeholder="búsqueda"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button
        type="button"
        className="px-4 py-2 inline-block text-white border border-transparent  rounded-md bg-black"
        onClick={submitHandler}
      >
        Buscar
      </button>
    </form>
  );
};

export default POSProductSearch;
