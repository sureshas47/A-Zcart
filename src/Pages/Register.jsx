import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseUrl from "../utils/url";

const Register = () => {
  const [registerationInfo, setRegisterationInfo] = useState({});

  const navigate = useNavigate();

  const handleChange = (event) => {
    setRegisterationInfo({
      ...registerationInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const customAxios = axios.create({
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await customAxios.post(
        `${baseUrl}/signup`,
        registerationInfo
      );
      // toast
      if (response.status === 200) {
        toast.success(response.data.message, {
          icon: "✅",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 403) {
        toast.error(error.response.data.message, {
          icon: "⚠️",
        });
      } else {
        toast.error(error.response.data.message, {
          icon: "❌",
        });
      }
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Container>
        <div
          className="modal show"
          style={{ display: "block", position: "initial" }}
        >
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Create an account</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUserName">
                  <Form.Label>User name</Form.Label>
                  <Form.Control
                    type="Name"
                    placeholder="Enter username"
                    onChange={handleChange}
                    name="userName"
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={handleChange}
                    name="email"
                  />
                  <Form.Text className="text-muted">
                    We will never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                  <Form.Label>Phone number</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter phone number"
                    onChange={handleChange}
                    name="phoneNumber"
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    name="password"
                  />
                </Form.Group>

                <Modal.Footer className="d-flex justify-content-between align-items-center">
                  <Button
                    className="w-100 mb-3"
                    variant="primary"
                    type="submit"
                  >
                    Register
                  </Button>
                  <Link to="/login">Already have an account? Login</Link>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal.Dialog>
        </div>
      </Container>
    </>
  );
};
export default Register;
