"use client"; // Ensures client-side rendering

import { useState } from "react";
import Link from "next/link";
import NavBar from '.././nav-bar'; // Import the NavBar component 
import UxCase from '.././ux-case'; // Import the UxCase component

export default function HomePage() {
  return (
    <div>
      <NavBar />
      
      {/* Register the UxCase component here */}
      <UxCase />
    </div>
  );
}
