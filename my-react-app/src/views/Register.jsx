import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authServices from "../services/auth.service";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authServices.registerService(form);
      navigate("/login");
    } catch {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-12 col-md-6 col-lg-4 mx-auto">
          <div className="card w-100 shadow border-0 p-4">
            <h4 className="fw-bold text-center mb-3">Create Account</h4>

            <form onSubmit={handleSubmit} className="d-grid gap-3">
              <input
                name="name"
                className="form-control"
                placeholder="Full Name"
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                onChange={handleChange}
                required
              />

              <button className="btn btn-primary" disabled={loading}>
                {loading ? "Creating..." : "Register"}
              </button>
            </form>

            <p className="text-center small mt-3">
              Already have an account?{" "}
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;