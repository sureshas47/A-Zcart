import React from "react";
import { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function ListProducts() {
  const [products, setProducts] = useState([]);
  // const location = useLocation(); // Get the location object where path and state passed in the URL comes in

  // const state = location.state;
  // console.log(state);
  // if (state?.deleted === true) {
  //   toast.success(state.msg);
  // }

  const fetchProducts = async () => {
    try {
      const instance = Axios.create({
        headers: { "Content-Type": "application/json" },
      });
      const response = await instance.get(
        "http://localhost:9000/api/v1/products"
      );
      return response.data;
    } catch (error) {
      return []; // Return empty array in case of error
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response.payload.data);
      } catch (error) {
        setProducts([]); // Set products to empty array if there's an error
      }
    };

    getProducts();
  }, []);

  return (
    <React.Fragment>
      <ToastContainer position="top-right" autoClose={3000} />

      <Container className="mt-5">
        <Button
          variant="success"
          className="mb-5"
          as={Link}
          to="/admin/dashboard/products/create"
        >
          Add Product
        </Button>
        <h5>List Products</h5>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>Price</th>
              <th>Description</th>
              <th>Category</th>
              <th>Date Created</th>
              <th>Is Available</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <React.Fragment key={product._id}>
                  <tr>
                    <td>{product.title}</td>
                    <td>{product.slug}</td>
                    <td>{product.price}</td>
                    <td>{product.description}</td>
                    <td>{product?.category?.title}</td>
                    <td>{product.createdAt}</td>
                    <td>{product.isInStock}</td>
                    <td>
                      <img
                        src={`http://localhost:9000/${product.imageUrl}`}
                        width={100}
                        height={100}
                        alt={`${product.slug}`}
                      />
                    </td>
                    <td style={{ width: "170px" }}>
                      <Row>
                        <Col>
                          <Link
                            className="btn btn-danger"
                            to={`/admin/dashboard/products/delete/${product._id}`}
                          >
                            Delete
                          </Link>
                        </Col>
                        <Col>
                          <Link
                            className="btn btn-primary"
                            to={`/admin/dashboard/products/edit/${product._id}`}
                          >
                            Edit
                          </Link>
                        </Col>
                      </Row>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </React.Fragment>
  );
}

export default ListProducts;
