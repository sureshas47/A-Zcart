import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../Redux/features/cart/cartSlice";

function Products({ products, isLoading, error }) {
  const domain = import.meta.env.VITE_DOMAIN;

  const dispatch = useDispatch();

  const handleAddToCart = (e, product) => {
    e.preventDefault(); // avoid page refresh
    e.stopPropagation(); // avoid event bubble
    const productPayload = { id: product?._id, ...product, quantity: 1 };
    dispatch(addProductToCart(productPayload));
    toast.success("Product added to cart");
  };

  return (
    <div>
      <Container>
        <ToastContainer position="bottom-center" autoClose={1000} />
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
                    <Link
                      className="text-decoration-none"
                      to={`/A-Zcart/page/product/${product?._id}`}
                    >
                      <Card style={{ width: "14rem" }}>
                        <Card.Img
                          variant="top"
                          src={`${domain}/${product?.imageUrl}`}
                        />
                        <Card.Body>
                          <Card.Title>{product?.title}</Card.Title>
                          <Card.Text>{product?.description}</Card.Text>{" "}
                          <Card.Text className="text-muted">
                            {product?.category?.title}
                          </Card.Text>
                          <Card.Text>
                            CAD {product?.price}/-{" "}
                            <span className="w-100">
                              {product.isInStock ? (
                                <small className="text-success">In Stock</small>
                              ) : (
                                <small className="text-danger">
                                  Not In Stock
                                </small>
                              )}
                            </span>
                          </Card.Text>
                          <Button
                            variant="primary"
                            onClick={(e) => handleAddToCart(e, product)}
                          >
                            Add To Cart
                          </Button>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                ))}
            </Row>
          </Container>
        </Row>
      </Container>
    </div>
  );
}
Products.propTypes = {
  products: PropTypes.array,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};

export default Products;
