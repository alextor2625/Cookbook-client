import React from 'react'
import { NavLink } from 'react-router-dom'
import Signup from './../pages/Signup';
import ExplorePage from './../pages/ExplorePage';

const Navbar = () => {
  return (
    <nav>
    <div>
      <NavLink to="/">
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