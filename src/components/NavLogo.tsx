import React from 'react';
import { Link } from 'react-router-dom';

interface NavLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const NavLogo: React.FC<NavLogoProps> = ({ className = '', size = 'md' }) => {
  // Container sizes
  const containerClass = {
    sm: 'h-10 w-10 overflow-visible',
    md: 'h-12 w-12 overflow-visible', 
    lg: 'h-14 w-14 overflow-visible'
  };
  
  // Image sizes (much larger than containers)
  const imageClass = {
    sm: 'h-20 w-20',
    md: 'h-28 w-28', 
    lg: 'h-36 w-36'
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