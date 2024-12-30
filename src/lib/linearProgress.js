import React from "react";

import "./barstyles.scss"; // Ensure you import your CSS styles

export function LinearProgressWithLabel({ value }) {
  return (
    <div className="progressContainer">
      <div className="progressBar">
        <div
          className="progressFill"
          style={{ width: `${Math.round(value)}%` }}
        ></div>
      </div>
      <div className="progressText">{`${Math.round(value)}%`}</div>
    </div>
  );
}

export default function LinearWithValueLabel({ progress, totalNo }) {
  const value = (progress / totalNo) * 100;

  return (
    <div style={{ width: "100%" }}>
      <LinearProgressWithLabel value={value} />
    </div>
  );
}
