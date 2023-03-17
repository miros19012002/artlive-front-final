import React from "react";
import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../api/api";
import { ADMIN, parseUserRole } from "../utils/parseUserRole";
import Wrapper from "../components/Wrapper/Wrapper";

const PublicRoute = ({ component }) => {
  return parseUserRole(localStorage.getItem(ACCESS_TOKEN)) !== ADMIN ? (
    <Wrapper>{component}</Wrapper>
  ) : (
    <Navigate to="/admin" />
  );
};

export default PublicRoute;
