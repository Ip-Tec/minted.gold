// components/Button.js

import React from 'react';

const Button = ({ children, block, white, outline, black, primary, size, ...rest }) => {
  const buttonClasses = [
    'border-0',
    'px-5',
    'py-2',
    'rounded',
    'cursor-pointer',
    'inline-flex',
    'items-center',
    'text-decoration-none',
    'font-poppins',
    'font-semibold',
    'focus:outline-none',
  ];

  if (block) {
    buttonClasses.push('block', 'w-full');
  }

  if (white && !outline) {
    buttonClasses.push('bg-white', 'text-black');
  }

  if (white && outline) {
    buttonClasses.push('bg-transparent', 'text-white', 'border', 'border-white');
  }

  if (black && !outline) {
    buttonClasses.push('bg-black', 'text-white');
  }

  if (black && outline) {
    buttonClasses.push('bg-transparent', 'text-black', 'border', 'border-black');
  }

  if (primary && !outline) {
    buttonClasses.push(`bg-${primary}`, `border-${primary}`, 'text-white');
  }

  if (primary && outline) {
    buttonClasses.push('bg-transparent', `border-${primary}`, `text-${primary}`);
  }

  if (size === 'l') {
    buttonClasses.push('text-lg', 'px-8', 'py-4');
  }

  return (
    <button className={buttonClasses.join(' ')} {...rest}>
      {children}
    </button>
  );
};

export default Button;
