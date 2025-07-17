'use client';

import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="warren-nav">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
              🐰
            </div>
            <div>
              <span className="warren-section-header text-2xl font-bold m-0" style={{ color: 'var(--warren-primary-dark-blue)' }}>
                Warren
              </span>
              <div className="warren-secondary-text text-xs -mt-1">
                Student Voice Insights
              </div>
            </div>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            <Link href="/survey" className="warren-nav-link">
              <span className="flex items-center gap-2">
                🏠 The Den
              </span>
            </Link>
            <Link href="/builder" className="warren-nav-link">
              <span className="flex items-center gap-2">
                🏗️ Burrow Builder
              </span>
            </Link>
            <Link href="/style" className="warren-nav-link">
              <span className="flex items-center gap-2">
                🎨 Warren Style
              </span>
            </Link>
            
            {/* CTA Button */}
            <div className="ml-4">
              <Link href="/builder" className="warren-btn-primary text-sm px-6 py-3">
                <span>🚀</span>
                Start Building
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              className="warren-btn-secondary p-3"
              onClick={toggleMobileMenu}
            >
              <span className="text-lg">☰</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden pb-4 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col space-y-2">
            <Link href="/survey" className="warren-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="flex items-center gap-2">
                🏠 The Den
              </span>
            </Link>
            <Link href="/builder" className="warren-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="flex items-center gap-2">
                🏗️ Burrow Builder
              </span>
            </Link>
            <Link href="/style" className="warren-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="flex items-center gap-2">
                🎨 Warren Style
              </span>
            </Link>
            <div className="pt-2">
              <Link href="/builder" className="warren-btn-primary w-full text-center" onClick={() => setIsMobileMenuOpen(false)}>
                <span>🚀</span>
                Start Building
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}