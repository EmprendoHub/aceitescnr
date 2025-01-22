"use client";
import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ListProducts = ({ lang, products, productDic }) => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.role === "manager") {
      router.push(`/${lang}/admin`);
    }
  }, [session?.user?.role]);

  return (
    <main className="justify-center grid grid-cols-8 maxxlg:grid-cols-6 maxlg:grid-cols-5 maxmd:grid-cols-3 maxsm:grid-cols-2  maxxsm:grid-cols-2 gap-8 maxmd:gap-3 ">
      {products?.map((product, index) => (
        <ProductCard
          item={product}
          key={index}
          lang={lang}
          productDic={productDic}
        />
      ))}
    </main>
  );
};

export default ListProducts;
