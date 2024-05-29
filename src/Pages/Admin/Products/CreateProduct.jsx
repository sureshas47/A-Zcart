import { Form, Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function CreateProduct() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [isLoading, isSetLoading] = useState(true);
  // const [isBlocking, setIsBlocking] = useState(false);

  const fetchCategories = async () => {
    try {
      const instance = Axios.create({
        headers: { "Content-Type": "application/json" },
      });
      const response = await instance.get(`${baseUrl}/categories`);
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
      isSetLoading(false);
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
          navigateTo("/admin/products");
        }, 1000);
      }

      if (response.data.statusCode === 401) {
        toast.error(response.data.msg, {
          icon: "⚠️",
        });
        setTimeout(() => {
          navigateTo("/admin/products/create");
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
    setProduct({ ...product, [event.target.name]: event.target.value });
    // setIsBlocking(event.target.value.length > 0);
  };

  const handleImageUpload = async (event) => {
    // const { value, name } = event;
    const image = event.target.files[0];
    //  send image to server as formData
    const formData = new FormData();
    formData.append("imageUrl", image);
    const customAxios = Axios.create();
    const response = await customAxios.post(
      "http://localhost:9000/profile",
      formData
    );
    setProduct({
      ...product,
      [event.target.name]: response.data.payload.data.path,
    });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Container className="my-5">
        <h5>Create Product</h5>
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
          <Form.Group controlId="productCategorySelect">
            <Form.Label>Product Category</Form.Label>
            <Form.Select
              aria-label="Select option"
              name="category"
              onChange={handleChange}
            >
              {isLoading ? (
                <option>Loading...</option>
              ) : (
                <>
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  ))}
                </>
              )}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="productImageUrlInput">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              placeholder="Choose a Product Image"
              name="imageUrl"
              onChange={handleImageUpload}
            />
            <Form.Label className="text-success">
              {product.imageUrl ? "Upload Success: " + product.imageUrl : ""}
            </Form.Label>
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
