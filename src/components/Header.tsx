import React from 'react';
import NavLogo from './NavLogo';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 ${className}`}>
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <NavLogo size="sm" />
        
        {/* Additional navigation items can be added here */}
        <div className="flex items-center gap-4">
          {/* Example of additional nav items (can be removed or modified) */}
          {/* <button className="text-white/80 hover:text-white transition-colors text-sm font-medium">Sign In</button> */}
        </div>
      </div>
    </header>
  );
};

export default Header; 