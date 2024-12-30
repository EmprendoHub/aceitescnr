"use client";
import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import MobileFilterComponet from "./MobileFilterComponet";
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
    <section className=" flex flex-col justify-center items-center">
      <div className=" mx-auto flex justify-center items-center w-full">
        <div className="flex maxsm:flex-col flex-row  w-full">
          <div className=" maxmd:w-full justify-center items-center gap-x-5">
            <main className="justify-center grid grid-cols-8 maxxlg:grid-cols-6 maxlg:grid-cols-5 maxmd:grid-cols-3 maxsm:grid-cols-2  maxxsm:grid-cols-1 gap-8 maxmd:gap-3 ">
              {products?.map((product, index) => (
                <ProductCard
                  item={product}
                  key={index}
                  lang={lang}
                  productDic={productDic}
                />
              ))}
            </main>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListProducts;
