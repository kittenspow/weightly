import React from 'react';

const Input = ({ label, type, step, value, onChange, placeholder = "", className = "", disabled = false, register, name, error }) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <input
          type={type}
          step={step}
          // Use value and onChange for controlled components, or register for React Hook Form
          {...(register ? register(name, { valueAsNumber: type === 'number' }) : { value, onChange })}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${disabled ? 'bg-gray-100' : ''} ${className}`}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
      </div>
    );
};
  
  export default Input;