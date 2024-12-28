import React from "react";
import "./Star.css";

export function Stars() {
  return (
    <button
      type="button"
      className="
    rounded-xl
    lg:w-60 lg:m-auto 
    xl:m-0 xl:w-full"
    >
      <strong>PRIZE</strong>
      <div id="container-stars">
        <div id="stars"></div>
      </div>

      <div id="glow">
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </button>
  );
}
