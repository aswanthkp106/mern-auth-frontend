import { useState } from "react";
import axios from "axios";

function Dashboard() {

  const storedUser = localStorage.getItem("user");

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (!user) {
    return <h1>No user logged in</h1>;
  }

  // CHANGE USERNAME
  const changeUsername = async () => {

    try {

      const res = await axios.put(
        `http://localhost:5000/api/auth/change-username/${user._id}`,
        { username }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      alert("Username updated");

      window.location.reload();

    } catch(err) {

      console.log(err);

      alert("Failed to update username");

    }

  };

  // CHANGE PASSWORD
  const changePassword = async () => {

    try {

      await axios.put(
        `http://localhost:5000/api/auth/change-password/${user._id}`,
        { password }
      );

      alert("Password updated");

    } catch(err) {

      console.log(err);

      alert("Failed to update password");

    }

  };

  // DELETE ACCOUNT
  const deleteUser = async () => {

    try {

      await axios.delete(
        `http://localhost:5000/api/auth/delete-user/${user._id}`
      );

      localStorage.removeItem("user");

      alert("Account deleted");

      window.location.href = "/";

    } catch(err) {

      console.log(err);

      alert("Failed to delete account");

    }

  };

  return (

    <div>

      <h1>Dashboard</h1>

      <h2>
        Welcome {user.username}
      </h2>

      <hr />

      <h3>Change Username</h3>

      <input
        type="text"
        placeholder="New Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <button onClick={changeUsername}>
        Change Username
      </button>
      
      <hr />

      <h3>Change Password</h3>

      <input
        type="password"
        placeholder="New Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={changePassword}>
        Change Password
      </button>

      <hr />

      <h3>Delete Account</h3>

      <button onClick={deleteUser}>
        Delete Account
      </button>

    </div>

  );
}

export default Dashboard;