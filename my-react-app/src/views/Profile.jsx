import React, { useEffect, useState } from "react";
// import Card from "../components/Card";
import coursesData from "../../coursesData";
import CourseSection from "../components/CourseSection";

function Profile() {
  const user = {
    name: "Diprati Das",
    email: "diprati@example.com",
    joined: "January 2025",
    bio: "A passionate learner exploring the world of technology and development.",
    avatar: "./images/card_image.png",
  };

  return (
    <div className="py-3 py-md-4 w-100">
      {/* Profile Header */}
      <section className="container-xxl text-center mb-5 w-100">
        <img
          src={user.avatar}
          alt="Profile"
          className="rounded-circle mb-3"
          width="150"
          height="150"
          style={{ objectFit: "cover" }}
        />
        <h2 className="fw-bold text-dark">{user.name}</h2>
        <p className="text-muted mb-1">{user.email}</p>
        <p className="text-muted small">Joined {user.joined}</p>
        <p className="text-secondary mt-3">{user.bio}</p>

        <button className="btn btn-outline-primary mt-2 px-4">
          Edit Profile
        </button>
      </section>

      {/* Enrolled Courses */}
      <section className="enrolled-courses w-100 px-5">
        <h3 className="fw-bold text-dark mb-4 text-center">
          My Enrolled Courses
        </h3>

        <CourseSection title="" courses={coursesData.slice(0, 5)} />
      </section>
    </div>
  );
}

export default Profile;
