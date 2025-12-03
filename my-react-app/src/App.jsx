import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Dashboard from "./views/Dashboard";
import Courses from "./views/Courses";
import Assignments from "./views/Assignments";
import Lessons from "./views/Lessons";
// import MyCourses from "./views/MyCourses";
// import CourseDetails from "./views/CourseDetails";
import Profile from "./views/Profile";
import PageLoader from "./components/PageLoader";

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // Trigger loader when route changes
  // useEffect(() => {
  //   setLoading(true);
  //   const timer = setTimeout(() => setLoading(false), 800); // Adjust time if needed
  //   return () => clearTimeout(timer);
  // }, [location.pathname]);

  return (
    <>
      {loading && <PageLoader />}
      <div className="app-root bg-light">
        <Sidebar />

        {/* MAIN AREA (right of sidebar on large screens) */}
        <div className="app-main d-flex flex-column min-vh-100">
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/lessons" element={<Lessons />} />
              {/* <Route path="/courses/:id" element={<CourseDetails />} />  */}
              <Route path="/profile" element={<Profile />} />
            </Routes>
        <Footer />
          </main>
        </div>

      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
