import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";
import { setUserData } from "../Redux/features/user/userSlice";
import { useDispatch } from "react-redux";
import { getUserDetailsFromToken } from "../helpers/jwt";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [loginInfo, setLoginInfo] = useState({});
  const dispatch = useDispatch();

  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
  const navigateTo = useNavigate();

  const handleChange = (event) => {
    setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const customAxios = Axios.create({
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await customAxios.post(`${baseUrl}/login`, loginInfo);
      removeCookie("accessToken"); // removing previous token
      setCookie("accessToken", response.data.token); // setting token in a cookie
      dispatch(setUserData(response.data.token)); // dispatch action

      // toast
      if (response.status === 200) {
        toast.success(response.data.msg, {
          icon: "✅",
        });

        const decoded = getUserDetailsFromToken(response.data.token); // userDetails from token

        if (decoded.userType === "admin") {
          setTimeout(() => {
            navigateTo("/admin/dashboard");
          }, 1000);
        } else {
          setTimeout(() => {
            navigateTo("/");
          }, 1000);
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 403) {
        toast.error(error.response.data.msg, {
          icon: "❌",
        });
      } else {
        toast.error(error.response.data.msg, {
          icon: "❌",
        });
      }
    }
  };

  return (
    <>
      <Container>
        <ToastContainer position="top-right" autoClose={3000} />
        <div
          className="modal show"
          style={{ display: "block", position: "initial" }}
        >
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Login to an account</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Modal.Footer className="d-flex justify-content-between align-items-center">
                  <Button
                    className="w-100 mb-3"
                    variant="primary"
                    type="submit"
                  >
                    Login
                  </Button>
                  <Link to="/register"> Not have an account? Register</Link>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal.Dialog>
        </div>
      </Container>
    </>
  );
};
export default Login;
