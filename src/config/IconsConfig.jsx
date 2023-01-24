import { AiFillCar, AiOutlineMonitor, AiOutlineCar, AiOutlineSmile, AiTwotoneCar } from "react-icons/ai";
import { GiEdgeCrack, GiFishingJig } from "react-icons/gi";
import { SiPhotocrowd } from "react-icons/si";
import React, { Fragment } from "react";
const IconsConfig = ({ name = "" }) => {
  function switchIcon(name) {
    switch (name) {
      case "AiFillCar":
        return <AiFillCar size={25} />;
      case "GiEdgeCrack":
        return <GiEdgeCrack size={25} />;
      case "AiOutlineMonitor":
        return <AiOutlineMonitor size={25} />;
      case "GiFishingJig":
        return <GiFishingJig size={25} />;
      case "AiOutlineCar":
        return <AiOutlineCar size={25} />;
      case "AiOutlineSmile":
        return <AiOutlineSmile size={25} />;
      case "AiTwotoneCar":
        return <AiTwotoneCar size={25} />;
      case "SiPhotocrowd":
        return <SiPhotocrowd size={25} />;
    }
  }
  return <Fragment>{switchIcon(name)}</Fragment>;
};

export default IconsConfig;
