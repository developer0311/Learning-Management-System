import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authServices from "../services/auth.service";
import LoadingButton from "../components/Loaders/LoadingButton";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authServices.loginService(form);

      // assume backend returns token
      localStorage.setItem("token", res.data.token);
      window.dispatchEvent(new Event("authChange"));

      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-12 col-md-6 col-lg-4 mx-auto">
          <div className="card w-100 shadow border-0 p-4">
            <h4 className="fw-bold text-center mb-3">Welcome Back</h4>
            <p className="text-muted text-center small mb-4">
              Login to continue learning
            </p>

            <form onSubmit={handleSubmit} className="d-grid gap-3">
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

              <LoadingButton
              type="submit"
              className="btn btn-primary w-100"
              loading={loading}
              text="Login"
              loadingText="Logging in..."
              />
              
            </form>

            <p className="text-center small mt-3">
              Don’t have an account?{" "}
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;