import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeProductFromCart } from "../../Redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.carts);

  const handleRemove = (itemId) => {
    dispatch(removeProductFromCart(itemId));
  };

  const getTotal = () => {
    return cartItems
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleContinueShopping = () => {
    navigate("/A-Zcart/user");
  };

  return (
    <>
      <Container>
        <h5 className="mt-4">Cart Items</h5>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <>
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleRemove(item._id)}
                    >
                      <MdDelete />
                    </Button>
                  </td>
                </tr>
              </>
            ))}
            <tr className="justify-content-end">
              <td colSpan="6">
                <Row className="justify-content-end">
                  <Col md="auto">
                    <h4>Total: ${+getTotal()}</h4>
                  </Col>
                </Row>
              </td>
            </tr>
          </tbody>
        </Table>

        <Row className="justify-content-between mt-4">
          <Col md="auto">
            <Button onClick={handleContinueShopping} variant="primary">
              Continue Shopping
            </Button>
          </Col>
          <Col md="auto">
            <Button
              className={cartItems.length === 0 ? "disabled" : ""}
              onClick={() => navigate("/A-Zcart/page/checkout")}
              variant="success"
            >
              Checkout
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Cart;
