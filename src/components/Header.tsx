import React from 'react';
import NavLogo from './NavLogo';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`py-4 px-5 fixed top-0 left-0 right-0 z-50 ${className}`}>
      <div className="container mx-auto flex items-center justify-between">
        <NavLogo size="md" className="ml-0 md:ml-4" />
        
        {/* Additional navigation items can be added here */}
        <div className="flex items-center gap-4">
          {/* Example of additional nav items (can be removed or modified) */}
          {/* <button className="text-white hover:text-white/80 transition-colors">Sign In</button> */}
        </div>
      </div>
    </header>
  );
};

export default Header; 