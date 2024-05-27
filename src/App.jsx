import "bootstrap/dist/css/bootstrap.min.css";
import MyRoutes from "./Routes/MyRoutes";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { getUserData } from "./Redux/features/user/userSlice";

function App() {
  const [cookies] = useCookies(["accessToken"]); // get accen token from cookie
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cookies.accessToken) {
      dispatch(getUserData(null));
    } else {
      dispatch(getUserData(cookies.accessToken)); // send cookie to store
    }
  }, [cookies.accessToken, dispatch]);

  return (
    <>
      <MyRoutes />
    </>
  );
}

export default App;
