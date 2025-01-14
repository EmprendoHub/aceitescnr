"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";

const Search = ({ SetIsActive, lang }) => {
  const searParams = useSearchParams();
  const key = searParams.get("keyword");
  const [keyword, setKeyword] = useState(key);
  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    SetIsActive(false);
    if (keyword) {
      router.push(`/productos/?keyword=${keyword}`);
    } else {
      router.push("/productos");
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex gap-1 items-center w-auto ">
      <input
        className="flex-grow text-black appearance-none border border-gray-200 bg-gray-100 rounded-md mr-2 py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-[95%]"
        type="text"
        placeholder={lang === "es" ? " Palabra clave" : " Keyword"}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button
        type="button"
        className="px-4 py-2 inline-block text-white border border-transparent  rounded-md bg-black w-auto"
        onClick={submitHandler}
      >
        <BiSearch />
      </button>
    </form>
  );
};

export default Search;
