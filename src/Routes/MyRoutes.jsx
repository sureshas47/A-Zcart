import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Admin from "../Pages/Admin/Admin";
import ListCategories from "../Pages/Admin/Categories/ListCategories";
import CreateCategory from "../Pages/Admin/Categories/CreateCategory";
import ListProducts from "../Pages/Admin/Products/ListProducts";
import CreateProduct from "../Pages/Admin/Products/CreateProduct";
// import { useSelector } from "react-redux";
import ErrorPage from "../Pages/ErrorPage";
import DeleteCategory from "../Pages/Admin/Categories/DeleteCategory";
import DeleteProduct from "../Pages/Admin/Products/DeleteProduct";
import Cart from "../Components/PageComponents/Cart";
import ProductDetails from "../Components/PageComponents/ProductDetails";

const MyRoutes = () => {
  // const user = useSelector((state) => state.user.userData);
  // const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add-to-cart" element={<Cart />} />
      <Route path="/product/:productId" element={<ProductDetails />} />

      {/* admin route */}
      <Route path="/admin/dashboard" element={<Admin />} />
      <Route path="/unauthorized" element={<ErrorPage />} />

      <Route
        path="/admin/dashboard/categories/create"
        element={<CreateCategory />}
      />
      <Route
        path="/admin/dashboard/categories/delete/:categoryId"
        element={<DeleteCategory />}
      />
      {/* <Route
        path="/admin/dashboard/categories/create"
        element={
          user?.userType === "admin" ? (
            // Only render CreateCategory for admin users
            <CreateCategory />
          ) : (
            // Redirect other users to the unauthorized page
            <Navigate to="/unauthorized" replace />
          )
        }
      /> */}
      <Route path="/admin/dashboard/categories" element={<ListCategories />} />
      <Route path="/admin/dashboard/products" element={<ListProducts />} />
      <Route
        path="/admin/dashboard/products/create"
        element={<CreateProduct />}
      />
      <Route
        path="/admin/dashboard/products/delete/:productId"
        element={<DeleteProduct />}
      />
    </Routes>
  );
};

export default MyRoutes;
