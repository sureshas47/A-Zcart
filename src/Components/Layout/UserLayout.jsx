import Header from "../Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Aside from "../Aside";
import Banner from "../Banner";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <Header />
      <Container>
        {" "}
        <Row>
          <Col lg={3}>
            <Aside />
          </Col>
          <Col lg={9}>
            <Banner />
          </Col>
        </Row>
      </Container>
      <Row>
        {/* outlet autometically renders its children from the parent route */}
        <Outlet />
      </Row>

      <Footer />
    </>
  );
};

export default UserLayout;
