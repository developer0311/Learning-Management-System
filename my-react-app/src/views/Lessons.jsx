import React from "react";
import lessonsData from "../../data/lessonData";


function Lessons() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 fw-bold text-primary">📘 Lessons</h1>

      <div className="row g-4">
        {lessonsData.map((lesson) => (
          <div key={lesson.id} className="col-md-6 col-lg-4">
            <div className="card shadow-sm h-100 border-0 w-100">
              {/* 👇 make card-body a flex column */}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold text-dark">{lesson.title}</h5>

                <p className="card-text text-muted">{lesson.description}</p>

                {/* 👇 this block will stay at the bottom */}
                <div className="mt-auto">
                  <p className="text-secondary mb-2">
                    <i className="bx bxs-stopwatch me-2"></i>
                    {lesson.duration}
                  </p>
                  <button className="btn btn-primary w-100">
                    Start Lesson
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Lessons;
