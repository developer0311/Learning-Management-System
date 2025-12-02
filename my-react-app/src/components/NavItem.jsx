// NavItem.jsx
import React from "react";
import { NavLink } from "react-router-dom";

function NavItem({ to, nav, icon }) {
  return (
    <li className="nav-item">
      <NavLink
        to={to}
        className={({ isActive }) =>
          "nav-link d-flex align-items-center gap-2 px-3 py-2 rounded-3 " +
          (isActive ? "bg-primary text-white" : "text-body-secondary")
        }
      >
        {icon && <i className={`bi ${icon}`}></i>}
        <span>{nav}</span>
      </NavLink>
    </li>
  );
}

export default NavItem;
