"use client";
import "./styles.scss";
import Link from "next/link";
import * as FaIcons from "react-icons/fa6";

const ThreeDFlipBoxComp = ({ data, className, classNameBack }) => {
  const IconComponent = FaIcons[data.icon];
  return (
    <div className="flip-card m-4 maxlg:mx-2 maxmd:mx-1 maxsm:my-2 ">
      <div className="flip-card-front  w-[340px] maxxxs:w-[300px] min-h-[340px] ">
        <div className="inner p-5 maxmd:p-3 flex flex-col justify-center items-center  text-white">
          {IconComponent && (
            <IconComponent className="text-4xl mb-3 text-primary dark:text-white" />
          )}
          <h3 className="text-2xl text-white dark:text-primary">
            {data?.title}
          </h3>
          <p>{data?.text}</p>
        </div>
        <div className={className} />
      </div>
      <div className="flip-card-back w-[340px] maxxxs:w-[300px] min-h-[340px]  ">
        <div className="inner p-5 maxsm:p-5 flex flex-col justify-center items-center">
          {IconComponent && (
            <IconComponent className="text-4xl mb-3 text-white" />
          )}
          <h3 className="text-white text-4xl">{data?.titleTwo}</h3>
          <p className="text-white ">{data?.textTwo}</p>
        </div>
        <div className={classNameBack} />
      </div>
    </div>
  );
};

export default ThreeDFlipBoxComp;
