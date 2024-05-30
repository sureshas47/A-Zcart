import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaUserLarge } from "react-icons/fa6";
import "../App.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { logoutUser } from "../Redux/features/user/userSlice";
import { useCookies } from "react-cookie";

const Header = () => {
  const productCount = useSelector((state) => state.cart.productCount);
  const user = useSelector((state) => state.user.userData);
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);

  const handleLogout = () => {
    removeCookie("accessToken");
    dispatch(logoutUser());
  };
  return (
    <>
      <header>
        <Navbar bg="light" variant="dark">
          <Container>
            <Row className="d-flex justify-content-between align-items-center w-100">
              <Col className="d-flex align-items-center">
                <Link to={"/"} className="text-decoration-none">
                  <Navbar.Brand className="text-dark">A-Z Cart</Navbar.Brand>
                </Link>
                {/* <Navbar.Brand className="text-dark">A-Z Cart</Navbar.Brand> */}
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
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    {productCount ? productCount : ""}
                  </sup>
                </Link>
              </Col>

              <Col>
                {isLoggedIn ? (
                  <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                      <FaUserLarge color="red" size={25} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#">{user?.email}</Dropdown.Item>
                      <Dropdown.Item href="#">{user?.userName}</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleLogout}>
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Link to={"/login"}>
                    <FaUserLarge color="red" size={25} />
                  </Link>
                )}
              </Col>
            </Row>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
