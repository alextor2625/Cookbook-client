import React, { useContext, useState } from "react";
import { post } from "../services/authService";
import { Form, Button } from "react-bootstrap";
import { AuthContext } from "../context/auth.context";
import { uploadImg } from "../services/uploadService";
import { CookbooksContext } from "../context/cookbooks.context";
import { ReviewsContext } from "../context/reviews.context";
import { UsersContext } from "../context/users.context";

const CreateCookBook = () => {
  const [createNewCookBook, setCreateNewCookBook] = useState({
    name: "",
  });
  const [file, setFile] = useState(null);
  const { user, setNewUser, authenticateUser, storeToken } =
    useContext(AuthContext);
  const { cookbooks, setNewCookbook } = useContext(CookbooksContext);
  const { setNewReview } = useContext(ReviewsContext);
  const { setNewUsers } = useContext(UsersContext);
  const handleTextChange = (e) => {
    setCreateNewCookBook((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFile = (e) => setFile(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      uploadImg(file).then((response) => {
        post("/cookbooks/create", {
          ...createNewCookBook,
          image: response.data.fileUrl,
        })
          .then((response) => {
            console.log(response.data);
            storeToken(response.data.authToken);
            authenticateUser();
            setNewCookbook(true);
            setNewUser(true);
            setNewReview(true);
            setNewUsers(true);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      post("/cookbooks/create", createNewCookBook)
        .then((response) => {
          console.log(response.data);
          storeToken(response.data.authToken);
          authenticateUser();
          setNewCookbook(true);
          setNewUser(true);
          setNewReview(true);
          setNewUsers(true);
          window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="container">
      <h1 className="text-center">New CookBook</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 text-center">
          <Form.Label className="form-label">CookBook Image</Form.Label>
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
            <div className="col-3">
              <Form.Control
                className="form-control text-center"
                name="name"
                type="text"
                value={createNewCookBook.name}
                onChange={handleTextChange}
              />
            </div>
          </div>
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateCookBook;
