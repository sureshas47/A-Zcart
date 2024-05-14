import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Layout from "../Components/Layout/Layout";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/features/products/productSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const products = useSelector(
    (state) => state.products?.productData?.payload?.data
  );
  const isLoading = useSelector((state) => state.products?.isLoading);
  const error = useSelector((state) => state.products?.error);

  return (
    <>
      <Layout>
        <Container>
          <Row className="mt-5">
            <h1>Products</h1>
            <Container>
              <Row className="g-3">
                {isLoading && (
                  <Col>
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </Col>
                )}
                {error && (
                  <Col>
                    <p>{error}</p>
                  </Col>
                )}
                {!isLoading &&
                  !error &&
                  products?.map((product) => (
                    <Col key={product?._id} sm={6} md={4} lg>
                      <Card style={{ width: "14rem" }}>
                        <Card.Img
                          variant="top"
                          src={`http://localhost:9000/${product?.imageUrl}`}
                        />
                        <Card.Body>
                          <Card.Title>{product?.title}</Card.Title>
                          <Card.Text>{product?.description}</Card.Text>
                          <Card.Text>CAD {product?.price}/-</Card.Text>
                          <Card.Text>
                            {product.isInStock ? "In Stock" : "Not In Stock"}
                          </Card.Text>
                          <Button variant="primary">Add To Cart</Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </Container>
          </Row>
        </Container>
      </Layout>
    </>
  );
};

export default Home;
