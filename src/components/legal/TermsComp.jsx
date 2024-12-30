import Link from "next/link";
import React from "react";
import { FaCircle } from "react-icons/fa6";

const TermsComp = ({ termsDic }) => {
  return (
    <div className="w-full h-full py-16 px-5 bg-dark dark:bg-slate-700">
      <div className="flex flex-col items-start justify-start h-full py-14 px-10 maxmd:px-5 bg-white  dark:bg-primary">
        <div className="section-div">
          <h2 className=" font-primary text-3xl mb-2">{termsDic.title}</h2>
          <p className="text-sm font-secondary"> {termsDic.summary}</p>
        </div>
        {termsDic.textArray.map((item, index) => (
          <div key={item.section.title + toString(index)} className=" my-3">
            <h2 className=" font-primary text-2xl mb-2">
              {item.section.title}
            </h2>

            {item?.section?.text && (
              <p className="text-sm font-secondary mb-2">
                {" "}
                {item.section?.text}
              </p>
            )}

            {item.section.textTwo && (
              <p className="text-sm font-secondary mb-2">
                {" "}
                {item.section?.textTwo}
              </p>
            )}
            {item.section.textThree && (
              <p className="text-sm font-secondary mb-2">
                {" "}
                {item.section?.textThree}
              </p>
            )}
            {item.section.textFour && (
              <p className="text-sm font-secondary mb-2">
                {" "}
                {item.section?.textFour}
              </p>
            )}
            {item.section.textFive && (
              <p className="text-sm font-secondary mb-2">
                {" "}
                {item.section?.textFive}
              </p>
            )}
            {item.section.textSix && (
              <p className="text-sm font-secondary mb-2">
                {" "}
                {item.section?.textSix}
              </p>
            )}
            {item.section.textSeven && (
              <p className="text-sm font-secondary mb-2">
                {" "}
                {item.section?.textSeven}
              </p>
            )}
            <ol className="mb-2">
              {item.section.bullets.map((bullet) => (
                <li key={bullet.name}>
                  {bullet.path ? (
                    <Link
                      target="_blank"
                      href={bullet.path}
                      className="flex items-center gap-x-1"
                    >
                      <FaCircle size={8} /> {bullet.name}
                    </Link>
                  ) : bullet.name ? (
                    <p className="flex items-center gap-x-1">
                      <FaCircle size={8} />
                      {bullet.name}
                    </p>
                  ) : (
                    ""
                  )}
                </li>
              ))}
            </ol>
            {item.section.textEight && (
              <p className="text-sm font-secondary mb-2">
                {" "}
                {item.section?.textEight}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermsComp;
