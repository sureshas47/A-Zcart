import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../../Redux/features/products/singleProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProductToCart } from "../../Redux/features/cart/cartSlice";

const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [dispatch, productId]);

  const product = useSelector((state) => state.singleProduct);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Logic to add product to cart
    dispatch(
      addProductToCart({ ...product?.singleProduct?.product, quantity })
    );
    navigate("/cart");
  };

  return (
    <Container>
      <Row className="my-4">
        <Col md={6}>
          <Image
            src={`http://localhost:9000/${product?.singleProduct?.product?.imageUrl}`}
            fluid
          />
        </Col>
        <Col md={6}>
          <h1>{product?.singleProduct?.product?.title}</h1>
          <p>{product?.singleProduct?.product?.description}</p>
          <h3>${product?.singleProduct?.product?.price}</h3>
          <Form>
            <Form.Group controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
              />
            </Form.Group>
            <Button
              className="mt-4"
              variant="primary"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
