"use client"; // Ensures client-side rendering

import { useState } from "react";
import Link from "next/link";
import NavBar from './nav-bar'; // Import the navbar component 
import HeroSection from './hero-section'; // Import the hero-section component 
import WorkSamplesIndex from './work-samples-index';




export default function HomePage() {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <WorkSamplesIndex />
    </div>
  );
}
