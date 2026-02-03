import React from 'react';

interface TechStickerProps {
  children: React.ReactNode;
  className?: string;
}

const TechSticker: React.FC<TechStickerProps> = ({ children, className = '' }) => {
  return (
    <div 
      className={`transition-all duration-500 ease-out hover:z-50 ${className}`}
      style={{
        perspective: '1000px',
      }}
    >
      <div className="transform transition-transform hover:scale-110">
        {children}
      </div>
    </div>
  );
};

export default TechSticker;