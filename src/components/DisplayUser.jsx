import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import { UsersContext } from "../context/users.context";

const DisplayUser = ({ userId, handleEditProfile, variant }) => {
  const { users } = useContext(UsersContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(users.find((usr) => userId == usr._id));
  }, [users, user, userId]);

  return (
    <div className="d-flex justify-content-center align-items-center">
      {user && (
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={6} lg={4}>
              <Image
                src={user.image}
                alt="User Image"
                fluid
                rounded
                className="mx-auto d-block"
              />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} md={6} lg={4} className="text-center">
              <h1 className="mb-4">{variant ? `${user.name}'s Profile` : "Your Profile"}</h1>
              {!variant &&<p className="mb-3" style={{ fontSize: "1.6rem" }} >Name: {user.name}</p>}
              <p className="mb-3" style={{ fontSize: "1.6rem" }}>Email: {user.email}</p>
              <p className="mb-3" style={{ fontSize: "1.6rem" }}>Total Recipes: {user.recipes?.length}</p>
              <p className="mb-3" style={{ fontSize: "1.6rem" }}>Total CookBooks: {user.cookbooks?.length}</p>
              <p className="mb-3" style={{ fontSize: "1.6rem" }}>Total Reviews: {user.reviews?.length}</p>
            </Col>
          </Row>
          {handleEditProfile && (
            <Row className="justify-content-center">
              <Col xs={12} md={6} lg={4} className="text-center">
                <Button variant="primary" onClick={handleEditProfile}>
                  Edit
                </Button>
              </Col>
            </Row>
          )}
        </Container>
      )}
    </div>
  );
};

export default DisplayUser;
