import Image from "next/image";
import React from "react";

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="mb-5 px-40 maxlg:px-10 maxmd:px-5 min-h-full overflow-hidden">
      <div className="flex maxmd:flex-col gap-x-5">
        <Image
          src={testimonial.icon}
          width={400}
          height={400}
          alt="avatar"
          className="rounded-full w-16 h-16"
        />
        <div className="flex flex-col items-start justify-center">
          <blockquote className="text-xl maxmd:text-base font-secondary italic mb-4">
            <span>
              <span className="text-2xl  font-bold">{'"'}</span>
              {testimonial.text}
            </span>
            <span className="text-secondary font-semibold px-2">
              {testimonial.textPop}
            </span>
            <span>
              {testimonial.textTwo}
              <span className="text-2xl font-bold">{'"'}</span>
            </span>
          </blockquote>
          <p className="font-semibold">{testimonial.name}</p>
          <p className="opacity-50">{testimonial.position}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
