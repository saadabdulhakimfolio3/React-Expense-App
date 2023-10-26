import React from "react";

import NavBar from "./NavBar";

import { Routes, Route } from "react-router-dom";

export default function Dashboard() {
  return (
    <div
      style={{
        backgroundColor: "#e0e0e0",
        minHeight: "100vh",
        overflow: "hidden",
        backgroundRepeat: "repeat-y",
      }}
    >
      <NavBar />
    </div>
  );
}
