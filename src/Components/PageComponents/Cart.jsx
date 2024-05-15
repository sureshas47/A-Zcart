import React, { useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";

const Cart = () => {
  // Sample cart items
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Item 1", price: 10.0, quantity: 2 },
    { id: 2, name: "Item 2", price: 15.0, quantity: 1 },
    { id: 3, name: "Item 3", price: 20.0, quantity: 3 },
  ]);

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const getTotal = () => {
    return cartItems
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
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
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <Button variant="danger" onClick={() => handleRemove(item.id)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Row className="justify-content-end">
        <Col md="auto">
          <h4>Total: ${getTotal()}</h4>
        </Col>
      </Row>
      <Row className="justify-content-end">
        <Col md="auto">
          <Button variant="success">Checkout</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
