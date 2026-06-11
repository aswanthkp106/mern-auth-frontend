import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState({
    _id: "",
    username: "",
    email: "",
    profilePic: ""
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      window.location.href = "/login";
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const changeUsername = async () => {
    if (!username) return alert("Please enter a new username first!");
    if (!user._id) return alert("User ID not found. Please log out and log back in.");

    try {
      // Matches your backend route: /change-username/:id
      const res = await axios.put(`https://mern-auth-backend-lwz3.onrender.com/api/user/change-username/${user._id}`, { username });
      
      const updated = { ...user, username: res.data.username };
      localStorage.setItem("user", JSON.stringify(updated));
      setUser(updated);
      alert("Username changed successfully!");
    } catch (err) {
      console.log(err);
      alert("Failed to change username");
    }
  };

  const changePassword = async () => {
    if (!password) return alert("Please enter a new password first!");
    if (!user._id) return alert("User ID not found. Please log out and log back in.");

    try {
      // Matches your backend route: /change-password/:id
      await axios.put(`https://mern-auth-backend-lwz3.onrender.com/api/user/change-password/${user._id}`, { password });
      alert("Password changed successfully!");
    } catch (err) {
      console.log(err);
      alert("Failed to change password");
    }
  };

  const changeProfilePic = async () => {
    if (!profilePic) return alert("Please select an image file from your gallery first!");
    if (!user._id) return alert("User ID not found. Please log out and log back in.");

    try {
      // Matches the brand new backend route: /update-profilepic/:id
      const res = await axios.put(`https://mern-auth-backend-lwz3.onrender.com/api/user/update-profilepic/${user._id}`, { profilePic });
      
      const updated = { ...user, profilePic: res.data.profilePic };
      localStorage.setItem("user", JSON.stringify(updated));
      setUser(updated);
      alert("Profile picture updated successfully!");
    } catch (err) {
      console.log(err);
      alert("Failed to update profile picture");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const deleteUser = async () => {
    if (window.confirm("Are you sure you want to delete your account permanently?")) {
      if (!user._id) return alert("User ID not found.");

      try {
        // Matches your backend route: /delete-user/:id
        await axios.delete(`https://mern-auth-backend-lwz3.onrender.com/api/user/delete-user/${user._id}`);
        localStorage.removeItem("user");
        alert("Account deleted");
        window.location.href = "/";
      } catch (err) {
        console.log(err);
        alert("Failed to delete account");
      }
    }
  };

  return (
    <div>
      <nav className="dash-nav">
        <span className="dash-brand">Control Center Dashboard</span>
        <button onClick={logout} className="logout-nav-btn">Logout</button>
      </nav>

      <div className="dash-main-grid">
        <div className="dash-card profile-panel">
          <div className="avatar-wrapper">
            <img
              src={user.profilePic || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
              alt="Profile Avatar"
              className="avatar-img-element"
            />
          </div>
          <h2 className="dash-user-name">Welcome, {user.username}</h2>
          <p className="dash-user-email">{user.email}</p>
        </div>

        <div className="dash-card">
          <h3 className="settings-title">Account Management</h3>

          <div className="control-row-item">
            <label className="field-label">Change Profile Name</label>
            <div className="inline-input-group">
              <input type="text" placeholder="Enter new username" onChange={(e) => setUsername(e.target.value)} className="modern-input" />
              <button onClick={changeUsername} className="row-action-btn">Update</button>
            </div>
          </div>

          <div className="control-row-item">
            <label className="field-label">Change Account Password</label>
            <div className="inline-input-group">
              <input type="password" placeholder="Enter new password" onChange={(e) => setPassword(e.target.value)} className="modern-input" />
              <button onClick={changePassword} className="row-action-btn">Update</button>
            </div>
          </div>

          <div className="control-row-item">
            <label className="field-label">Upload New Profile Photo</label>
            <div className="inline-input-group">
              <input type="file" accept="image/*" onChange={handleFileChange} className="modern-input" />
              <button onClick={changeProfilePic} className="row-action-btn">Update</button>
            </div>
          </div>

          <div className="danger-section">
            <div className="danger-alert-box">
              <div>
                <h4 style={{ color: "#ef4444", fontSize: "1rem", fontWeight: "700", marginBottom: "4px" }}>Permanently Delete Account</h4>
                <p style={{ color: "#94a3b8", fontSize: "0.8rem", margin: 0 }}>This operation is instant and completely clears your database records.</p>
              </div>
              <button onClick={deleteUser} className="danger-btn">Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;