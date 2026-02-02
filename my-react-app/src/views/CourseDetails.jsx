import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import courseServices from "../services/course.service";
import GlobalLoader from "../components/Loaders/GlobalLoader";

function CourseDetails() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [details, setDetails] = useState(null);
  const [modules, setModules] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [activeTab, setActiveTab] = useState("lessons");

  // 🔴 DUMMY (replace later from backend)
  const isEnrolled = false;

  // lesson state
  const [activeLesson, setActiveLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await courseServices.getCourseById(id);

        setCourse(res.data.course);
        setModules(res.data.modules || []);
        setDetails(res.data.details || null);
        setAssignments(res.data.assignments || []);
      } catch (err) {
        console.error("Failed to fetch course", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const renderVideo = (lesson) => {
    if (!lesson?.content_url) {
      return (
        <div className="d-flex flex-column align-items-center justify-content-center text-light text-center px-3">
          <i className="bx bx-play-circle fs-1 mb-2" />
          <p className="mb-0 fw-semibold">Preview: {lesson.title}</p>
          <small className="text-light-emphasis">
            Video content will appear here
          </small>
        </div>
      );
    }

    // YouTube link
    if (lesson.content_url.includes("youtu")) {
      const videoId =
        lesson.content_url.split("v=")[1]?.split("&")[0] ||
        lesson.content_url.split("youtu.be/")[1]?.split("?")[0];

      return (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={lesson.title}
          className="w-100 h-100"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }

    // Normal video file (.mp4 etc)
    return <video src={lesson.content_url} controls className="w-100 h-100" />;
  };

  if (loading) {
    return <GlobalLoader loading text="Loading course..." />;
  }

  if (!course) {
    return <h2 className="text-center mt-5">Course not found</h2>;
  }

  const discountedPrice =
    Number(course.price) -
    (Number(course.price) * course.discount_percent) / 100;

  const toggleComplete = (lessonId) => {
    setCompletedLessons((prev) =>
      prev.includes(lessonId)
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId],
    );
  };

  return (
    <div className="w-100">
      {/* ================= HERO ================= */}
      <div className="bg-dark text-light p-5">
        <div className="container-xxl">
          <div className="row g-5 align-items-center">
            <div className="col-lg-7">
              <span className="badge bg-primary mb-2">{course.category}</span>

              <h1 className="fw-bold mb-3">{course.title}</h1>

              <p className="text-light-emphasis fs-5">{course.description}</p>

              <div className="d-flex flex-wrap gap-3 my-3">
                <span className="badge bg-secondary">{course.level}</span>
                <span className="badge bg-secondary">⏱ {course.duration}</span>
                <span className="badge bg-secondary">⭐ {course.rating}</span>
              </div>

              <p className="small text-light-emphasis">
                Created by <strong>{course.instructor_name}</strong>
              </p>
            </div>

            {!isEnrolled && (
              <div className="col-lg-5">
                <div className="card shadow border-0">
                  <img
                    src={course.banner_url || "/images/card_image.png"}
                    alt={course.title}
                    className="img-fluid rounded-top"
                  />

                  <div className="card-body">
                    <h4 className="fw-bold mb-2">
                      ₹{discountedPrice}
                      {course.discount_percent > 0 && (
                        <span className="text-muted text-decoration-line-through fs-6 ms-2">
                          ₹{course.price}
                        </span>
                      )}
                    </h4>

                    <button className="btn btn-primary w-100 mb-2">
                      Enroll Now
                    </button>

                    <p className="text-muted small mb-0">
                      Full lifetime access
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= COURSE DETAILS ================= */}
      {details && (
        <div className="container-xxl py-5">
          <div className="row g-4">
            {/* LEFT : OVERVIEW */}
            <div className="col-lg-8 col-12">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h4 className="fw-bold mb-3">Course Overview</h4>

                  <div
                    className="text-muted"
                    dangerouslySetInnerHTML={{ __html: details.overview }}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT : META INFO */}
            <div className="col-lg-4 col-12">
              <div className="card shadow-sm border-0 mb-3">
                <div className="card-body">
                  <h6 className="fw-semibold mb-2">Prerequisites</h6>
                  <p className="text-muted small mb-0">
                    {details.prerequisites || "None"}
                  </p>
                </div>
              </div>

              <div className="card shadow-sm border-0 mb-3">
                <div className="card-body">
                  <h6 className="fw-semibold mb-2">Who this course is for</h6>
                  <p className="text-muted small mb-0">
                    {details.target_audience}
                  </p>
                </div>
              </div>

              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h6 className="fw-semibold mb-2">Learning Outcomes</h6>
                  <p className="text-muted small mb-0">
                    {details.learning_outcomes}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= LEARNING AREA ================= */}
      <div className="container-xxl pb-5">
        <div className="row g-4">
          {/* ========= LEFT : VIDEO ========= */}
          <div className="col-lg-8 col-12">
            <div className="ratio ratio-16x9 bg-dark rounded-top">
              {activeLesson ? (
                renderVideo(activeLesson)
              ) : (
                <div className="d-flex align-items-center justify-content-center text-muted">
                  Select a lesson to start
                </div>
              )}
            </div>
          </div>

          {/* ========= RIGHT : CONTENT NAV ========= */}
          <div className="col-lg-4 col-12">
            <div className="position-sticky" style={{ top: "90px" }}>
              {/* ===== TABS ===== */}
              <div className="card shadow-sm border-0 mb-3">
                <div className="card-header p-0">
                  <ul className="nav nav-tabs nav-fill">
                    <li className="nav-item">
                      <button
                        className={`nav-link ${
                          activeTab === "lessons" ? "active fw-semibold" : ""
                        }`}
                        onClick={() => setActiveTab("lessons")}
                      >
                        Lessons
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${
                          activeTab === "assignments"
                            ? "active fw-semibold"
                            : ""
                        }`}
                        onClick={() => setActiveTab("assignments")}
                      >
                        Assignments
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="card-body p-0">
                  {/* ===== LESSONS TAB ===== */}
                  {activeTab === "lessons" && (
                    <div className="accordion accordion-flush">
                      {modules.map((module) => (
                        <div className="accordion-item" key={module.id}>
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#module-${module.id}`}
                            >
                              {module.title}
                            </button>
                          </h2>

                          <div
                            id={`module-${module.id}`}
                            className="accordion-collapse collapse"
                          >
                            <div className="accordion-body p-0">
                              <ul className="list-group list-group-flush">
                                {module.lessons.map((lesson) => {
                                  const canAccess =
                                    lesson.is_preview || isEnrolled;

                                  return (
                                    <li
                                      key={lesson.id}
                                      className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                      <span className="small">
                                        {lesson.title}
                                        {lesson.is_preview && (
                                          <span className="badge bg-success ms-2">
                                            Preview
                                          </span>
                                        )}
                                      </span>

                                      {canAccess ? (
                                        <button
                                          className="btn btn-sm btn-outline-primary"
                                          onClick={() =>
                                            setActiveLesson(lesson)
                                          }
                                        >
                                          Play
                                        </button>
                                      ) : (
                                        <i className="bx bx-lock text-muted" />
                                      )}
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ===== ASSIGNMENTS TAB ===== */}
                  {activeTab === "assignments" && (
                    <ul className="list-group list-group-flush">
                      {assignments.map((assignment) => {
                        const canAccess = isEnrolled; // preview concept not needed here (yet)

                        return (
                          <li
                            key={assignment.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                            role="button"
                            onClick={() => {
                              if (!canAccess) return;
                              // 🔜 replace later
                              console.log("Go to assignment:", assignment.id);
                            }}
                          >
                            <div className="small">
                              <div className="fw-semibold">
                                {assignment.title}
                              </div>

                              <small className="text-muted">
                                Due:{" "}
                                {new Date(
                                  assignment.due_date,
                                ).toLocaleDateString()}
                              </small>
                            </div>

                            {canAccess ? (
                              <span className="badge bg-primary">Open</span>
                            ) : (
                              <span className="text-muted">
                                <i className="bx bx-lock" />
                              </span>
                            )}
                          </li>
                        );
                      })}

                      {assignments.length === 0 && (
                        <li className="list-group-item text-muted small">
                          No assignments available
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
