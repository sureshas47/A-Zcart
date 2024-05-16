import Header from "../Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Aside from "../Aside";
import Banner from "../Banner";
import Footer from "../Footer";
import PropTypes from "prop-types"; // Import PropTypes

const PageLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Row>
        {/* <Main children={children} /> */}
        <main>{children}</main>
      </Row>

      <Footer />
    </>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
