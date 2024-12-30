import Image from 'next/image';
import React from 'react';

const ImageFlipBoxComp = ({ data }) => {
  return (
    <div className="w-[350px] h-[590px] bg-transparent cursor-pointer group rounded-3xl perspective-1000">
      <div className="relative w-full h-full preserve-3d group-hover:rotate-y-180 duration-500">
        <div className="w-full h-full absolute rounded-3xl overflow-hidden z-50"></div>
        <div className="w-full h-full absolute rounded-3xl overflow-hidden">
          <Image
            alt="Flip box"
            src={data?.img || '/images/beach_bonus.jpg'}
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute rotate-y-180 w-full h-full bg-[#0F1823] bg-opacity-70 rounded-3xl overflow-hidden p-10 text-neutral-300 space-y-5 backface-hidden">
          <div>
            <span className="font-bold text-3xl uppercase">
              {data?.preTitle}
            </span>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="font-semibold uppercase">{data?.title}</span>
            <span className="text-3xl font-bold uppercase">
              {data?.subTitle}
            </span>
          </div>
          <div className="flex flex-col space-y-5">
            <span className="font-bold">{data?.textTitle}</span>
            <span>{data?.text}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageFlipBoxComp;
