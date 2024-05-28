import { useEffect, useState } from "react";
import {
  CButton,
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownDivider,
  CDropdownMenu,
} from "@coreui/react";
import "../App.css";
import Axios from "axios";
import { Row } from "react-bootstrap";
import baseUrl from "../utils/url";

export default function Aside() {
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
    <>
      <aside className="mt-3">
        <Row>
          {categories?.map((category) => (
            <CDropdown
              key={category._id}
              variant="btn-group"
              direction="dropend"
            >
              <CButton className="categories">
                {category.title} <CDropdownToggle className="category-toggle" />
              </CButton>
              <CDropdownMenu>
                <CDropdownItem href="#">Action</CDropdownItem>
                <CDropdownItem href="#">Another action</CDropdownItem>
                <CDropdownItem href="#">Something else here</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem href="#">Separated link</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          ))}
        </Row>
      </aside>
    </>
  );
}
