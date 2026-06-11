import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: ""
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
      const res = await axios.post("https://mern-auth-backend-lwz3.onrender.com/api/auth/login", user);
      localStorage.setItem("user", JSON.stringify(res.data));
      alert("Login successful");
      window.location.href = "/dashboard";
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="portal-title">Welcome Back</h1>
        <p className="portal-subtitle">Secure sign-in to your control dashboard</p>

        <form onSubmit={handleSubmit}>
          <div className="input-field-group">
            <label className="field-label">Email Address</label>
            <input type="email" name="email" className="modern-input" placeholder="name@example.com" onChange={handleChange} required />
          </div>

          <div className="input-field-group">
            <label className="field-label">Password</label>
            <input type="password" name="password" className="modern-input" placeholder="••••••••" onChange={handleChange} required />
          </div>

          <button type="submit" className="action-btn">Sign In</button>
        </form>

        <p className="redirect-footer">
          Don't have an account? <Link to="/" className="accent-link">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;