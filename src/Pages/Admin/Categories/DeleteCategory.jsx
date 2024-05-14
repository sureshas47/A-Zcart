import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
// import { toast } from "react-toastify";

function DeleteCategory() {
  const navigateTo = useNavigate();
  const { tokens } = useSelector((state) => state.user);
  console.log(tokens, "TOKEN");
  const { categoryId } = useParams(); // get id from params

  const deleteCategoryByID = async () => {
    try {
      const instance = Axios.create({
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      });
      const response = await instance.delete(
        `http://localhost:9000/api/v1/categories/${categoryId}`
      );
      if (response.status === 200) {
        // toast.success("Category deleted successfully");
        navigateTo("/admin/dashboard/categories");
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    deleteCategoryByID();
  });
  // deleteCategoryByID();
}

export default DeleteCategory;
