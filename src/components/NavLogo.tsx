import React from 'react';
import { Link } from 'react-router-dom';

interface NavLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const NavLogo: React.FC<NavLogoProps> = ({ className = '', size = 'md' }) => {
  // Image sizes optimized for corner placement
  const imageClass = {
    sm: 'h-10 w-10',
    md: 'h-12 w-12', 
    lg: 'h-16 w-16'
  };

  const textClass = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <Link to="/" className={`flex items-center ${className}`}>
      <span className={`font-serif ${textClass[size]} text-white font-medium tracking-wide`}>
        Just In<span className="text-justin-teal">.</span>
      </span>
    </Link>
  );
};

export default NavLogo; 