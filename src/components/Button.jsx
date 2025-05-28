import React from 'react';

const Button = ({ children, onClick, variant = "primary", className = "", disabled = false, type = "button" }) => {
    const baseClass = "px-4 py-2 rounded-md font-medium transition-colors duration-200 disabled:opacity-50";
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
      success: "bg-green-600 text-white hover:bg-green-700",
      danger: "bg-red-600 text-white hover:bg-red-700"
    };
  
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseClass} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
};
  
  export default Button;