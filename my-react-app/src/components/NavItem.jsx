import React from "react";
import { NavLink, Link } from "react-router-dom";

function NavItem(props) {
  return (
    <li className="nav-item">
      <NavLink
        to={props.to}
        className={({ isActive }) =>
          `nav-link ${isActive ? "active text-primary fw-semibold" : ""}`
        }
      >
        {props.nav}
      </NavLink>
    </li>
  );
}

export default NavItem;
