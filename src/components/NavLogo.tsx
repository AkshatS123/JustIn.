import React from 'react';
import { Link } from 'react-router-dom';

interface NavLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const NavLogo: React.FC<NavLogoProps> = ({ className = '', size = 'md' }) => {
  // Image sizes optimized for corner placement
  const imageClass = {
    sm: 'h-24 w-24',
    md: 'h-32 w-32', 
    lg: 'h-40 w-40'
  };

  return (
    <Link to="/" className={`block ${className}`}>
      <img 
        src="/Just.png" 
        alt="Just In Logo" 
        className={`${imageClass[size]} object-contain`}
      />
    </Link>
  );
};

export default NavLogo; 