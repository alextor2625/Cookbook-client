import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <NavLink to="/" className="navbar-brand">
        CookBook
      </NavLink>
      <NavLink to="/profile">
        Profile
      </NavLink>
      <NavLink to="/signup">
        Signup
      </NavLink>
      <NavLink to="/login">
        Login
      </NavLink>
      <NavLink to='/explore'>
        Explore
      </NavLink>
      <NavLink to='/browse/recipes'>
        Browse Recipes
      </NavLink>
      
    </div>
</nav>
  )
}

export default Navbar