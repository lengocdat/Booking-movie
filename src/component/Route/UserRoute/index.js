import React from "react";
import { Route, Redirect } from "react-router-dom";

const UserRoute = ({ component: Component, ...rest }) => {
const credentialsString = localStorage.getItem("credentials");
const loaiNguoiDung = JSON.parse(credentialsString)?.maLoaiNguoiDung
  return (
    <Route
      {...rest}
      render={(props) =>
        loaiNguoiDung==="KhachHang" ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default UserRoute;