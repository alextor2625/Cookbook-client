import { useContext, useState } from "react";
import { del, post } from "../services/authService";
import { Form, Button } from "react-bootstrap";
import { AuthContext } from "../context/auth.context";
import { uploadImg } from "../services/uploadService";
import { useNavigate } from "react-router-dom";

const EditUser = ({ handleEditProfile }) => {
  const { user, authenticateUser, storeToken, removeToken } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [file, setFile] = useState(null);
  const [userEdit, setUserEdit] = useState({
    name: user.name,
    email: user.email,
  });

const navigate = useNavigate()

  const handleTextChange = (e) => {
    setUserEdit((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const deleteUser = () => {
    del("/users/delete").then((response) => {
      console.log(response.data.message);
      removeToken();
      authenticateUser();
      navigate("/");
    });
  };

  const handleFile = (e) => setFile(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      uploadImg(file).then((response) => {
        post("/users/update", { ...userEdit, image: response.data.fileUrl })
          .then((response) => {
            console.log(response.data);
            storeToken(response.data.authToken);
            authenticateUser();
            window.location.reload(false);
          })
          .catch((error) => {
            setErrorMessage(error.response.data.message);
          });
      });
    } else {
      post("/users/update", userEdit)
        .then((response) => {
          console.log(response.data);
          storeToken(response.data.authToken);
          authenticateUser();
          handleEditProfile();
          window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <h1>Profile Edit</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Profile Image</Form.Label>
          <Form.Control
            className="form-control"
            name="image"
            type="file"
            onChange={handleFile}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> Name: </Form.Label>
          <Form.Control
            name="name"
            type="text"
            value={userEdit.name}
            onChange={handleTextChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label> Email: </Form.Label>
          <Form.Control
            name="email"
            type="email"
            value={userEdit.email}
            onChange={handleTextChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
      <Button variant="primary" onClick={handleEditProfile}>
        Cancel
      </Button>
      <Button variant="primary" onClick={deleteUser}>
        Delete User
      </Button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default EditUser;
