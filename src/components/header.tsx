"use client";

import React, { useState } from "react";
import Image from "next/image";
import LogoPic from "@/public/car-wheel.svg"
import {
  Bars3BottomRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

const TireHeader = () => {
  let Links = [
    { name: "HOME", link: "/" },
    { name: "TIRE", link: "/product" },
    { name: "SERVICE", link: "/service" },
    { name: "ABOUT", link: "/about" },
    { name: "CONTACT", link: "/" },
  ];
  let [open, setOpen] = useState(false);

  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        {/* logo section */}
        <div className="font-bold text-2xl cursor-pointer flex items-center gap-1">
          <Image src={LogoPic} className="w-11 h-11 text-blue-600" alt='logo'/>
          <span>Tire of Crestmont</span>
        </div>
        {/* Menu icon */}
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7"
        >
          {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>
        {/* linke items */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-12" : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 md:my-0 my-7 font-semibold">
              <a
                href={link.link}
                className="text-gray-800 hover:text-blue-400 duration-500"
              >
                {link.name}
              </a>
            </li>
          ))}
          <button className="btn bg-blue-600 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static">
            Get Started
          </button>
        </ul>
        {/* button */}
      </div>
    </div>
  );
};

export default TireHeader;
