import Link from "next/link";
import React, { useState } from "react";
import NavItem from "./NavItem";
import NavLogo from "./NavLogo";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State to toggle mobile menu

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  interface navItemStruct {
    name: string;
    to: string;
  }
  
  const navItems: navItemStruct[] = [
    {
      name: "Home",
      to: "/",
    },
    {
      name: "All NFT",
      to: "/allnft",
    },
    {
      name: "My NFT",
      to: "/mynft",
    },
  ];

  return (
    <nav className="flex flex-col md:flex-row justify-between py-3 backdrop-blur-[9px] p-3 md:p-5">
      <div className="flex justify-between items-center">
        <NavLogo />
        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white text-2xl focus:outline-none">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Desktop Menu */}
      <ul className={`hidden md:flex md:my-auto md:ml-7`}>
        
        {navItems.map((item: navItemStruct) => (
          <span key={item.name}>
            <Link href={item.to}>
              <li className="text-white px-4 text-center py-1 cursor-pointer hover:text-gray-500">
                {item.name}
              </li>
            </Link>
          </span>
        ))}
      </ul>

      {/* Mobile Menu */}
      <ul
        className={`${
          isOpen ? "flex" : "hidden"
        } flex-col md:hidden mt-4 space-y-3`}
      >
        {navItems.map((item: navItemStruct) => (
          <span key={item.name}>
            <Link href={item.to}>
              <li className="text-white px-4 py-2 cursor-pointer hover:text-gray-500 text-center">
                {item.name}
              </li>
            </Link>
          </span>
        ))}
      </ul>
      {/* Connect Wallet Button */}
      <div className="mt-10 p-4 lg:p-0 md:mt-0 right-0 absolute lg:hidden block">
        <ConnectButton />
      </div>  
      <div className="p-2 lg:p-0 md:mt-0 hidden lg:block ">
        <ConnectButton />
      </div>  

      
    </nav>
  );
}

export default Navbar;
