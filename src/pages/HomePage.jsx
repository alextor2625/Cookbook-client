import { Container, Row, Col, Jumbotron, Button } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container>
      <Row className="justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <Col>
          <Jumbotron>
            <h1 className="display-3 text-center">Welcome to CookBook</h1>
            <p className="lead text-center">Discover and share delicious recipes.</p>
            <img
              src="https://res.cloudinary.com/dg2rwod7i/image/upload/v1698428024/Cookbook/cookbook-gallery/ay8t36ndyslphr5lmljk.jpg"
              alt="HomePageLogo"
              className="img-fluid"
            />
            <p className="text-center">
              <Button variant="primary">Get Started</Button>
            </p>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;