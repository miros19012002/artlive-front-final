import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../api/api";
import { ADMIN, parseUserRole } from "../utils/parseUserRole";

const AdminRoute = ({ component }) => {
  const { isAuth } = useSelector((state) => state.auth);

  return isAuth &&
    parseUserRole(localStorage.getItem(ACCESS_TOKEN)) === ADMIN ? (
    <>{component}</>
  ) : (
    <Navigate to="/" />
  );
};

export default AdminRoute;
