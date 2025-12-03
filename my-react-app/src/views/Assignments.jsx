// src/pages/Assignments.jsx
import React, { useMemo, useState } from "react";
import assignmentsData from "../../assignmentsData";

function getDaysLeft(dueDateStr) {
  const today = new Date();
  const due = new Date(dueDateStr);
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const diffMs = due.getTime() - today.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return diffDays;
}

function getStatusBadge(status) {
  switch (status) {
    case "Pending":
      return "badge bg-warning-subtle text-warning";
    case "Submitted":
      return "badge bg-info-subtle text-info";
    case "Graded":
      return "badge bg-success-subtle text-success";
    default:
      return "badge bg-secondary-subtle text-secondary";
  }
}

function getActionLabel(status, submission_link) {
  if (status === "Pending") return submission_link ? "Edit Submission" : "Submit";
  if (status === "Submitted") return "View Submission";
  if (status === "Graded") return "View Details";
  return "Open";
}

function Assignments() {
  const [filter, setFilter] = useState("All");

  const stats = useMemo(() => {
    const total = assignmentsData.length;
    const pending = assignmentsData.filter((a) => a.status === "Pending").length;
    const submitted = assignmentsData.filter((a) => a.status === "Submitted").length;
    const graded = assignmentsData.filter((a) => a.status === "Graded").length;
    return { total, pending, submitted, graded };
  }, []);

  const filteredAssignments = useMemo(() => {
    if (filter === "All") return assignmentsData;
    return assignmentsData.filter((a) => a.status === filter);
  }, [filter]);

  return (
    <div className="py-3 py-md-4">
      <div className="container-xxl">
        {/* Header */}
        <div className="mb-4">
          <h3 className="fw-bold mb-1">Assignments</h3>
          <p className="text-muted small mb-0">
            Track your tasks, due dates, and submission status in one place.
          </p>
        </div>

        {/* Summary cards */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm rounded-4 assignment-summary-card  w-100">
              <div className="card-body py-3 px-3 w-100">
                <p className="text-muted extra-small mb-1">Total</p>
                <h5 className="fw-semibold mb-0">{stats.total}</h5>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm rounded-4 assignment-summary-card w-100">
              <div className="card-body py-3 px-3 w-100">
                <p className="text-muted extra-small mb-1">Pending</p>
                <h5 className="fw-semibold text-warning mb-0">{stats.pending}</h5>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm rounded-4 assignment-summary-card w-100">
              <div className="card-body py-3 px-3 w-100">
                <p className="text-muted extra-small mb-1">Submitted</p>
                <h5 className="fw-semibold text-info mb-0">{stats.submitted}</h5>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm rounded-4 assignment-summary-card w-100">
              <div className="card-body py-3 px-3 w-100">
                <p className="text-muted extra-small mb-1">Graded</p>
                <h5 className="fw-semibold text-success mb-0">{stats.graded}</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Filter pills */}
        <div className="d-flex flex-wrap align-items-center justify-content-between mb-3 gap-2">
          <div className="d-flex flex-wrap gap-2">
            {["All", "Pending", "Submitted", "Graded"].map((status) => (
              <button
                key={status}
                type="button"
                className={
                  "btn btn-sm rounded-pill px-3 assignment-filter-btn " +
                  (filter === status ? "active" : "")
                }
                onClick={() => setFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* List container */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden w-100">
          {/* Header row (desktop) */}
          <div className="assignment-header-row d-none d-md-grid px-3 py-2 border-bottom extra-small text-muted">
            <div>Assignment</div>
            <div>Course</div>
            <div>Due Date</div>
            <div>Status</div>
            <div className="text-end">Action</div>
          </div>

          {/* Rows */}
          {filteredAssignments.map((a) => {
            const daysLeft = getDaysLeft(a.due_date);
            const overdue =
              daysLeft < 0 && a.status !== "Submitted" && a.status !== "Graded";

            const dueLabel =
              daysLeft === 0
                ? "Due today"
                : daysLeft > 0
                ? `${daysLeft} day${daysLeft > 1 ? "s" : ""} left`
                : `Overdue by ${Math.abs(daysLeft)} day${
                    Math.abs(daysLeft) > 1 ? "s" : ""
                  }`;

            const dueColorClass = overdue
              ? "text-danger"
              : daysLeft <= 2
              ? "text-warning"
              : "text-muted";

            const actionLabel = getActionLabel(a.status, a.submission_link);

            return (
              <div
                key={a.id}
                className="assignment-row px-3 py-3 border-bottom"
              >
                {/* Assignment column */}
                <div className="assignment-col assignment-col-main">
                  <h6 className="mb-1 fw-semibold">{a.title}</h6>
                  <p className="extra-small text-muted mb-1 assignment-desc">
                    {a.description}
                  </p>
                  <div className="d-flex flex-wrap align-items-center gap-2 extra-small">
                    <span className="text-muted">Instructor:</span>
                    <span className="fw-semibold">{a.instructor}</span>
                    <span className="badge bg-light text-secondary rounded-pill">
                      {a.tag}
                    </span>
                    <span className="badge bg-secondary-subtle text-secondary rounded-pill">
                      {a.marks} marks
                    </span>
                  </div>
                </div>

                {/* Course */}
                <div className="assignment-col assignment-col-course extra-small text-muted">
                  {a.course}
                </div>

                {/* Due date */}
                <div className="assignment-col assignment-col-due extra-small">
                  <div className="text-muted">
                    {new Date(a.due_date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                  <div className={dueColorClass}>{dueLabel}</div>
                </div>

                {/* Status */}
                <div className="assignment-col assignment-col-status">
                  <span className={getStatusBadge(a.status)}>{a.status}</span>
                </div>

                {/* Action */}
                <div className="assignment-col assignment-col-action text-md-end">
                  <button className="btn btn-sm btn-outline-primary rounded-pill extra-small px-3">
                    {actionLabel}
                  </button>
                </div>
              </div>
            );
          })}

          {filteredAssignments.length === 0 && (
            <div className="px-3 py-4 text-center text-muted extra-small">
              No assignments found for this filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Assignments;
