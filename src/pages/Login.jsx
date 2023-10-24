import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";

import { Link, useNavigate } from "react-router-dom";

import { post } from "../services/authService";
import { Button, Form } from "react-bootstrap";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
  
    const { storeToken, authenticateUser } = useContext(AuthContext)
    
    const navigate = useNavigate();
  
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
  
    
    const handleLoginSubmit = (e) => {
      e.preventDefault();
      const requestBody = { email, password };
   
      post('/auth/login', requestBody)
        .then((response) => {
        // Request to the server's endpoint `/auth/login` returns a response
        // with the JWT string ->  response.data.authToken
          console.log('JWT token', response.data.authToken );
          storeToken(response.data.authToken)
          authenticateUser()
          navigate('/');                             // <== ADD      
        })
        .catch((error) => {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        })
    };
    
    return (
      <div className="LoginPage">
        <h1>Login</h1>
        <Form onSubmit={handleLoginSubmit}>
        <Form.Group className="mb-3">
          <Form.Label> Email: </Form.Label>
          <Form.Control
            name="email"
            type="text"
            value={email}
            onChange={handleEmail}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label> Password: </Form.Label>
          <Form.Control
            name="password"
            type="password"
            value={password}
            onChange={handlePassword}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Login</Button>
        </Form>
        { errorMessage && <p className="error-message">{errorMessage}</p> }
  
        <p>Don't have an account yet?</p>
        <Link to="/signup"> Sign Up</Link>
      </div>
    )
}

export default Login