"use client";

import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }
  }, [isOpen]);
  return (
    <header className="w-full  relative z-50 mb-8">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo / Title */}
        <div className="text-sm md:text-xl  cursor-pointer flex space-x-2">
          <span>Indian Psychology</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10">
          <li>
            <a href="/get-in-touch" className="hover:text-blue-600">
              Quick Assesment
            </a>
          </li>
          <li>
            <a href="/privacy-policy" className="hover:text-blue-600">
              Privacy Policy
            </a>
          </li>
        </ul>

        {/* Hamburger Button (Mobile) */}
        <button
          className="md:hidden text-2xl z-50 "
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      {isOpen && (
        <div className="fixed inset-0 w-full h-screen bg-white flex flex-col items-center justify-center space-y-6 md:hidden">
          {" "}
          <a href="/get-in-touch" className="hover:text-blue-600">
            Quick Assesment
          </a>{" "}
          <a href="/privacy-policy" className="hover:text-blue-600">
            Privacy Policy
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
