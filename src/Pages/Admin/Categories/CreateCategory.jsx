import { Form, Button, Container } from "react-bootstrap";
import { useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import baseUrl from "../../../utils/url";

function CreateCategory() {
  const [category, setCategory] = useState({});
  const { tokens } = useSelector((state) => state.user); // get token from store
  const navigateTo = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const createCategory = async () => {
      const customAxios = Axios.create({
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokens.accessToken}`,
        },
      });

      const response = await customAxios.post(
        `${baseUrl}/categories/create`,
        category
      );

      if (response.data.statusCode === 200) {
        toast.success(response.data.msg, {
          icon: "✅",
        });
        setTimeout(() => {
          navigateTo("/admin/dashboard/categories");
        }, 1000);
      }

      if (response.data.statusCode === 401) {
        toast.error(response.data.msg, {
          icon: "⚠️",
        });
        setTimeout(() => {
          navigateTo("/admin/dashboard/categories/create");
        }, 1000);
      }

      if (response.data.statusCode === 402) {
        toast.error(response.data.msg, {
          icon: "⚠️",
        });
        setTimeout(() => {
          navigateTo("/admin/dashboard/categories/create");
        }, 1000);
      }
    };

    createCategory();
  };

  const handleChange = (event) => {
    // const { name, value } = event.target;
    // setCategory((prevCategory) => {
    //   return { ...prevCategory, [name]: value };
    // });
    setCategory({ ...category, [event.target.name]: event.target.value });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Container className="my-5">
        <h5>Create Category</h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="categoryInput">
            <Form.Label>Category Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              name="title"
              onChange={handleChange}
            />
          </Form.Group>
          <Button className="my-3" variant="primary" type="submit">
            Create Category
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default CreateCategory;
