import { useEffect, useState } from "react";
import { Col, Container, Form, Navbar, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AdminLayout() {
  const user = useSelector((state) => state?.user?.userData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || user?.userType !== "admin") {
    console.log(user?.userType, "User Data");
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Row className="d-flex justify-content-between align-items-center w-100">
            <Col className="d-flex align-items-center">
              <Navbar.Brand className="text-dark" href="/admin/dashboard">
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
            <Col className="d-none d-md-flex align-items-center justify-content-end"></Col>
          </Row>
        </Container>
      </Navbar>
      {/* outlet autometically renders its children from the parent route */}
      <Outlet />
    </div>
  );
}

export default AdminLayout;
