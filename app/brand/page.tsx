"use client"; // Ensures client-side rendering

import { useState } from "react";
import Link from "next/link";
import NavBar from '.././nav-bar'; // Import the NavBar component 
import BrandCase from '.././brand-case'; // Import the UxCase component

export default function HomePage() {
  return (
    <div>
      <NavBar />
      
      {/* Register the UxCase component here */}
      <BrandCase />
    </div>
  );
}