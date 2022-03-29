import React from "react";
import "./spinner.css";
import logo from "./logo.gif";

export default function Loading() {
  return (
    <div className="loading_spinner">
      <span className="sr-only">
        <img src={logo} alt="Italian hand" />
      </span>
    </div>
  );
}
