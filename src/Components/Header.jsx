import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import PersonIcon from "@mui/icons-material/Person";
import "../App.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header>
        <nav>
          <Navbar bg="light" variant="dark">
            <Container>
              <Row className="d-flex justify-content-between align-items-center w-100">
                <Col className="d-flex align-items-center">
                  <Navbar.Brand className="text-dark" href="#home">
                    A-Z Cart
                  </Navbar.Brand>
                </Col>
                <Col md={6} className="d-flex align-items-center">
                  <Form inline className="w-100">
                    <Form.Control
                      type="text"
                      placeholder="Search Products"
                      className="mr-sm-2 w-100"
                    />
                  </Form>
                </Col>
                <Col className="d-none d-md-flex align-items-center justify-content-end">
                  {/* <ShoppingCartIcon
                    className="my-search-input"
                    fontSize="large"
                    color="action"
                  /> */}
                  <p>Shop</p>
                  <span className="mx-3"></span>
                  <Link to={"/login"}>
                    {/* <PersonIcon fontSize="large" color="action" /> */}
                    <p>Login</p>
                  </Link>{" "}
                </Col>
              </Row>
            </Container>
          </Navbar>
        </nav>
      </header>
    </>
  );
};

export default Header;
