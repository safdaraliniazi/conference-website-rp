import { Typography } from '@material-tailwind/react';
import React from 'react';
import { NavLink } from 'react-router-dom';

function NavItem({ children, href }) {
  return (
    <li>
      <NavLink to={href} className="flex items-center gap-2 font-semibold">
        <Typography variant="paragraph" className="flex items-center gap-2 font-semibold">
          {children}
        </Typography>
      </NavLink>
    </li>
  );
}

export default NavItem;
