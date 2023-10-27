import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { UsersContext } from "../context/users.context";
import { post } from "../services/authService";
import { uploadImg } from "../services/uploadService";
import { Button, Form, Container, Row, Col } from "react-bootstrap";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { authenticateUser, storeToken } = useContext(AuthContext);
  const { setNewUsers } = useContext(UsersContext);

  const navigate = useNavigate();

  const handleInput = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "file":
        setFile(e.target.files[0]);
        break;
      default:
        console.log("ERROR", e.target.name);
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    let requestBody;

    if (file) {
      uploadImg(file)
        .then((response) => {
          requestBody = { email, password, name, image: response.data.fileUrl };
          post(`/auth/signup`, requestBody)
            .then((response) => {
              storeToken(response.data.authToken);
              authenticateUser();
              setNewUsers(true);
              navigate("/profile");
            })
            .catch((error) => {
              const errorDescription = error.response.data.message;
              setErrorMessage(errorDescription);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      requestBody = { email, password, name };
      post(`/auth/signup`, requestBody)
        .then((response) => {
          storeToken(response.data.authToken);
          authenticateUser();
          setNewUsers(true);
          navigate("/profile");
        })
        .catch((error) => {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        });
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center">Sign Up</h1>
          <Form onSubmit={handleSignupSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Profile Image:</Form.Label>
              <Form.Control name="file" type="file" onChange={handleInput} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                name="name"
                type="text"
                value={name}
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                name="email"
                type="text"
                value={email}
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                name="password"
                type="password"
                value={password}
                onChange={handleInput}
              />
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
            </div>
          </Form>
          {errorMessage && <p className="error-message text-center">{errorMessage}</p>}
          <p className="text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
