"use client";
import Image from "next/image";
import React, { useState } from "react";
import "./styles.css";

const FlipBoxComp = ({ data }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <div className="card">
      <div
        className={`card__inner ${isFlipped ? "is-flipped" : ""}`}
        onClick={handleClick}
      >
        <div className="card__face card__face--front flex-col flex items-center">
          <h2>{data?.preTitle}</h2>
          <p>saber mas...</p>
        </div>
        <div className="card__face card__face--back">
          <div className="card__content">
            <div className="card__header">
              <Image
                alt="Flip box"
                src={data?.img || "/images/beach_bonus.jpg"}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
              <h2>{data?.title}</h2>
            </div>
            <div className="card__body">
              <p>{data?.subTitle}</p>
              <p>{data?.text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipBoxComp;
