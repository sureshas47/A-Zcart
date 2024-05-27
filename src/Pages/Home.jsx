import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/features/products/productSlice";
import Products from "../Components/PageComponents/Products";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const products = useSelector(
    (state) => state.products?.productData?.payload?.data
  );
  const isLoading = useSelector((state) => state.products?.isLoading);
  const error = useSelector((state) => state.products?.error);

  return (
    <>
      <Products products={products} isLoading={isLoading} error={error} />
    </>
  );
};

export default Home;
