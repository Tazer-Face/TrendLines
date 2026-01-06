import React from "react";
import NavBar from "./NavBar";
import axios from 'axios'

const Header = () => {
  
  return (
    <div className="w-100 bg-black">
      <div className="container d-flex flex-column align-items-center justify-content-between flex-md-row align-items-center justify-content-between gap-3">
        <h3 className="m-0 text-white">
          <b>TREND LINES</b>
        </h3>
        <NavBar />
      </div>
    </div>
  );
};

export default Header;
