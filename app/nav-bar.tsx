"use client"; // Ensures client-side rendering

import { useState } from "react";
import Link from "next/link";

// NavBar component
function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-white text-licorice py-5 shadow-md relative z-50">
      <div className="flex justify-between items-center container px-5 mx-auto">
        {/* Logo */}
        <h2 className="text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
          <Link href="/" className="hover:text-menuBlue">
          Esther Bayer
          </Link>
        </h2>

        {/* Hamburger Menu for mobile */}
        <div className="block md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <nav className="text-xl font-bold hidden md:flex space-x-8">
          <Link href="#portfolio-section" className="hover:text-menuBlue font-bold scroll-link">WORK SAMPLES</Link>
          <Link href="#contact" className="hover:text-menuBlue font-bold scroll-link">CONTACT</Link>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="md:hidden absolute top-16 right-0 w-full bg-white text-licorice p-5 font-bold">
            <Link href="#portfolio-section" className="hover:text-menuBlue font-bold scroll-link">WORK SAMPLES</Link>
            <Link href="#contact" className="block py-2 hover:text-menuBlue font-bold scroll-link">CONTACT</Link>
          </nav>
        )}
      </div>
    </header>
  );
}

export default NavBar;
