import { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Axios from "axios";
import { Link } from "react-router-dom";

function ListProducts() {
  const [products, setProducts] = useState([]);

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
            <th>Image</th>
            <th>Category</th>
            <th>Date Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <>
                <tr key={product._id}>
                  <td>{product.title}</td>
                  <td>{product.slug}</td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                  <td>{product.imageUrl}</td>
                  <td>{product?.category?.title}</td>
                  <td>{product.createdAt}</td>
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
              </>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default ListProducts;
