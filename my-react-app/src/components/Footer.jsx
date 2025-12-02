import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-top py-3 mt-auto w-100">
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
        {/* Left: Brand / copyright */}
        <span className="text-body-secondary small">
          © {year} <span className="fw-semibold">CourseDash</span>. All rights reserved.
        </span>

        {/* Right: simple footer links */}
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link px-2 text-body-secondary small">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/courses" className="nav-link px-2 text-body-secondary small">
              Courses
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/lessons" className="nav-link px-2 text-body-secondary small">
              Lessons
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/assignments" className="nav-link px-2 text-body-secondary small">
              Assignments
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link px-2 text-body-secondary small">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
