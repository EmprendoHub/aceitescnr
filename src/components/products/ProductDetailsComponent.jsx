"use client";
import { useRef } from "react";
import "./productstyles.css";
import { motion } from "framer-motion";
import { FaCircleXmark, FaWhatsapp } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

const ProductDetailsComponent = ({ data, lang, setShowModal, productDic }) => {
  const months = [
    { es: "Enero", en: "January", value: 1 },
    { es: "Febrero", en: "February", value: 2 },
    { es: "Marzo", en: "March", value: 3 },
    { es: "Abril", en: "April", value: 4 },
    { es: "Mayo", en: "May", value: 5 },
    { es: "Junio", en: "June", value: 6 },
    { es: "Julio", en: "July", value: 7 },
    { es: "Agosto", en: "August", value: 8 },
    { es: "Septiembre", en: "September", value: 9 },
    { es: "Octubre", en: "October", value: 10 },
    { es: "Noviembre", en: "November", value: 11 },
    { es: "Diciembre", en: "December", value: 12 },
  ];

  const product = data;
  const origins = data.origins;
  const slideRef = useRef(null);
  const clickImage = (imageId) => {
    const lists = slideRef.current.children;

    // Find the clicked item using imageId
    const clickedItem = Array.from(lists).find((item) => {
      const itemId = item.getAttribute("data-image-id");
      return itemId === imageId;
    });

    if (clickedItem && lists.length > 1) {
      // Reorder the items in the list
      slideRef.current.insertBefore(clickedItem, slideRef.current.firstChild);
    }
  };

  return (
    <div className="container-class pt-40  ">
      <main className="flex flex-col items-center justify-between w-full">
        <div className="w-[800px] maxmd:w-[400px] maxxsm:w-[300px] mx-auto wrapper-class gap-3 bg-slate-100 dark:bg-primary rounded-lg">
          <div className="flex flex-col items-start justify-start ">
            {/* Left Panel */}

            <div className="relative image-class w-full flex flex-col items-center justify-center">
              <div
                onClick={() => setShowModal(false)}
                className=" absolute z-[888] top-0 right-2 my-2 px-1 py-1 text-center text-white bg-red-700 border border-transparent rounded-full hover:bg-red-800 w-auto flex flex-row items-center justify-center gap-1 cursor-pointer"
              >
                <FaCircleXmark className="text-xl" />
              </div>
              <div className="flex maxmd:flex-col items-start  gap-4 p-2 w-full relative h-full">
                <div
                  className="relative rounded-full w-1/2 maxmd:w-full   "
                  ref={slideRef}
                >
                  {product?.images.map((image, index) => (
                    <div
                      key={image._id}
                      className="ml-5 maxsm:ml-0 mt-5 maxsm:mt-2 relative h-[350px] w-[350px] maxsm:h-[150px] maxsm:w-[150px] overflow-hidden"
                    >
                      <Image
                        src={image.url}
                        alt="producto"
                        width={350}
                        height={350}
                        data-image-id={image._id}
                        onClick={() => clickImage(image._id)}
                        className={` object-cover`}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col pr-3 min-h-[270px] maxmd:min-h-[200px] justify-end">
                  <p className="text-4xl font-semibold font-primary">
                    {product?.title[`${lang}`]}
                  </p>
                  <p className="text-base font-semibold font-primary my-3">
                    {lang === "es" ? "Characteristics" : "Características"}
                  </p>
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="text-sm text-lightText flex flex-col"
                  >
                    <div className="flex items-center justify-start gap-2 mt-2">
                      <p>{productDic.single.packing}:</p>
                      <p className="font-semibold">
                        {product?.packing[`${lang}`]}
                      </p>
                    </div>
                  </motion.div>
                  {/* <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-sm text-lightText flex flex-col"
                  >
                    <div className="flex items-center justify-start  gap-4 mt-2 w-full">
                      <p>{productDic.single.weight}:</p>
                      <p className="font-semibold">
                        {product?.weight[`es`]}
                        <span>{"ml"}</span>
                        {product?.weightTwo ? (
                          <>
                            <span>{product?.weightTwo[`es`]}ml</span>
                          </>
                        ) : (
                          ""
                        )}
                      </p>
                    </div>
                  </motion.div> */}
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.9 }}
                    className="text-sm text-lightText flex flex-col"
                  >
                    <div className="flex items-center justify-start  gap-4 mt-2 w-full">
                      <p>{productDic.single.category}:</p>
                      <p className="font-semibold">
                        {product?.category[`${lang}`]}
                      </p>
                    </div>
                  </motion.div>
                  {/* <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-sm text-lightText flex flex-col"
                  >
                    <div className="flex items-center justify-start gap-4 mt-2 w-full">
                      <p>{productDic.single.types}:</p>
                      <p className="flex flex-wrap items-center text-[14px]">
                        {product?.presentations.map((presentation, index) => (
                          <span key={presentation.value}>
                            {presentation.value}
                            {product.presentations?.length === index + 1
                              ? "."
                              : ","}
                          </span>
                        ))}
                      </p>
                    </div>
                  </motion.div> */}
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    className="text-sm text-lightText flex flex-col"
                  >
                    <div className="flex items-center justify-start  gap-4 mt-2 w-full">
                      <p>{productDic.single.quote}:</p>
                      <p className="flex items-center text-[14px]">
                        <Link
                          href={
                            lang === "es"
                              ? `https://api.whatsapp.com/send/?phone=523931021001&text=Hola+%2AAceites+CNR%2A.+Me+Interesa+cotizar+y+obtener+m%C3%A1s+informaci%C3%B3n+de+${
                                  product?.title[`${lang}`]
                                }&type=phone_number&app_absent=0`
                              : `https://api.whatsapp.com/send/?phone=523931021001&text=Hello+%2AAceites+CNR%2A.+Im+Interested+in+getting+a+quote+and+more+information+on+${
                                  product?.title[`${lang}`]
                                }&type=phone_number&app_absent=0`
                          }
                          target="_blank"
                        >
                          <FaWhatsapp size={30} />
                        </Link>
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailsComponent;
