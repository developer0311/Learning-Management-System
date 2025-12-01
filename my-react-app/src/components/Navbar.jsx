import React from "react";
import { NavLink, Link } from "react-router-dom";
import NavItem from "./NavItem";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm p-3">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          CourseDash
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul
            className="navbar-nav me-auto my-2 my-lg-0 "
            style={{ "--bs-scroll-height": "100px" }}
          >
            <NavItem
              to="/"
              nav = "Home"
            />

            <NavItem
              to="/courses"
              nav = "Courses"
            />

            <NavItem
              to="/assignments"
              nav = "Assignments"
            />

            <NavItem
              to="/profile"
              nav = "Profile"
            />
          </ul>

          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search courses..."
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
