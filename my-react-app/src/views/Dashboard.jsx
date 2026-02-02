import React, { useEffect, useState } from "react";
import courseServices from "../services/course.service";
import GlobalLoader from "../components/Loaders/GlobalLoader";
import LearningChart from "../components/LearningChart";
import CourseSection from "../components/CourseSection";

const mentors = [
  {
    id: 1,
    name: "Prashant Kumar Singh",
    date: "25/2/2023",
    type: "Frontend",
    course: "Understanding Concept Of React",
  },
  {
    id: 2,
    name: "Ravi Kumar",
    date: "25/2/2023",
    type: "Frontend",
    course: "Understanding Concept Of React",
  },
];

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await courseServices.getAllCourses();
        // your API shape: { success: true, courses: [...] }
        setCourses(res.data.courses || []);
      } catch (err) {
        console.error("Failed to load courses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="dashboard-page py-3 py-md-4 w-100">
      {/* Global full page loader */}
      <GlobalLoader loading={loading} text="Loading Dashboard..." />

      <div className="container-xxl">
        <div className="row g-4">
          {/* ====== MAIN COLUMN ====== */}
          <div className="col-12 col-lg-8 d-flex flex-column gap-2">
            {/* Search bar */}
            <div className="card dashboard-card p-3 p-md-4 w-100">
              <div className="input-group">
                <span className="input-group-text bg-transparent border-0">
                  <i className="bx bx-search-alt-2"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Search your course here..."
                />
                <button className="btn btn-outline-secondary rounded-pill ms-2">
                  <i className="bx bx-filter-alt" />
                </button>
              </div>
            </div>

            {/* Hero */}
            <div className="card dashboard-card hero-card p-3 p-md-4 w-100">
              <div className="row align-items-center">
                <div className="col-12 col-md-7">
                  <p className="badge rounded-pill text-bg-light text-uppercase small mb-2">
                    Online Course
                  </p>
                  <h3 className="fw-semibold mb-3">
                    Sharpen Your Skills With Professional Online Courses
                  </h3>
                  <button className="btn btn-light btn-sm rounded-pill px-3">
                    Join Now
                  </button>
                </div>

                <div className="col-12 col-md-5 mt-3 mt-md-0 text-md-end">
                  <div className="small text-light-50 mb-1">2/8 Watched</div>
                  <div className="progress progress-sm rounded-pill">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "25%" }}
                    />
                  </div>
                  <div className="text-light small mt-2">
                    Product Design · Level Beginner
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Watching from API */}
            <section className="w-100">
              <div className="d-flex justify-content-between align-items-center my-5 w-100">
                <h3 className="fw-semibold mb-0">Continue Watching</h3>
                <button className="btn btn-link btn-sm p-0">See All</button>
              </div>

              {/* take first 6 courses */}
              <CourseSection
                title=""
                courses={courses.slice(0, 6)}
              />
            </section>

            {/* Mentor table */}
            <section className="w-100">
              <div className="d-flex justify-content-between align-items-center my-5 w-100">
                <h3 className="fw-semibold mb-0">Your Mentor</h3>
                <button className="btn btn-link btn-sm p-0">See All</button>
              </div>

              <table className="table table-responsive table-hover align-middle">
                <thead>
                  <tr>
                    <th>Instructor Name &amp; Date</th>
                    <th>Course Type</th>
                    <th>Course Title</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mentors.map((m) => (
                    <tr key={m.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-circle me-2">
                            {m.name[0]}
                          </div>
                          <div>
                            <div className="small fw-semibold">
                              {m.name}
                            </div>
                            <div className="extra-small text-muted">
                              {m.date}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="badge rounded-pill bg-primary-subtle text-primary extra-small">
                          {m.type}
                        </span>
                      </td>

                      <td className="small">{m.course}</td>

                      <td className="text-end">
                        <button className="btn btn-outline-primary btn-sm rounded-pill extra-small">
                          Show Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>

          {/* ====== RIGHT COLUMN ====== */}
          <div className="col-12 col-lg-4">
            <div className="card dashboard-card mb-4 w-100">
              <div className="card-body text-center">
                <div className="profile-avatar mx-auto mb-3" />
                <h6 className="fw-semibold mb-1">
                  Good Morning Diprati
                </h6>
                <p className="extra-small text-muted mb-3">
                  Continue your journey and achieve your target
                </p>

                <div className="d-flex justify-content-center gap-2 mb-3">
                  <button className="btn btn-light btn-sm rounded-circle">
                    <i className="bx bx-book" />
                  </button>
                  <button className="btn btn-light btn-sm rounded-circle">
                    <i className="bx bx-play-circle" />
                  </button>
                  <button className="btn btn-light btn-sm rounded-circle">
                    <i className="bx bx-award" />
                  </button>
                </div>

                <LearningChart />
              </div>
            </div>

            <div className="card dashboard-card w-100">
              <div className="card-body">
                <h6 className="fw-semibold mb-2">Your Mentor</h6>

                <div className="d-flex flex-column gap-2">
                  {mentors.map((m) => (
                    <div
                      key={m.id}
                      className="d-flex align-items-center justify-content-between p-2 rounded-3 mentor-item"
                    >
                      <div className="d-flex align-items-center">
                        <div className="avatar-circle me-2">
                          {m.name[0]}
                        </div>
                        <div>
                          <div className="small fw-semibold">
                            {m.name}
                          </div>
                          <div className="extra-small text-muted">
                            Software Developer
                          </div>
                        </div>
                      </div>

                      <span className="badge rounded-pill bg-primary-subtle text-primary extra-small">
                        Follow
                      </span>
                    </div>
                  ))}
                </div>

                <button className="btn btn-primary w-100 rounded-pill mt-3 extra-small py-2">
                  See All
                </button>
              </div>
            </div>
          </div>
          {/* ====== END RIGHT COLUMN ====== */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;