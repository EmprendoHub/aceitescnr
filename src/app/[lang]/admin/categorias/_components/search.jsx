"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchCategories = ({ search }) => {
  const router = useRouter();
  const initialRender = useRef(true);

  const [text, setText] = useState(search);
  const [query] = useDebounce(text, 750);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (!query) {
      router.push(`/admin/categorias`);
    } else {
      router.push(`/admin/categorias?keyword=${query}`);
    }
  }, [query]);

  return (
    <div className="relative rounded-md shadow-sm w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <FaMagnifyingGlass
          className="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </div>
      <input
        value={text}
        placeholder="Buscar categorías..."
        onChange={(e) => setText(e.target.value)}
        className="block w-full rounded-md border-0 py-1.5 pl-10 maxsm:pl-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
      />
    </div>
  );
};

export default SearchCategories;
