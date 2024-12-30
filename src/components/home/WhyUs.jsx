"use client";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const items = [
  {
    id: 1,
    color: "from-red-500 to-blue-600",
    title: "POS con",
    titleTwo: "Ecommerce",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.",
    img: "/images/2149416730.jpg",
    imgTwo: "/images/high-angle-hands-holding-paper_23-2149930962.jpg",
    link: "/",
  },
  {
    id: 2,
    color: "from-blue-600 to-violet-700",
    title: "Ecommerce con ",
    titleTwo: "Dropshipping",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.",
    img: "/images/2149416730.jpg",
    imgTwo: "/images/high-angle-hands-holding-paper_23-2149930962.jpg",
    link: "/",
  },
  {
    id: 3,
    color: "from-violet-700 to-teal-500",
    title: "Web App para",
    titleTwo: "Sorteos y loterías",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.",
    img: "/images/2149416730.jpg",
    imgTwo: "/images/high-angle-hands-holding-paper_23-2149930962.jpg",
    link: "/",
  },
  {
    id: 4,
    color: "from-teal-500 to-orange-700",
    title: "Sistema Integral",
    titleTwo: "Automatizado",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.",
    img: "/images/2149416730.jpg",
    imgTwo: "/images/high-angle-hands-holding-paper_23-2149930962.jpg",
    link: "/",
  },
];

const WhyUs = () => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["-20%", "-80%"]);

  return (
    <div
      className="h-[600vh] relative bg-secondary bg-opacity-30  border-t-[20px] border-b-[20px] border-secondary"
      ref={ref}
    >
      <div className="sticky top-0 flex h-screen gap-4 items-center overflow-hidden">
        <motion.div style={{ x }} className="flex">
          <div className="h-[600vh]  w-screen flex items-center justify-center " />
          {items.map((item) => (
            <motion.div
              initial={{ y: "200px", scale: 0.2, opacity: 0.2 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className={`h-[600vh] w-screen flex items-center justify-center  gap-x-4 ${item.color}`}
              key={item.id}
            >
              <div className="relative flex w-1/2 maxmd:w-[80%]  flex-col gap-4 text-gray-800 ">
                <h1 className="text-6xl font-primary maxlg:text-4xl  flex flex-col">
                  <span>{item.title}</span>
                  <span className="text-secondary">{item.titleTwo}</span>
                </h1>
                <div className="w-full h-auto relative">
                  {/* images */}
                  <div className="relative  w-full h-[356px] maxmd:h-[250px] overflow-hidden">
                    {/* main image */}
                    <Image
                      src={item.img}
                      alt="servicio"
                      width={1080}
                      height={1080}
                      className="rounded-sm shadow-lg object-cover shadow-gray-400"
                    />
                  </div>
                  {/* mini image */}
                  <Image
                    src={item.imgTwo}
                    alt="mini servicio"
                    width={500}
                    height={500}
                    className="absolute w-[150px] h-[220px] rounded-sm shadow-md shadow-slate-800 top-5 -right-10 maxmd:-right-5 z-10"
                  />
                </div>

                <p className="font-secondary text-base maxmd:text-sm">
                  {item.desc}
                </p>
                <Link href={item.link} className="flex justify-end">
                  <button className="px-6 py-2 tracking-widest text-sm bg-dark font-secondary text-white  m-4 shadow-lg shadow-gray-400">
                    Ver Demo
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default WhyUs;
