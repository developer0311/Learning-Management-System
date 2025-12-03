import React, { useRef, useState, useEffect } from "react";
import coursesData from "../../coursesData";
import CourseSection from "../components/CourseSection";


function AllCourses() {
  const beginnerCourses = coursesData.filter((c) => c.level === "Beginner");
  const intermediateCourses = coursesData.filter(
    (c) => c.level === "Intermediate"
  );
  const advancedCourses = coursesData.filter((c) => c.level === "Advanced");

  return (
    <div className="py-3 py-md-4 w-100">
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
