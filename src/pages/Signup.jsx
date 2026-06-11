import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Signup() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    profilePic: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://mern-auth-backend-lwz3.onrender.com/api/auth/signup",
        user
      );
      console.log(res.data);
      alert("Signup successful");
      window.location.href = "/login";
    } catch (err) {
      console.log(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="container" style={{ maxWidth: "450px" }}>
        <div className="card shadow-sm border border-secondary border-opacity-25 rounded-3 bg-white p-4 p-sm-5">
          
          {/* Header Section */}
          <div className="text-center mb-4">
            <h2 className="fw-bold text-dark mb-1">Create an Account</h2>
            <p className="text-muted small">Sign up to access your dashboard management</p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit}>
            
            {/* Username Input */}
            <div className="mb-3">
              <label className="form-label text-dark fw-semibold small">Username</label>
              <input
                type="text"
                name="username"
                className="form-control border-secondary border-opacity-50 py-2"
                placeholder="Enter your username"
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Input */}
            <div className="mb-3">
              <label className="form-label text-dark fw-semibold small">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control border-secondary border-opacity-50 py-2"
                placeholder="name@example.com"
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <label className="form-label text-dark fw-semibold small">Password</label>
              <input
                type="password"
                name="password"
                className="form-control border-secondary border-opacity-50 py-2"
                placeholder="••••••••"
                onChange={handleChange}
                required
              />
            </div>

            {/* Profile Picture Input */}
            <div className="mb-4">
              <label className="form-label text-dark fw-semibold small">Profile Picture URL</label>
              <input
                type="text"
                name="profilePic"
                className="form-control border-secondary border-opacity-50 py-2"
                placeholder="https://example.com/image.jpg"
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn btn-dark w-100 py-2 fw-semibold mb-3 rounded-2"
              style={{ transition: "all 0.2s" }}
            >
              Sign Up
            </button>

          </form>

          {/* Footer Navigation Link */}
          <div className="text-center mt-2">
            <p className="text-muted small mb-0">
              Already have an account?{" "}
              <Link to="/login" className="text-dark fw-bold text-decoration-none border-bottom border-dark pb-1">
                Login here
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Signup;