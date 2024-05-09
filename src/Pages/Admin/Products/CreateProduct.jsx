import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function CreateProduct() {
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const instance = Axios.create({
        headers: { "Content-Type": "application/json" },
      });
      const response = await instance.get(
        "http://localhost:9000/api/v1/categories"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return []; // Return empty array in case of error
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetchCategories();
      setCategories(response.payload.data);
    };

    getCategories();
  }, []);

  const { tokens } = useSelector((state) => state.user); // get token from store
  const navigateTo = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const createProduct = async () => {
      const customAxios = Axios.create({
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokens.accessToken}`,
        },
      });
      const response = await customAxios.post(
        "http://localhost:9000/api/v1/products/create",
        product
      );

      if (response.data.statusCode === 200) {
        toast.success(response.data.msg, {
          icon: "✅",
        });
        setTimeout(() => {
          navigateTo("/admin/dashboard/products");
        }, 1000);
      }

      if (response.data.statusCode === 401) {
        toast.error(response.data.msg, {
          icon: "⚠️",
        });
        setTimeout(() => {
          navigateTo("/admin/dashboard/products/create");
        }, 1000);
      }

      if (response.data.statusCode === 402) {
        toast.error(response.data.msg, {
          icon: "⚠️",
        });
        setTimeout(() => {
          navigateTo("/admin/dashboard/products/create");
        }, 1000);
      }
    };

    createProduct();
  };

  const handleChange = (event) => {
    if (event.target.name === "image") {
      if (event.target.files && event.target.files.length > 0) {
        const imageUrl = URL.createObjectURL(event.target.files[0]);
        setProduct({ ...product, imageUrl }); // Set imageUrl in the state
      }
    }
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Container className="my-5">
        <h5>Create Category</h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="productTitleInput">
            <Form.Label>Product Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product"
              name="title"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="productPriceInput">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Price"
              name="price"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="productDescriptionInput">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Description"
              name="description"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="productImageUrlInput">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              placeholder="Choose a Product Image"
              name="imageUrl"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="productCategorySelect">
            <Form.Label>Product Category</Form.Label>
            <Form.Select
              aria-label="Select option"
              name="category"
              onChange={handleChange}
            >
              <option>Select Category</option>
              {categories.map((category) => {
                return (
                  <>
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  </>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Button className="my-3" variant="primary" type="submit">
            Create Category
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default CreateProduct;
