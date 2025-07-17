'use client';

import Link from 'next/link';

const NavBar = () => {
  const toggleMenu = () => {
    const menu = document.getElementById('mobile-menu');
    menu?.classList.toggle('hidden');
  };

  return (
    <nav className="warren-nav">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-4 h-4 transition-all duration-300 group-hover:scale-105">
              <img 
                src="/NesolagusLogo.png" 
                alt="Nesolagus Logo" 
                className="w-4 h-4 object-contain"
                style={{ width: '16px', height: '16px' }}
              />
            </div>
            <div>
              <span className="warren-section-header text-xl font-semibold m-0" style={{ color: 'var(--warren-primary-dark-blue)' }}>
                Warren
              </span>
              <div className="warren-secondary-text text-xs -mt-1">
                powered by Nesolagus
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
              onClick={toggleMenu}
            >
              <span className="text-lg">☰</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div id="mobile-menu" className="hidden md:hidden pb-4">
          <div className="flex flex-col space-y-2">
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
            <div className="pt-2">
              <Link href="/builder" className="warren-btn-primary w-full text-center">
                <span>🚀</span>
                Start Building
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
