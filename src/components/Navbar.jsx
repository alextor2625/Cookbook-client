import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


const Navbar = () => {
  const { logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const getToken = () => {
    return localStorage.getItem("authToken");
  };
  const handleLogOut = () => {
    console.log("Logging out..."); // Add this line for debugging
    logOutUser();
    console.log("Logged out successfully!"); // Add this line for debugging
    // navigate("/");
  };
  
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          CookBook
        </NavLink>
        {getToken() ? (
          <>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink onClick={handleLogOut} to={'/'}>Logout</NavLink>
            <NavLink to="/explore">Explore</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/signup">Signup</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
        <NavLink to="/browse/recipes">Browse Recipes</NavLink>

      </div>
    </nav>
  );
};

export default Navbar;
