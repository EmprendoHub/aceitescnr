"use client";
import React, { useState } from "react";
import Image from "next/image";
import { deleteFavorite } from "@/redux/shoppingSlice";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { BiSolidSelectMultiple } from "react-icons/bi";
import Swal from "sweetalert2";

const FavoritesComp = () => {
  //import CartContext and assign to addItemToCart
  const { favoritesData } = useSelector((state) => state?.compras);
  const router = useRouter();
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState(favoritesData);
  const [buttonPressed, setButtonPressed] = useState(false);

  function handleAddToCart(item) {
    setButtonPressed(true);
    dispatch(deleteFavorite(item?._id));

    Swal.fire({
      icon: "success",
      iconColor: "#0D121B",
      background: "#fff5fb",
      color: "#0D121B",
      toast: true,
      text: `Selecciona opciones para agregar al carrito`,
      showConfirmButton: false,
      timer: 2000,
    });
    router.push(`/producto/${item.slug}`);
  }

  return (
    <>
      <section className="py-5 sm:py-7 bg-gray-100">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-2 font-raleway">
            {favorites?.length || 0} Artículos(s) en Favoritos
          </h2>
        </div>
      </section>

      {favorites?.length > 0 && (
        <section className="pb-10 bg-gray-100">
          <div className="container max-w-screen-xl mx-auto bg-white p-5">
            <div className="flex flex-col md:flex-row gap-4">
              <main className="md:w-3/4">
                <article className="border border-gray-200  shadow-sm rounded mb-5 p-3 lg:p-5">
                  {favorites?.map((item, index) => (
                    <div key={index}>
                      <div className="flex flex-wrap lg:flex-row gap-5  mb-4 items-center">
                        <div className="w-full lg:w-2/5 xl:w-2/4">
                          <figure className="flex leading-5">
                            <div>
                              <div className="block w-16 h-16 rounded border border-gray-200 overflow-hidden">
                                <Image
                                  src={item?.images[0].url}
                                  alt="Title"
                                  width={100}
                                  height={100}
                                />
                              </div>
                            </div>
                            <figcaption className="ml-3">
                              <p>
                                <a
                                  href={`/producto/${item?._id}`}
                                  className="hover:text-blue-600"
                                >
                                  {item?.title}
                                </a>
                              </p>
                              <p className="mt-1 text-gray-400">
                                {" "}
                                Marca: {item?.brand}
                              </p>
                            </figcaption>
                          </figure>
                        </div>
                        <div>
                          <div className="leading-5">
                            <p className="font-semibold not-italic">
                              ${item?.price}
                            </p>
                            <p className="font-normal not-italic">
                              existencias: {item?.stock}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center group">
                          {/* add to cart button */}
                          {item?.stock <= 0 ? (
                            <span className="  border-[1px] border-black font-medium text-xl py-1 px-3 rounded-sm bg-black text-slate-100 font-raleway">
                              SOLD OUT
                            </span>
                          ) : (
                            <button
                              disabled={buttonPressed}
                              className={`bg-gold-gradient border border-black drop-shadow-md flex flex-row items-center justify-between pl-2 text-sm gap-x-4 rounded-md  bg-fourth hover:bg-gray-300 text-white ease-in-out  duration-300 hover:scale-105  tracking-wider px-3   ${
                                buttonPressed
                                  ? "cursor-not-allowed"
                                  : "cursor-pointer"
                              }`}
                              onClick={() => handleAddToCart(item)}
                            >
                              <span className="text-sm text-slate-100 flex items-center justify-center group-hover:bg-gray-300 group-hover:text-slate-600 duration-200  rounded-full py-2">
                                <BiSolidSelectMultiple />
                              </span>
                            </button>
                          )}
                        </div>
                        <div className="flex-auto">
                          <div className="float-right">
                            <span
                              onClick={() =>
                                dispatch(deleteFavorite(item?._id))
                              }
                              className="text.lg hover:text-red-600 cursor-pointer duration-300"
                            >
                              <AiOutlineClose />
                            </span>
                          </div>
                        </div>
                      </div>

                      <hr className="my-4" />
                    </div>
                  ))}
                </article>
              </main>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default FavoritesComp;
