import React from "react";
import Box from "@mui/material/Box";
import NavItem from "../../../../Routes/Components/NavItem";
import ROUTES from "../../../../Routes/routesModel";

const NotLogged = () => {
  return (
    <Box>
      <NavItem label="Signup" to={ROUTES.SIGNUP} />
      <NavItem label="Login" to={ROUTES.LOGIN} />
    </Box>
  );
};

export default NotLogged;