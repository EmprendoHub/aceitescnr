"use client";
import { useRef } from "react";
import "./productstyles.css";
import { motion } from "framer-motion";
import { FaCircleXmark, FaWhatsapp } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

const ProductDetailsComponent = ({ data, lang, setShowModal, productDic }) => {
  const product = data;
  console.log(product);
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
    <div className="container-class pt-20  maxsm:pt-2">
      <main className="flex flex-col items-center justify-between w-full">
        <div className="w-[800px] maxmd:w-[600px] maxsm:w-[450px] maxxsm:w-[300px] mx-auto wrapper-class gap-3 maxsm:gap-1 bg-slate-100 dark:bg-primary rounded-lg">
          <div className="flex flex-col items-start justify-start ">
            {/* Left Panel */}

            <div className="relative image-class w-full flex flex-col items-center justify-center p-5 maxsm:p-2">
              <div
                onClick={() => setShowModal(false)}
                className=" absolute z-[888] top-2 right-4 my-2 px-1 py-1 text-center text-white bg-red-700 border border-transparent rounded-full hover:bg-red-800 w-auto flex flex-row items-center justify-center gap-1 cursor-pointer"
              >
                <FaCircleXmark className="text-xl" />
              </div>
              {/* top section */}

              <div className="flex  items-start  gap-1 w-full relative h-auto">
                <div className="relative w-1/2  h-auto">
                  {product?.images.map((image, index) => (
                    <div
                      key={image._id}
                      className="ml-5 maxsm:ml-0 mt-5 maxsm:mt-2 relative h-[300px] w-[300px] maxsm:h-[150px] maxsm:w-[150px] overflow-hidden"
                    >
                      <Image
                        src={image.url}
                        alt="producto"
                        width={350}
                        height={350}
                        data-image-id={image._id}
                        onClick={() => clickImage(image._id)}
                        className={`w-auto h-auto`}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col pr-3 w-1/2 maxsm:w-full justify-end">
                  <p className="text-2xl font-semibold font-primary">
                    {product?.title[`${lang}`]}
                  </p>
                  <p className="text-base font-semibold font-primary mt-2">
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

                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.9 }}
                    className="text-sm text-lightText flex flex-col"
                  >
                    <div className="flex items-center justify-start  gap-4 mt-2 w-full">
                      <p>{productDic.single.category}:</p>
                      <p className="font-semibold">
                        {product?.category?.name[`${lang}`]}
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-sm text-lightText flex flex-col maxsm:hidden"
                  >
                    <div className="flex flex-col items-start justify-start  gap-1 mt-2 w-full">
                      <p>Detalle:</p>
                      <p className="font-normal text-xs">
                        {product?.category?.summary[`${lang}`]}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
              {/* bottom section */}
              <div className="flex maxsm:flex-col items-start  gap-1 px-2 w-full relative h-auto">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="text-sm text-lightText  maxsm:flex  maxsm:flex-col  hidden"
                >
                  <div className="font-normal text-xs maxsm:text-[11px] mt-2">
                    <span className="font-semibold">Detalle: </span>
                    {product?.category?.summary[`${lang}`]}
                  </div>
                </motion.div>
                <div className="relative flex flex-col w-1/2 maxsm:w-full   ">
                  <p className="text-base font-semibold font-primary mt-1">
                    {lang === "es" ? "Ficha Técnica" : "Technical data sheet"}{" "}
                    {lang === "es" ? "Características:" : "Characteristics:"}
                  </p>
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="text-sm  text-lightText flex flex-col"
                  >
                    <div className="flex flex-col items-start justify-start gap-1 mt-2">
                      <div className="overflow-x-auto w-full">
                        <table className="font-normal text-[12px] maxsm:text-[10px] border-collapse border border-gray-300 w-full">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="px-.5 border border-gray-300">
                                {lang === "es" ? "Prueba" : "Test"}
                              </th>
                              <th className="px-.5 border border-gray-300">
                                {lang === "es" ? "Método" : "Method"}
                              </th>
                              <th className="px-.5 border border-gray-300">
                                {lang === "es"
                                  ? "Valor Típico"
                                  : "Typical Value"}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {product?.category?.characteristics.map(
                              (characteristic, index) => (
                                <tr
                                  key={characteristic._id}
                                  className={
                                    index % 2 === 0 ? "bg-gray-50" : ""
                                  }
                                >
                                  <td className="px-0.5 border border-gray-300">
                                    {characteristic.test[lang]}
                                  </td>
                                  <td className="px-0.5 border border-gray-300">
                                    {characteristic.method[lang]}
                                  </td>
                                  <td className="px-0.5 border border-gray-300">
                                    {characteristic.typicalValue?.[lang] || "-"}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                </div>
                <div className="flex flex-col pr-3 h-auto justify-end w-1/2 maxsm:w-full">
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="text-sm text-lightText flex flex-col"
                  >
                    <div className="font-normal text-xs maxsm:text-[11px] mt-2">
                      <span className="font-semibold">
                        {lang === "es" ? "Beneficios: " : "Benefits: "}{" "}
                      </span>
                      {product?.category?.benefits[`${lang}`]}
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="text-sm text-lightText flex flex-col"
                  >
                    <div className="font-normal text-xs maxsm:text-[11px] mt-2">
                      <span className="font-semibold">
                        {lang === "es" ? "Precauciones:" : "Precautions:"}
                      </span>
                      {product?.category?.precautions[`${lang}`]}
                    </div>
                  </motion.div>

                  <div className="flex items-center justify-between">
                    {product?.category?.images.map((image, index) => (
                      <div
                        key={image._id}
                        className="ml-5 maxsm:ml-0 mt-5 maxsm:mt-2 relative h-auto overflow-hidden"
                      >
                        <Image
                          src={image.url}
                          alt="producto"
                          width={350}
                          height={350}
                          data-image-id={image._id}
                          onClick={() => clickImage(image._id)}
                          className={`w-40 h-auto`}
                        />
                      </div>
                    ))}
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1.2 }}
                      className="text-sm text-lightText flex flex-col"
                    >
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
                          <FaWhatsapp size={60} />
                        </Link>
                      </p>
                    </motion.div>
                  </div>
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
