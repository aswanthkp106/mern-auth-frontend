import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    profilePic: ""
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");

  // Safely load profile data out of local storage when page mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      window.location.href = "/login";
    }
  }, []);

  // Handles reading the file from your phone/computer gallery and converting it to a string
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result); // Saves Base64 text data to state
      };
      reader.readAsDataURL(file); // Reads the physical file data
    }
  };

  const changeUsername = async () => {
    if (!username) return alert("Please enter a new username first!");
    const secureToken = user.token || user.accessToken;

    try {
      const res = await axios.put("https://mern-auth-backend-lwz3.onrender.com/api/user/update-username", { username }, {
        headers: { Authorization: `Bearer ${secureToken}` }
      });
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
    const secureToken = user.token || user.accessToken;

    try {
      await axios.put("https://mern-auth-backend-lwz3.onrender.com/api/user/change-password", { password }, {
        headers: { Authorization: `Bearer ${secureToken}` }
      });
      alert("Password changed successfully!");
    } catch (err) {
      console.log(err);
      alert("Failed to change password");
    }
  };

  const changeProfilePic = async () => {
    if (!profilePic) return alert("Please select an image file from your gallery first!");
    const secureToken = user.token || user.accessToken;

    try {
      const res = await axios.put("https://mern-auth-backend-lwz3.onrender.com/api/user/update-profilepic", { profilePic }, {
        headers: { Authorization: `Bearer ${secureToken}` }
      });
      
      // Handles whatever key name your backend uses to return the updated picture field
      const serverImage = res.data?.profilePic || res.data?.profileImage || res.data?.avatar || res.data?.user?.profilePic || profilePic;
      
      const updated = { ...user, profilePic: serverImage };
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
      const secureToken = user.token || user.accessToken;

      try {
        await axios.delete("https://mern-auth-backend-lwz3.onrender.com/api/user/delete", {
          headers: { Authorization: `Bearer ${secureToken}` }
        });
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
      {/* Top Professional Navigation Header */}
      <nav className="dash-nav">
        <span className="dash-brand">Control Center Dashboard</span>
        <button onClick={logout} className="logout-nav-btn">Logout</button>
      </nav>

      {/* Main Content Layout Grid */}
      <div className="dash-main-grid">
        
        {/* LEFT PANEL: Circular Avatar Status Panel */}
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

        {/* RIGHT PANEL: Settings Configuration Actions */}
        <div className="dash-card">
          <h3 className="settings-title">Account Management</h3>

          {/* Action Row 1: Username mutation */}
          <div className="control-row-item">
            <label className="field-label">Change Profile Name</label>
            <div className="inline-input-group">
              <input 
                type="text" 
                placeholder="Enter new username" 
                onChange={(e) => setUsername(e.target.value)} 
                className="modern-input" 
              />
              <button onClick={changeUsername} className="row-action-btn">Update</button>
            </div>
          </div>

          {/* Action Row 2: Password mutation */}
          <div className="control-row-item">
            <label className="field-label">Change Account Password</label>
            <div className="inline-input-group">
              <input 
                type="password" 
                placeholder="Enter new password" 
                onChange={(e) => setPassword(e.target.value)} 
                className="modern-input" 
              />
              <button onClick={changePassword} className="row-action-btn">Update</button>
            </div>
          </div>

          {/* Action Row 3: File Uploader from Gallery */}
          <div className="control-row-item">
            <label className="field-label">Upload New Profile Photo</label>
            <div className="inline-input-group">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="modern-input" 
              />
              <button onClick={changeProfilePic} className="row-action-btn">Update</button>
            </div>
          </div>

          {/* Bottom Destructive Operational Panel */}
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