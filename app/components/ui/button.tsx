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
  const baseStyles = 'px-6 py-3 rounded-2xl font-semibold transition-all duration-200 flex items-center justify-center gap-2';
  
  const variants = {
    'hero-primary': disabled 
      ? 'bg-[#D1D5DB] text-[#9CA3AF] cursor-not-allowed' 
      : 'bg-orange-600 text-white hover:bg-orange-700 border-0',
    'hero-secondary': disabled
      ? 'bg-[#D1D5DB] text-[#9CA3AF] cursor-not-allowed'
      : 'bg-[#1F2937] text-white hover:bg-[#111827] border-0',
    'default': disabled
      ? 'bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed'
      : 'bg-[#F3F4F6] text-[#1F2937] hover:bg-[#E5E7EB] border border-[#E5E7EB]',
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
