"use client"; // Ensures client-side rendering

import { useState } from "react";
import Link from "next/link";
import NavBar from './nav-bar'; // Import the NavBar component 
import HeroSection from './hero-section'; // Import the HeroSection component 
import WorkSamplesIndex from './work-samples-index'; // Import the WorkSamplesIndex component

export default function HomePage() {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <WorkSamplesIndex />
      
    </div>
  );
}
