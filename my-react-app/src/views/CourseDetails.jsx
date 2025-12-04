import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import coursesData from "../../data/coursesData";

function CourseDetails() {
  const { id } = useParams(); // get course ID from URL

  const course = coursesData.find((c) => c.id === id);

  if (!course) {
    return <h2 className="text-center mt-5">Course not found!</h2>;
  }

  return (
    <div className="py-3 py-md-4 w-100">
      <section className="container-xxl py-5 w-100">
        <div className="container">
          <div className="row align-items-center g-5">
            {/* Course Image */}
            <div className="col-lg-6 text-center">
              <img
                src="/images/card_image.png"
                alt={course.name}
                className="img-fluid rounded shadow"
                style={{ maxHeight: "400px", objectFit: "contain" }}
              />
            </div>

            {/* Course Info */}
            <div className="col-lg-6">
              <h1 className="fw-bold text-dark mb-3">{course.name}</h1>
              <p className="text-muted fs-5">{course.description}</p>

              <div className="mb-3 d-flex flex-wrap align-items-center gap-3">
                <span
                  className="badge rounded-pill px-3 py-2 text-dark-emphasis fw-semibold"
                  style={{ backgroundColor: "var(--WARNING_BTN_COLOR)" }}
                >
                  {course.duration}
                </span>
                <span className="badge bg-primary-subtle text-primary fw-semibold px-3 py-2">
                  {course.level}
                </span>
                <span className="badge bg-info-subtle text-info fw-semibold px-3 py-2">
                  ⭐ {course.rating}
                </span>
              </div>

              <h4 className="text-success fw-bold">
                ₹{course.price - (course.price * course.discount_percent) / 100}{" "}
                <span className="text-decoration-line-through text-muted fs-6 ms-2">
                  ₹{course.price}
                </span>{" "}
                <span className="badge bg-danger ms-2">
                  -{course.discount_percent}%
                </span>
              </h4>

              <p className="mt-3 text-muted">
                <strong>Instructor:</strong> {course.instructor}
              </p>
              <p className="text-muted">
                <strong>Category:</strong> {course.category}
              </p>

              <button className="btn btn-primary mt-3 px-4 py-2 fw-semibold">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Course Summary Section */}
      <section className="container-xxl py-5 bg-light w-100">
        <div className="container">
          <h3 className="fw-bold mb-4">What You’ll Learn</h3>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              ✅ Understand the core concepts of {course.title.split(" ")[0]}.
            </li>
            <li className="list-group-item">
              ✅ Work on real-world projects to strengthen your portfolio.
            </li>
            <li className="list-group-item">
              ✅ Get mentorship and detailed video lessons.
            </li>
            <li className="list-group-item">
              ✅ Certificate of Completion after finishing the course.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default CourseDetails;
