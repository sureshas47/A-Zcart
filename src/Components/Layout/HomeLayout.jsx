import Header from "../Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Aside from "../Aside";
import Banner from "../Banner";
import Footer from "../Footer";
import PropTypes from "prop-types"; // Import PropTypes

const Layout = ({ children }) => {
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
        {/* <Main children={children} /> */}
        <main>{children}</main>
      </Row>

      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
