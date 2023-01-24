import { Route, Routes } from "react-router-dom";
import PageRoutes from "./config/PageRoutes.json";
import Pages from "./pages/Pages";
import Navbar from "./components/Navbar";
import Sidenav from "./components/Sidenav";
import { useState } from "react";

function App() {
  return (
    <div className="flex flex-1 font-sans">
      <Sidenav />
      <div className="w-full h-screen bg-slate-300">
        <Navbar />
        <div className="m-4">
          <Routes>
            {PageRoutes.map((route, index) => {
              return <Route path={route.path} element={<Pages name={route.component} />} key={index} />;
            })}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
