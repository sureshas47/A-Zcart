import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Layout from "../Components/Layout/Layout";

const Home = () => {
  return (
    <>
      <Layout>
        <Container>
          <Row>
            <h1>Product List</h1>
            <Container>
              <Row className="g-3 ">
                <Col sm={6} md={4} lg>
                  <Card style={{ width: "14rem" }}>
                    <Card.Img variant="top" src="holder.js/100px140" />
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the cards content.
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={6} md={4} lg>
                  <Card style={{ width: "14rem" }}>
                    <Card.Img variant="top" src="holder.js/100px140" />
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the cards content.
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={6} md={4} lg>
                  <Card style={{ width: "14rem" }}>
                    <Card.Img variant="top" src="holder.js/100px140" />
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the cards content.
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={6} md={4} lg>
                  <Card style={{ width: "14rem" }}>
                    <Card.Img variant="top" src="holder.js/100px140" />
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the cards content.
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={6} md={4} lg>
                  <Card style={{ width: "14rem" }}>
                    <Card.Img variant="top" src="holder.js/100px140" />
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the cards content.
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Row>
        </Container>
      </Layout>
    </>
  );
};

export default Home;
