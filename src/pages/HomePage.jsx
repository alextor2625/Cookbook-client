import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container className="text-center" style={{ minHeight: "100vh" }}>
      <Row className="justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <Col>
          <h1 className="display-3">Welcome to CookBook</h1>
          <p className="lead">Discover and share delicious recipes.</p>
          <img
            src="https://res.cloudinary.com/dg2rwod7i/image/upload/v1698428024/Cookbook/cookbook-gallery/ay8t36ndyslphr5lmljk.jpg"
            alt="HomePageLogo"
            className="img-fluid"
          />
          {/* <p>
            <Button variant="primary">Get Started</Button>
          </p> */}
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
