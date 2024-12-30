import Image from "next/image";
import React from "react";

const MainSliderItems = ({ item, index }) => {
  return (
    <div className="relative w-full h-full">
      <Image
        src={item.imgPath}
        alt="cover imagen"
        priority
        loading="eager"
        fill
        sizes="100vw"
        style={{ objectFit: "cover" }}
        className="w-full h-full"
      />
    </div>
  );
};

export default MainSliderItems;
