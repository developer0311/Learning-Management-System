import api from "./api.js";

const courseServices = {
  // Get all courses (public)
  getAllCourses: () => api.get("/courses"),

  // Get single course by ID (public)
  getCourseById: (courseId) => api.get(`/courses/${courseId}`),

  // Create new course (instructor/admin)
  createCourse: (data) => api.post("/courses", data),

  // Update existing course (instructor/admin)
  updateCourse: (courseId, data) =>
    api.put(`/courses/${courseId}`, data),

  // Delete course (instructor/admin)
  deleteCourse: (courseId) =>
    api.delete(`/courses/${courseId}`),
};

export default courseServices;