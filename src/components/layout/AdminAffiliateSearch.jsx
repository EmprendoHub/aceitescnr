'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const AdminAffiliateSearch = () => {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword) {
      router.push(`/admin/asociados/?keyword=${keyword}`);
    } else {
      router.push('/admin/asociados');
    }
  };
  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-nowrap items-center w-full order-last maxmd:order-none my-5 maxmd:mt-0 maxmd:w-2/4 lg:w-2/4"
    >
      <input
        className="flex-grow appearance-none border border-gray-200 bg-gray-100 rounded-md mr-2 py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 text-black"
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

export default AdminAffiliateSearch;
