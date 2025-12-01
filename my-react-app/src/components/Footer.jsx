import React from "react";
import NavItem from "./NavItem";


function Footer() {
  return (
    <div className="container">
      
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          
            <NavItem
              to="/"
              nav = "Home"
            />
            <NavItem
              to="/courses"
              nav = "Courses"
            />

            <NavItem
              to="/my-courses"
              nav = "My Courses"
            />

            <NavItem
              to="/profile"
              nav = "Profile"
            />
        </ul>
        <p className="text-center text-body-secondary">© {new Date().getFullYear()} CourseDash. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Footer;
