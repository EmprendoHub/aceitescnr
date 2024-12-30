import React from "react";
import Image from "next/image";
import SuscribeWrapper from "../forms/SuscribeWrapper";

const ContactSection = ({ params }) => {
  return (
    <div>
      <div className="w-full h-[400px] overflow-hidden">
        <Image
          src={"/images/2149749858.jpg"}
          width={1920}
          height={1080}
          alt="newsletter image"
          className="object-cover h-full w-full"
        />
      </div>
      <SuscribeWrapper params={params} />
    </div>
  );
};

export default ContactSection;
