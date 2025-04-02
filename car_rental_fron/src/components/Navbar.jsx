import React from 'react'
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="p-4 bg-blue-500 text-white flex justify-between">
      <h1 className="text-lg font-bold">AuthApp</h1>
      <div>
        {token ? (
          <>
            <Link className="mr-4" to="/profile">Profile</Link>
            <Link className="mr-4" to="/all-users">All Users</Link>
            <Link className="mr-4" to="/create-user">Create User</Link>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link className="mr-4" to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
