import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import baseUrl from "../../../utils/url";

function ListCategories() {
  const [categories, setCategories] = useState([]);

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
    };

    getCategories();
  }, []);

  return (
    <div>
      <Container className="mt-5">
        <Button
          variant="success"
          className="mb-5"
          as={Link}
          to="/admin/dashboard/categories/create"
        >
          Add Category
        </Button>
        <h5>List Categories</h5>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => {
              return (
                <React.Fragment key={index}>
                  <tr>
                    <td style={{ textTransform: "capitalize" }}>
                      {category.title}
                    </td>
                    <td style={{ textTransform: "capitalize" }}>
                      {category.slug}
                    </td>
                    <td>{category.createdAt}</td>
                    <td style={{ width: "170px" }}>
                      <Row>
                        <Col>
                          <Link
                            className="btn btn-danger"
                            to={`/admin/dashboard/categories/delete/${category._id}`}
                          >
                            Delete
                          </Link>
                        </Col>
                        <Col>
                          <Button className="btn btn-primary">Edit</Button>
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
    </div>
  );
}
export default ListCategories;
