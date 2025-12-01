import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./views/Home";
import Courses from "./views/Courses";
import Assignments from "./views/Assignments";
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
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/assignments" element={<Assignments />} />
        {/* <Route path="/courses/:id" element={<CourseDetails />} />  */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
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
