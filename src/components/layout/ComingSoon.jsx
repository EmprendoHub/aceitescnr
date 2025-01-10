import React from "react";
import Image from "next/image";

const ComingSoon = () => {
  return (
    <div className="w-full bg-gradient bg-gradient-to-br from-violet-950 to-blue-700 min-h-screen flex flex-col items-center justify-center">
      <Image
        alt={"Aceites CNR"}
        src={"/logos/newlogocnr.webp"}
        width={150}
        height={150}
      />
      <p className="text-2xl text-white">Muy pronto...</p>
    </div>
  );
};

export default ComingSoon;
