import React from "react";
import { Container, Row, Col, Form, Image } from "react-bootstrap";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

function Checkout() {
  const domain = import.meta.env.VITE_DOMAIN;
  const [formData, setFormData] = React.useState({});
  const { userData } = useSelector((state) => state?.user);
  const carts = useSelector((state) => state?.cart?.carts);
  const cart = useSelector((state) => state?.cart);

  let fees = {
    deliveryFee: 0,
    serviceCharge: 5,
    tax: 13,
  };
  const calculateSubTotal = () => {
    return carts.reduce((acc, currentObj) => {
      let total = acc + currentObj["price"];
      // let netTotal=total*currentObj.quantity
      return total;
    }, 0);
  };

  const calculateNetTotal = (subTotal) => {
    return subTotal + (subTotal * fees["tax"]) / 100 + fees["serviceCharge"];
  };

  // get the id of each product in the cart
  const products = carts?.map((cart) => cart._id);
  const sendData = {
    shippingAddress: formData.shippingAddress,
    payment: formData.paymentMethod,
    user: userData.userId,
    products: products,
    orderItems: carts,
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleOrderPlacement = (e) => {
    e.preventDefault();
  };

  const steps = [
    {
      label: "Shipping Details",
      description: (
        <Form>
          <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Control
              type="text"
              placeholder="Enter Shipping Address"
              name="shippingAddress"
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              Never share your address with anyone else.
            </Form.Text>
          </Form.Group>
        </Form>
      ),
    },
    {
      label: "Payment Method",
      description: (
        <Form>
          <Form.Group className="mb-3" controlId="formBasicPayment">
            <Form.Select name="paymentMethod" onChange={handleChange}>
              <option>Select Payment Method</option>
              <option>Credit Card</option>
              <option>Debit Card</option>
              <option>Cash on Delivery</option>
            </Form.Select>
            <Form.Text className="text-muted">
              Ensure your payment method is valid.
            </Form.Text>
          </Form.Group>
        </Form>
      ),
    },
    {
      label: "Finish",
      description: `You are almost done!`,
    },
  ];

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      {/* <PageLayout> */}
      <Container className="mt-5">
        <Row>
          <Col sm={6}>
            <Box sx={{ maxWidth: 400 }}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel
                      optional={
                        index === 2 ? (
                          <Typography variant="caption">Last step</Typography>
                        ) : null
                      }
                    >
                      {step.label}
                    </StepLabel>
                    <StepContent>
                      <Typography>{step.description}</Typography>
                      <Box sx={{ mb: 2 }}>
                        <div>
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            {index === steps.length - 1 ? "Finish" : "Continue"}
                          </Button>
                          <Button
                            disabled={index === 0}
                            onClick={handleBack}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            Back
                          </Button>
                        </div>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                  <Typography>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                    Reset
                  </Button>
                </Paper>
              )}
            </Box>
          </Col>
          <Col sm={6} className="bg-light">
            {carts.map((cart) => (
              <>
                <Row key={cart?._id} className="mt-2">
                  <Col lg={2}>
                    <Image
                      style={{ height: "100px", width: "100px" }}
                      src={`${domain}/${cart?.imageUrl}`}
                      fluid
                    />
                  </Col>
                  <Col lg={8}>
                    <p>{cart?.title}</p>
                    <p className="text-muted">{`Quantity: ${cart?.quantity}`}</p>
                  </Col>
                  <Col lg={2}>{cart?.price}</Col>
                  <hr />
                </Row>
              </>
            ))}

            <Row>
              <Col xs={10}>
                <p>Number of Items:</p>
                <p>Subtotal:</p>
                <p>Tax:</p>
                <p>Net Total:</p>
              </Col>
              <Col xs={2}>
                <p> {cart?.productCount}</p>
                <p>{calculateSubTotal()}</p>
                <p>13%</p>
                <p>{calculateNetTotal(calculateSubTotal())}</p>
              </Col>
              {activeStep === steps.length && (
                <Paper
                  square
                  elevation={0}
                  style={{
                    backgroundColor: "Red",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  <Button variant="primary" onClick={handleOrderPlacement}>
                    Place Order
                  </Button>
                </Paper>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Checkout;
