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
    <div className="container">
    <h1 className="text-center">Profile Edit</h1>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3 text-center">
        <Form.Label className="form-label">Image</Form.Label>
        <div className="row justify-content-center">
          <div className="col-3">
            <Form.Control
              className="form-control text-center"
              name="image"
              type="file"
              onChange={handleFile}
            />
          </div>
        </div>
      </Form.Group>
  
      <Form.Group className="mb-3 text-center">
        <Form.Label>Name:</Form.Label>
        <div className="row justify-content-center">
          <div className="col-3"> {/* Adjust the column width */}
            <Form.Control
              className="form-control text-center"
              name="name"
              type="text"
              value={userEdit.name}
              onChange={handleTextChange}
            />
          </div>
        </div>
      </Form.Group>
      <Form.Group className="mb-3 text-center">
        <Form.Label>Email:</Form.Label>
        <div className="row justify-content-center">
          <div className="col-3"> {/* Adjust the column width */}
            <Form.Control
              className="form-control text-center"
              name="email"
              type="email"
              value={userEdit.email}
              onChange={handleTextChange}
            />
          </div>
        </div>
      </Form.Group>
  
      <div className="d-flex justify-content-center">
        <Button variant="primary" type="submit" className="me-2">
          Save
        </Button>
        <Button variant="secondary" onClick={handleEditProfile} className="me-2">
          Cancel
        </Button>
        <Button variant="danger" onClick={deleteUser}>
          Delete User
        </Button>
      </div>
  
      {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
    </Form>
  </div>
  

  

  );
};

export default EditUser;
