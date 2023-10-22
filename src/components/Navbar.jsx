import React from 'react'
import { NavLink } from 'react-router-dom'
import Signup from './../pages/Signup';

const Navbar = () => {
  return (
    <nav className="">
    <div className="">
      <NavLink className="" to="/">
        Home
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
      
    </div>
</nav>
  )
}

export default Navbar