import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Scroll Lock Effect
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Upcoming Players', path: '/upcoming' },
    { name: 'Best Formations', path: '/formations' },
    { name: 'Best Managers', path: '/managers' },
    { name: 'Tournaments', path: '/tournaments' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-purple-500/20 bg-slate-950/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between relative">
          
          {/* Brand Logo - LEFT */}
          <div className="flex-shrink-0 z-50">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black tracking-wider gamer-font text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
              CORE
            </Link>
          </div>

          {/* Desktop Menu - RIGHT (Hidden on Mobile/Tablet Portrait) */}
          <div className="hidden lg:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-2 px-1 text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:text-cyan-400
                  ${isActive(link.path) ? 'text-cyan-400' : 'text-slate-300'}
                `}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 transform transition-transform duration-300 origin-left ${isActive(link.path) ? 'scale-x-100 shadow-[0_0_10px_cyan]' : 'scale-x-0'}`}></span>
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger - RIGHT - Higher Z-Index to stay above overlay */}
          <div className="lg:hidden z-[110]">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-purple-400 focus:outline-none p-2 relative"
              aria-label="Toggle Menu"
            >
              <div className="w-8 h-8 flex flex-col justify-center items-end gap-1.5">
                <span className={`h-0.5 bg-current transition-all duration-300 rounded-full ${isMobileMenuOpen ? 'w-8 rotate-45 translate-y-2 bg-red-500' : 'w-8'}`}></span>
                <span className={`h-0.5 bg-current transition-all duration-300 rounded-full ${isMobileMenuOpen ? 'opacity-0' : 'w-6'}`}></span>
                <span className={`h-0.5 bg-current transition-all duration-300 rounded-full ${isMobileMenuOpen ? 'w-8 -rotate-45 -translate-y-2 bg-red-500' : 'w-4'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Menu Overlay - Separate from Nav structure to ensure full coverage */}
      <div
        className={`fixed inset-0 bg-black z-[100] flex flex-col justify-center items-center transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Background Particles Decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="flex flex-col space-y-8 text-center w-full px-8 relative z-10">
           {/* Mobile Menu Logo */}
           <div className="mb-8 animate-pulse">
              <span className="text-4xl font-black gamer-font text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]">
                MENU
              </span>
           </div>

          {navLinks.map((link, idx) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={toggleMenu}
              style={{ transitionDelay: `${idx * 50}ms` }}
              className={`text-2xl font-bold gamer-font tracking-widest py-3 border-b border-white/10 transition-all duration-300 transform ${
                isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              } ${
                isActive(link.path)
                  ? 'text-cyan-400 border-cyan-500/50 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]'
                  : 'text-white hover:text-purple-400 hover:border-purple-500/30'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        <div className="absolute bottom-12 text-slate-600 text-xs tracking-widest uppercase">
          eFootball Core System v1.0
        </div>
      </div>
    </>
  );
};

export default Navbar;