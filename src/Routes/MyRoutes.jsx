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

  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      {/* User route */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Route>

      {/* Page route */}
      <Route element={<PageLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="cart" element={<Cart />} />
        <Route path="product/:productId" element={<ProductDetails />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Admin route */}
      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<Admin />} />
        <Route path="unauthorized" element={<ErrorPage />} />
        <Route path="categories/create" element={<CreateCategory />} />
        <Route
          path="categories/delete/:categoryId"
          element={<DeleteCategory />}
        />
        <Route path="categories" element={<ListCategories />} />
        <Route path="products" element={<ListProducts />} />
        <Route path="products/create" element={<CreateProduct />} />
        <Route path="products/delete/:productId" element={<DeleteProduct />} />
      </Route>
    </Routes>
  );
};

export default MyRoutes;
