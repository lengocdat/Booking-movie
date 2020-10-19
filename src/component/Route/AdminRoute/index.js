import React from "react";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {
const credentialsString = localStorage.getItem("credentials");
const loaiNguoiDung = JSON.parse(credentialsString)?.maLoaiNguoiDung
  return (
    <Route
      {...rest}
      render={(props) =>
        loaiNguoiDung==="QuanTri" ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default AdminRoute;