import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { AuthContext } from "../context/auth.context";


const Nabar = () => {
  const { logOutUser } = useContext(AuthContext);
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
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          CookBook
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {getToken() ? (
              <>
                <Nav.Link as={NavLink} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={handleLogOut} as={NavLink} to="/">
                  Logout
                </Nav.Link>
                <Nav.Link as={NavLink} to="/explore">
                  Explore
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/signup">
                  Signup
                </Nav.Link>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
              </>
            )}
            <Nav.Link as={NavLink} to="/browse/recipes">
              Browse Recipes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Nabar;
