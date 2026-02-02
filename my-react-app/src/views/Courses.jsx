import React, { useState, useEffect } from "react";
import CourseSection from "../components/CourseSection";
import courseServices from "../services/course.service.js";
import GlobalLoader from "../components/Loaders/GlobalLoader";

function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await courseServices.getAllCourses();
        // API: { success: true, courses: [...] }
        setCourses(res.data.courses || []);
      } catch (error) {
        console.error("Error loading courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // filter from API data
  const beginnerCourses = courses.filter(
    (c) => c.level === "Beginner"
  );
  const intermediateCourses = courses.filter(
    (c) => c.level === "Intermediate"
  );
  const advancedCourses = courses.filter(
    (c) => c.level === "Advanced"
  );

  return (
    <div className="py-3 py-md-4 w-100">
      <GlobalLoader loading={loading} text="Loading courses..." />

      <div className="container-xxl">
        <h3 className="fw-bold mb-1">All Courses</h3>
        <p className="text-muted small mb-4">
          Browse courses by level and continue your learning journey.
        </p>

        <CourseSection title="Beginner" courses={beginnerCourses} />
        <CourseSection title="Intermediate" courses={intermediateCourses} />
        <CourseSection title="Advanced" courses={advancedCourses} />
      </div>
    </div>
  );
}

export default AllCourses;