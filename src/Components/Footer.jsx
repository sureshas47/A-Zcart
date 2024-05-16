import { Container, Row, Col } from "react-bootstrap";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { RiSecurePaymentLine, RiCustomerService2Fill } from "react-icons/ri";
import { CiInstagram, CiTwitter, CiFacebook } from "react-icons/ci";
import {
  FaApple,
  FaGooglePlay,
  FaCcPaypal,
  FaCcStripe,
  FaCcVisa,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <Container className="mt-5 footer" fluid>
        <Row>
          <Col md={4}>
            <Row className="d-flex justify-content-center align-items-center">
              <Col md={6} lg={4} xl={3}>
                <MdOutlineDeliveryDining size={100} color="red" />
              </Col>
              <Col md={6} lg={8} xl={9}>
                <h5>Free Delivery</h5>
                <p className="text-muted">For all orders over $100</p>
              </Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row className="d-flex justify-content-center align-items-center">
              <Col md={6} lg={4} xl={3}>
                <RiSecurePaymentLine size={100} color="red" />
              </Col>
              <Col md={6} lg={8} xl={9}>
                <h5>Secure Payment</h5>
                <p className="text-muted">On every transaction</p>
              </Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row className="d-flex justify-content-center align-items-center">
              <Col md={6} lg={4} xl={3}>
                <RiCustomerService2Fill size={100} color="red" />
              </Col>
              <Col md={6} lg={8} xl={9}>
                <h5>Customer Support</h5>
                <p className="text-muted">24/7 available for you</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <hr />
        <Row className="mt-5 ">
          <Col md={4}>
            <h5>About Company</h5>
            <nav className="nav flex-column">
              <a className="nav-link px-0 text-muted" href="#">
                About us
              </a>
              <a className="nav-link px-0 text-muted" href="#">
                Terms of use
              </a>
              <a className="nav-link px-0 text-muted" href="#">
                Links
              </a>
            </nav>
          </Col>
          <Col md={4}>
            <h5>Company Link</h5>
            <nav className="nav flex-column">
              <a className="nav-link px-0 text-muted" href="#">
                Return & Refund
              </a>
              <a className="nav-link px-0 text-muted" href="#">
                Privacy policy
              </a>
            </nav>
          </Col>
        </Row>
        <hr />
        <Row className="mt-5 gx-4">
          <Col md={2}>
            <h5 className="mb-4">Connect</h5>
            <Row className="mb-4">
              <Col>
                <Link to={"#"}>
                  {" "}
                  <CiFacebook size={30} color="red" />
                </Link>
              </Col>
              <Col>
                {" "}
                <Link to={"#"}>
                  {" "}
                  <CiInstagram size={30} color="red" />
                </Link>
              </Col>
              <Col>
                {" "}
                <Link to={"#"}>
                  {" "}
                  <CiTwitter size={30} color="red" />
                </Link>
              </Col>
            </Row>
          </Col>
          <Col md={5}>
            <h5 className="mb-4">Download App</h5>
            <Row className="d-flex justify-content-start gy-3 align-items-center mb-4">
              <Col lg={4} className="btn-download">
                {" "}
                <Link
                  to={"#"}
                  className="text-decoration-none d-flex justify-content-center align-items-center"
                >
                  <FaApple size={30} color="white" />{" "}
                  <strong className="text-white">App Store</strong>
                </Link>
              </Col>
              <Col lg={1}></Col>
              <Col lg={4} className="btn-download">
                {" "}
                <Link
                  to={"#"}
                  className="text-decoration-none d-flex justify-content-center align-items-center"
                >
                  <FaGooglePlay size={30} color="black" />{" "}
                  <strong className="text-white">Play Store</strong>
                </Link>
              </Col>
            </Row>
          </Col>
          <Col md={5}>
            <h5 className="mb-4">Payment Methods</h5>
            <Row>
              <Col>
                <FaCcPaypal size={100} color="red" />
              </Col>
              <Col>
                <FaCcStripe size={100} color="red" />
              </Col>
              <Col>
                <FaCcVisa size={100} color="red" />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </>
  );
}

export default Footer;
