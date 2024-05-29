import { Routes, Route, Navigate } from "react-router-dom";
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
import Checkout from "../Components/PageComponents/Checkout";
import UserLayout from "../Components/Layout/UserLayout";
import PageLayout from "../Components/Layout/PageLayout";
import AdminLayout from "../Components/Layout/AdminLayout";
import { useSelector } from "react-redux";

const MyRoutes = () => {
  const user = useSelector((state) => state.user.userData);

  // const location = useLocation();
  // A-Zcart is the base url for all routes, see vite.config.js

  return (
    <Routes>
      {/* User route 1 */}
      <Route element={<UserLayout />}>
        <Route path="/A-Zcart" element={<Home />} />
        <Route path="/A-Zcart/about" element={<About />} />
      </Route>
      {/* User route 2 */}
      <Route element={<PageLayout />}>
        <Route path="/A-Zcart/login" element={<Login />} />
        <Route path="/A-Zcart/register" element={<Register />} />
        <Route path="/A-Zcart/cart" element={<Cart />} />
        <Route
          path="/A-Zcart/product/:productId"
          element={<ProductDetails />}
        />
        <Route path="/A-Zcart/checkout" element={<Checkout />} />
      </Route>

      {/* Admin route */}
      <Route path="/A-Zcart/admin" element={<AdminLayout />}>
        <Route path="/A-Zcart/dashboard" element={<Admin />} />
        <Route path="/A-Zcart/unauthorized" element={<ErrorPage />} />
        <Route path="/A-Zcart/categories/create" element={<CreateCategory />} />
        <Route
          path="/A-Zcart/categories/delete/:categoryId"
          element={<DeleteCategory />}
        />
        <Route path="/A-Zcart/categories" element={<ListCategories />} />
        <Route path="/A-Zcart/products" element={<ListProducts />} />
        <Route path="/A-Zcart/products/create" element={<CreateProduct />} />
        <Route
          path="/A-Zcart/products/delete/:productId"
          element={<DeleteProduct />}
        />
      </Route>
    </Routes>
  );
};

export default MyRoutes;
