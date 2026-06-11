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

  // Convert uploaded image file to string text
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({
          ...user,
          profilePic: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://mern-auth-backend-lwz3.onrender.com/api/auth/signup", user);
      alert("Signup successful");
      window.location.href = "/login";
    } catch(err) {
      console.log(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="portal-title">Create Account</h1>
        <p className="portal-subtitle">Join us to manage your personalized workspace</p>

        <form onSubmit={handleSubmit}>
          <div className="input-field-group">
            <label className="field-label">Username</label>
            <input type="text" name="username" className="modern-input" placeholder="Enter username" onChange={handleChange} required />
          </div>

          <div className="input-field-group">
            <label className="field-label">Email Address</label>
            <input type="email" name="email" className="modern-input" placeholder="name@example.com" onChange={handleChange} required />
          </div>

          <div className="input-field-group">
            <label className="field-label">Password</label>
            <input type="password" name="password" className="modern-input" placeholder="••••••••" onChange={handleChange} required />
          </div>

          <div className="input-field-group">
            <label className="field-label">Upload Profile Picture</label>
            <input type="file" accept="image/*" className="modern-input" onChange={handleFileChange} />
          </div>

          <button type="submit" className="action-btn">Sign Up</button>
        </form>

        <p className="redirect-footer">
          Already have an account? <Link to="/login" className="accent-link">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;