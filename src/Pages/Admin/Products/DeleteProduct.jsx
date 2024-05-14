import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function DeleteProduct() {
  const navigateTo = useNavigate();
  const { tokens } = useSelector((state) => state.user);
  const { productId } = useParams(); // get id from params

  const deleteProductByID = async () => {
    try {
      const instance = Axios.create({
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      });
      const response = await instance.delete(
        `http://localhost:9000/api/v1/products/${productId}`
      );
      if (response.status === 200) {
        navigateTo("/admin/dashboard/products", {
          state: { msg: response.data.msg, deleted: true },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    deleteProductByID();
  });

  // deleteProductByID();
}
export default DeleteProduct;
