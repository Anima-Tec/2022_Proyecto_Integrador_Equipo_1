import { React } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";

export default function NavBar() {
  return (
    <>
      <div className="w-full ">
        <ul className="bg-secondBg text-white flex items-center justify-between h-16 align-middle">
          <div className="flex flex-row items-center">
            <li className="mb-1 ml-10 mr-12">
              <img src={logo} alt="a" />
            </li>
            <li className="text-3xl mr-24">Faro</li>
          </div>
          <div className="flex flex-row">
            <li className="text-xl mr-24">
              <Link to="/">Home</Link>
            </li>
            <li className="text-xl mr-24">
              <Link to="/about">About Us</Link>
            </li>
            <li className="text-xl mr-24">
              <Link to="/support">Soporte</Link>
            </li>
          </div>
        </ul>
      </div>
    </>
  );
}
