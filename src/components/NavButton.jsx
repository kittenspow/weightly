import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const NavButton = ({ to, children, icon: Icon }) => {
  const location = useLocation(); 

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 w-full rounded-md font-poppins font-medium transition-colors ${
          isActive
            ? 'bg-white text-primary-blue' 
            : 'text-white hover:text-primary-blue hover:bg-white/85'
        }`
      }
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </NavLink>
  );
};

export default NavButton;
