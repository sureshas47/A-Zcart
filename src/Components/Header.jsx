import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaUserLarge } from "react-icons/fa6";
import "../App.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";

const Header = () => {
  const productCount = useSelector((state) => state.cart.productCount);
  const user = useSelector((state) => state.user.userData);
  return (
    <>
      <header>
        <Navbar bg="light" variant="dark">
          <Container>
            <Row className="d-flex justify-content-between align-items-center w-100">
              <Col className="d-flex align-items-center">
                <Navbar.Brand className="text-dark" href="/">
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
                <Link to={"/cart"} className="text-decoration-none">
                  <AiOutlineShoppingCart size={30} color="red" />
                  <sup
                    style={{
                      color: "black",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    {productCount ? productCount : ""}
                  </sup>
                </Link>
                <span className="mx-3"></span>
              </Col>

              <Col>
                <Dropdown>
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                    <FaUserLarge color="red" size={25} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">{user?.email}</Dropdown.Item>
                    <Dropdown.Item href="#">{user?.userName}</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#">Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
