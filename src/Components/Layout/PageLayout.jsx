import Header from "../Header";
import Row from "react-bootstrap/esm/Row";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

const PageLayout = () => {
  return (
    <>
      <Header />
      <Container>
        <Row>
          {/* outlet autometically renders its children from the parent route */}
          <Outlet />
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default PageLayout;
