import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { CookbooksContext } from "../context/cookbooks.context";
import { post } from "../services/authService";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Select from "react-select";

const AddToCookBook = ({ recipeId }) => {
  const { user } = useContext(AuthContext);
  const { setNewCookbook } = useContext(CookbooksContext);
  const options = user.cookbooks.map((cookbook) => {
    return { value: cookbook._id, label: cookbook.name };
  });

  const [selectedValues, setSelectedValues] = useState([]);

  const handleAddToCookbook = async () => {
    const promises = selectedValues.map((selected) => {
      return post(`/cookbooks/add/${selected.value}/${recipeId}`);
    });
    await Promise.all(promises);
    setNewCookbook(true);
  };

  const handleSelectChange = (e) => {
    setSelectedValues(e);
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="mx-auto"> {/* Center the Select */}
          <Form.Group>
            <Form.Label>Choose multiple options:</Form.Label>
            <Select
              isMulti
              options={options}
              value={selectedValues}
              onChange={handleSelectChange}
              className="scrollable-multi-select"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary" onClick={handleAddToCookbook}>
            Add to Cookbook
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AddToCookBook;
