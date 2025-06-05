import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-brand-900 font-bold text-xl"
        >
          <FileText className="h-6 w-6" />
          <span>ResumeFlow AI</span>
        </Link>
        
        <button 
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" current={location.pathname === "/"}>Home</NavLink>
          <NavLink to="/builder" current={location.pathname === "/builder"}>Builder</NavLink>
          <NavLink to="/templates" current={location.pathname === "/templates"}>Templates</NavLink>
          <Link 
            to="/builder" 
            className="px-6 py-2.5 bg-gradient-to-r from-brand-700 to-accent-600 text-white rounded-full hover:from-brand-600 hover:to-accent-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Create Resume
          </Link>
        </nav>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white/80 backdrop-blur-md shadow-lg absolute w-full">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <NavLink to="/" current={location.pathname === "/"}>Home</NavLink>
            <NavLink to="/builder" current={location.pathname === "/builder"}>Builder</NavLink>
            <NavLink to="/templates" current={location.pathname === "/templates"}>Templates</NavLink>
            <Link 
              to="/builder" 
              className="px-6 py-2.5 bg-gradient-to-r from-brand-700 to-accent-600 text-white rounded-full hover:from-brand-600 hover:to-accent-500 transition-all duration-300 shadow-md hover:shadow-lg text-center"
            >
              Create Resume
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  current: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, current, children }) => {
  return (
    <Link 
      to={to} 
      className={`text-gray-700 hover:text-brand-700 transition-colors duration-300 ${
        current ? 'font-semibold text-brand-700' : ''
      }`}
    >
      {children}
    </Link>
  );
};

export default Header;