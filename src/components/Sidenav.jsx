import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import PageRoutes from "../config/PageRoutes.json";
import IconsConfig from "../config/IconsConfig";
import LivinglabIcon from "../assets/favicon.png";
function Sidenav() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  return (
    <div className="w-[20%] h-screen flex flex-col pt-6 bg-green-900 shadow-inner">
      <div className="sidenav-title flex items-center justify-around px-6">
        <img className="w-[20%]" src={LivinglabIcon} alt="Livinglab Icon" />
        <p className="text-3xl font-bold tracking-wider text-center font-mono">
          Dashboard <br /> VIANA
        </p>
      </div>
      <div className="mt-8">
        <ul className="flex flex-col gap-5">
          {PageRoutes.map((route, index) => {
            console.log(route.icon);
            return (
              <NavLink to={route.path} onClick={() => setActiveTabIndex(index)} key={index}>
                <div className={`m-2 p-2 rounded-xl flex gap-2 items-center hover:text-gray-200 hover:bg-green-700 ${index === activeTabIndex ? `bg-green-600` : ``}`}>
                  <IconsConfig name={route.icon} />
                  <button className={`text-left font-semi text-xl`}>{route.title}</button>
                </div>
              </NavLink>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Sidenav;
