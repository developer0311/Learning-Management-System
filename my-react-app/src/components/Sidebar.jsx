import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
// import "./Sidebar.css"; // we'll add animation styles here

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* Hamburger button (mobile only) */}
      <button
        type="button"
        className="btn btn-light border d-md-none position-fixed top-0 start-0 m-2 z-3"
        onClick={toggleSidebar}
      >
        <i className='bx bx-menu-alt-left' ></i>
      </button>

      {/* Sidebar */}
      <aside
        className={`sidebar bg-white border-end shadow-sm min-vh-100 p-3 ${
          isOpen ? "show" : ""
        } d-md-flex flex-column`}
        style={{ width: "260px" }}
      >
        {/* Close button for mobile */}
        <div className="d-flex d-md-none justify-content-end mb-2">
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={toggleSidebar}
          >
            <i className='bx bx-x'></i>
          </button>
        </div>

        {/* Brand */}
        <Link
          to="/"
          className="d-flex align-items-center mb-4 mb-md-5 text-decoration-none"
        >
          <div
            className="rounded-circle d-flex align-items-center justify-content-center me-2"
            style={{
              width: 32,
              height: 32,
              background: "#5b3df8",
              color: "#fff",
            }}
          >
            C
          </div>
          <span className="fw-bold fs-5 text-dark">CourseDash</span>
        </Link>

        {/* OVERVIEW */}
        <span className="text-uppercase text-muted small mb-2">Overview</span>
        <ul className="nav nav-pills flex-column mb-4 gap-1">
          <NavItem to="/dashboard" nav="Dashboard" icon="bx bx-tachometer" />
          <NavItem to="/courses" nav="Courses" icon="bx bx-envelope" />
          <NavItem to="/lessons" nav="Lessons" icon="bx bx-play-circle" />
          <NavItem to="/assignments" nav="Assignments" icon="bx bx-task" />
          <NavItem to="/profile" nav="Profile" icon="bx bx-user" />
        </ul>

        {/* FRIENDS */}
        <span className="text-uppercase text-muted small mb-2">Friends</span>
        <ul className="nav flex-column mb-4 gap-1">
          <NavItem to="/friends/prashant" nav="Prashant" icon="bi-person-circle" />
          <NavItem to="/friends/ravi" nav="Ravi" icon="bi-person-circle" />
        </ul>

        {/* Bottom: Settings / Logout */}
        <div className="mt-auto">
          <span className="text-uppercase text-muted small mb-2 d-block">
            Settings
          </span>
          <ul className="nav flex-column gap-1">
            <NavItem to="/settings" nav="Settings" icon="bi-gear" />
            <NavItem to="/logout" nav="Logout" icon="bi-box-arrow-right" />
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
