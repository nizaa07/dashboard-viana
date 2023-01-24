import React, { Fragment } from "react";
import Home from "../pages/Home";
import Sub from "../pages/Sub";

function Pages({ name = "" }) {
  function switchRoute(name) {
    switch (name) {
      case "Home":
        return <Home />;
      case "Sub":
        return <Sub />;
    }
  }
  return <Fragment>{switchRoute(name)}</Fragment>;
}

export default Pages;
