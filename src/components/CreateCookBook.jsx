import { useContext, useState } from "react";
import { post } from "../services/authService";
import { Form, Button } from "react-bootstrap";
import { AuthContext } from "../context/auth.context";
import { uploadImg } from "../services/uploadService";
import { CookbooksContext } from "../context/cookbooks.context";

const CreateCookBook = () => {
  const [createNewCookBook, setCreateNewCookBook] = useState({
    name: "",
  });
  const [file, setFile] = useState(null);
  const { authenticateUser, storeToken } = useContext(AuthContext);
  const { setNewCookBook } = useContext(CookbooksContext);
  const handleTextChange = (e) => {
    setCreateNewCookBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
            setNewCookBook(true)
            // window.location.reload(false);
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
          setNewCookBook(true)
          // window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <h1>New CookBook</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="form-label">CookBook Image</Form.Label>
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
            value={createNewCookBook.name}
            onChange={handleTextChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateCookBook;
