import React from 'react';

interface LogoProps {
  showImage?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ showImage = false, className = '' }) => {
  return (
    <div className={`animate-zoom-fade-in ${className}`}>
      <div className="text-center">
        {showImage && (
          <div className="flex justify-center mb-4">
            <img 
              src="/Just.png" 
              alt="Just In Logo"
              className="h-40 w-40 md:h-56 md:w-56 object-contain" 
            />
          </div>
        )}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white font-medium tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
          Just In<span className="text-justin-teal">.</span>
        </h1>
      </div>
    </div>
  );
};

export default Logo;
