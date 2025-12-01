// components/PageLoader.jsx
import React from "react";

function PageLoader() {
  return (
    <div
      className="d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 vh-100 bg-white"
      style={{ zIndex: 2000 }}
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default PageLoader;
