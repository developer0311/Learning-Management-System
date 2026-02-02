import React, { useState } from "react";
import "../../public/css/coursePlayer.css";

function CoursePlayer({ course, modules, isEnrolled }) {
  const [activeLessonId, setActiveLessonId] = useState(null);

  // Dummy progress state (API later)
  const [completedLessons, setCompletedLessons] = useState([]);

  const toggleLessonDone = (lessonId) => {
    setCompletedLessons((prev) =>
      prev.includes(lessonId)
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  const canAccessLesson = (lesson) =>
    lesson.is_preview || isEnrolled;

  return (
    <div className="course-player-layout">
      {/* ================= LEFT: VIDEO ================= */}
      <div className="player-main">
        <div className="video-wrapper">
          <button className="play-btn">
            <i className="bx bx-play"></i>
          </button>
        </div>

        {/* Tabs */}
        <div className="player-tabs">
          {["Overview", "Q&A", "Notes", "Announcements", "Reviews"].map(
            (tab) => (
              <button key={tab} className="tab-btn">
                {tab}
              </button>
            )
          )}
        </div>
      </div>

      {/* ================= RIGHT: CONTENT ================= */}
      <aside className="player-sidebar">
        <h6 className="fw-bold mb-3">Course content</h6>

        {modules.map((module) => (
          <div key={module.id} className="module-block">
            <p className="module-title">{module.title}</p>

            {module.lessons.map((lesson) => {
              const completed = completedLessons.includes(lesson.id);
              const canAccess = canAccessLesson(lesson);

              return (
                <div
                  key={lesson.id}
                  className={`lesson-row ${
                    !canAccess ? "locked" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={completed}
                    disabled={!canAccess}
                    onChange={() => toggleLessonDone(lesson.id)}
                  />

                  <div
                    className="lesson-title"
                    onClick={() =>
                      canAccess && setActiveLessonId(lesson.id)
                    }
                  >
                    {lesson.title}
                    {lesson.is_preview && (
                      <span className="preview-badge">Preview</span>
                    )}
                  </div>

                  <span className="lesson-meta">
                    {lesson.duration_minutes}m
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </aside>
    </div>
  );
}

export default CoursePlayer;
