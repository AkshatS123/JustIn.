import React from 'react';
import { Link } from 'react-router-dom';

interface NavLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const NavLogo: React.FC<NavLogoProps> = ({ className = '', size = 'md' }) => {
  // Container sizes
  const containerClass = {
    sm: 'h-20 w-20 overflow-visible',
    md: 'h-24 w-24 overflow-visible', 
    lg: 'h-28 w-28 overflow-visible'
  };
  
  // Image sizes (much larger than containers)
  const imageClass = {
    sm: 'h-40 w-40',
    md: 'h-56 w-56', 
    lg: 'h-72 w-72'
  };

  return (
    <Link to="/" className={`flex items-center ${className} p-1`}>
      <div className={`relative flex items-center justify-center ${containerClass[size]}`}>
        <img 
          src="/Just.png" 
          alt="Just In Logo" 
          className={`${imageClass[size]} absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain`}
        />
      </div>
    </Link>
  );
};

export default NavLogo; 