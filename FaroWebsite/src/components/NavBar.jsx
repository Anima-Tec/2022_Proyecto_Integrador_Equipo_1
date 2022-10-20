import { React } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.svg";

const NavBar = () => {
  const location = useLocation();

  return (
    <>
      <ul className={`w-full h-[8vh] min-h-[4.325rem] ${location.pathname === '/about' ? 'bg-transparent': 'bg-secondBg'} text-white flex items-center justify-between align-middle`}>
        <div className="flex flex-row items-center">
          <li className="mb-2 ml-10 mr-4">
            <img className="w-12" src={logo} alt="a" />
          </li>
          <li className="text-3xl mr-24">Faro</li>
        </div>
        <div className="flex flex-row">
          <li className="text-xl mr-24">
            <Link to="/">Home</Link>
            {location.pathname === '/' ? 
               <div className="w-full h-1 relative bg-firstColor"></div>
            :""}
          </li>
          <li className="text-xl mr-24">
            <Link to="/about">About Us</Link>
            {location.pathname === '/about' ? 
               <div className="w-full h-1 relative bg-firstColor"></div>
            :""}
          </li>
        </div>
      </ul>
    </>
  );
}

export default NavBar;
