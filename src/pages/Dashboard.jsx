return (
  <div className="bg-light min-vh-100">
    {/* 1. Top Professional Navigation Bar */}
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3 mb-5">
      <div className="container">
        <span className="navbar-brand fw-bold tracking-wide">
          Account Management Portal
        </span>
        <button 
          onClick={logout} 
          className="btn btn-outline-light btn-sm px-3 fw-semibold rounded-2"
        >
          Logout
        </button>
      </div>
    </nav>

    {/* 2. Main Content Container Grid */}
    <div className="container pb-5">
      <div className="row g-4">
        
        {/* LEFT COLUMN: User Information Card */}
        <div className="col-12 col-md-4">
          <div className="card shadow-sm border border-secondary border-opacity-25 rounded-3 bg-white p-4 text-center">
            
            {/* Fallback layout for missing or empty user profile pictures */}
            <div className="mb-3 position-relative d-inline-block mx-auto">
              <img
                src={user.profilePic || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80"}
                alt="Profile"
                className="rounded-circle border border-dark border-2 p-1 object-cover shadow-sm"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
            </div>

            <h3 className="fw-bold text-dark mb-1">
              {user.username}
            </h3>
            <p className="text-muted small mb-0 font-monospace">
              {user.email}
            </p>
            
            <hr className="my-4 text-secondary opacity-25" />
            
            <div className="text-start">
              <span className="badge bg-secondary bg-opacity-10 text-dark border border-dark border-opacity-10 py-2 px-3 w-100 rounded-2 text-center small fw-semibold">
                Status: Verified Account
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Account Control Forms */}
        <div className="col-12 col-md-8">
          <div className="card shadow-sm border border-secondary border-opacity-25 rounded-3 bg-white p-4 p-sm-5">
            
            <h4 className="fw-bold text-dark mb-4 border-bottom pb-2">
              Account Settings
            </h4>

            {/* ACTION 1: Change Username */}
            <div className="mb-4 bg-light p-3 rounded-3 border border-secondary border-opacity-10">
              <label className="form-label text-dark fw-bold small mb-2">
                Update Profile Name
              </label>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Enter new username"
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control border-secondary border-opacity-50 py-2"
                />
                <button
                  onClick={changeUsername}
                  className="btn btn-dark fw-semibold px-4"
                >
                  Update
                </button>
              </div>
            </div>

            {/* ACTION 2: Change Password */}
            <div className="mb-4 bg-light p-3 rounded-3 border border-secondary border-opacity-10">
              <label className="form-label text-dark fw-bold small mb-2">
                Change Account Password
              </label>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control border-secondary border-opacity-50 py-2"
                />
                <button
                  onClick={changePassword}
                  className="btn btn-dark fw-semibold px-4"
                >
                  Update
                </button>
              </div>
            </div>

            {/* ACTION 3: Change Profile Picture */}
            <div className="mb-5 bg-light p-3 rounded-3 border border-secondary border-opacity-10">
              <label className="form-label text-dark fw-bold small mb-2">
                Update Profile Photo URL
              </label>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="https://example.com/photo.jpg"
                  onChange={(e) => setProfilePic(e.target.value)}
                  className="form-control border-secondary border-opacity-50 py-2"
                />
                <button
                  onClick={changeProfilePic}
                  className="btn btn-dark fw-semibold px-4"
                >
                  Update
                </button>
              </div>
            </div>

            {/* DANGER ZONE SECTION */}
            <div className="border-top border-danger border-opacity-25 pt-4 mt-2">
              <h5 className="text-danger fw-bold small uppercase tracking-wider mb-3">
                Danger Zone
              </h5>
              <div className="d-flex align-items-center justify-content-between p-3 bg-danger bg-opacity-10 border border-danger border-opacity-25 rounded-3">
                <div>
                  <h6 className="fw-bold text-dark mb-0 small">Delete this account permanent</h6>
                  <p className="text-muted mb-0 small" style={{ fontSize: "12px" }}>
                    Once deleted, your account details cannot be retrieved.
                  </p>
                </div>
                <button
                  onClick={deleteUser}
                  className="btn btn-danger fw-semibold px-4 py-2 btn-sm rounded-2"
                >
                  Delete Account
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
);