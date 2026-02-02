import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavItem from "./NavItem";
import authServices from "../services/auth.service";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const handleLogout = (e) => {
    e.preventDefault();       // stop normal navigation
    authServices.logout();    // run logout logic
    navigate("/login");       // optional, already in logout but safe
  };

  return (
    <>
      {/* Hamburger button (mobile only) */}
      <button
        type="button"
        className="btn btn-light border d-900-flex position-fixed top-0 start-0 m-2 z-3"
        style={{ fontSize: "20px" }}
        onClick={toggleSidebar}
      >
        <i className="bx bx-menu-alt-left"></i>
      </button>

      <aside
        className={`sidebar bg-white border-end shadow-sm min-vh-100 p-3 ${
          isOpen ? "show" : ""
        } d-md-flex flex-column`}
        style={{ width: "260px" }}
      >
        {/* Close button for mobile */}
        <div className="d-flex d-900-flex justify-content-end mb-2">
          <button
            type="button"
            className="btn"
            style={{ fontSize: "20px" }}
            onClick={toggleSidebar}
          >
            <i className="bx bx-x"></i>
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
          <NavItem to="/" nav="Dashboard" icon="bx bx-tachometer" />
          <NavItem to="/courses" nav="Courses" icon="bx bx-envelope" />
          <NavItem to="/lessons" nav="Lessons" icon="bx bx-play-circle" />
          <NavItem to="/assignments" nav="Assignments" icon="bx bx-task" />
          <NavItem to="/profile" nav="Profile" icon="bx bx-user" />
        </ul>

        {/* FRIENDS */}
        <span className="text-uppercase text-muted small mb-2">Friends</span>
        <ul className="nav flex-column mb-4 gap-1">
          <NavItem
            to={isLoggedIn ? "/friends/prashant" : "/login"}
            nav="Prashant"
            icon="person-circle"
          />
          <NavItem
            to={isLoggedIn ? "/friends/ravi" : "/login"}
            nav="Ravi"
            icon="person-circle"
          />
        </ul>

        {!isLoggedIn && (
          <div className="small text-muted mb-3">
            Login to view and follow friends
          </div>
        )}

        {/* Bottom: Settings / Logout or Login/Register */}
        <div className="mt-auto">
          <span className="text-uppercase text-muted small mb-2 d-block">
            Settings
          </span>

          <ul className="nav flex-column gap-1">
            {isLoggedIn ? (
              <>
                <NavItem to="/settings" nav="Settings" icon="gear" />

                {/* Logout item with same design as NavItem */}
                <li className="nav-item">
                  <a
                    href="/logout"
                    onClick={handleLogout}
                    className="nav-link d-flex align-items-center gap-2 px-3 py-2 rounded-3 text-body-secondary"
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Logout</span>
                  </a>
                </li>
              </>
            ) : (
              <>
                <NavItem to="/login" nav="Login" icon="box-arrow-in-right" />
                <NavItem to="/register" nav="Register" icon="person-plus" />
              </>
            )}
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;