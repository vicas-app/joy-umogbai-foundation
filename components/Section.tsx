import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  bg?: 'white' | 'cream' | 'dark' | 'none' | 'blue';
  id?: string;
}

export const Section: React.FC<SectionProps> = ({ children, className = '', bg = 'white', id }) => {
  const bgColors = {
    white: 'bg-white',
    cream: 'bg-sh-blue-light', // Replaced cream with light blue tint
    blue: 'bg-sh-blue text-white',
    dark: 'bg-sh-blue text-white', // Dark is now the primary blue
    none: ''
  };

  return (
    <section id={id} className={`py-16 md:py-24 ${bgColors[bg as keyof typeof bgColors] || bgColors.white} ${className}`}>
      <div className="container mx-auto px-6">
        {children}
      </div>
    </section>
  );
};