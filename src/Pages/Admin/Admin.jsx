import React from "react";
import { useSelector } from "react-redux";

const Admin = () => {
  const user = useSelector((state) => state.user.userData.userName);

  return (
    <div>
      <p>hy {user}</p>
      <p>Admin Dashboard</p>
    </div>
  );
};

export default Admin;
