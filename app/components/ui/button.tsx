import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'hero-primary' | 'hero-secondary' | 'default';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export default function Button({
  variant = 'default',
  children,
  icon,
  iconPosition = 'right',
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-2xl font-semibold transition-all duration-200 flex items-center justify-center gap-3';
  
  const variants = {
    'hero-primary': disabled 
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
      : 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg hover:shadow-xl',
    'hero-secondary': disabled
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl',
    'default': disabled
      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
      : 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
