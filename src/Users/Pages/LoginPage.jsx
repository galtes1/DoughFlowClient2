import React from "react";
import useForm from "../../Forms/Hooks/useForm";
import initialLoginForm from "../Helpers/initialForms/initialLoginForm";
import loginSchema from "../Models/loginSchema";
import Container from "@mui/material/Container";
import Form from "../../Forms/Components/Form";
import ROUTES from "../../Routes/routesModel";
import Input from "../../Forms/Components/Input";
import { Navigate, Link } from "react-router-dom";
import useUsers from "../Hooks/useUsers";
import { useUser } from "../Providers/UserProvider";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Button, Grid } from "@mui/material";

export default function LoginPage() {
  const { handleLogin } = useUsers();
  const { data, errors, handleChange, handleReset, validateForm, onSubmit } =
    useForm(initialLoginForm, loginSchema, handleLogin);
  const { user, token } = useUser();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSubmit(); 
    }
  };
  if (user&&token) return <Navigate to={ROUTES.SUMMARY_PAGE} replace />  
  return (
    <Container>
      <Container
        sx={{
          paddingTop: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          title="login"
          styles={{ maxWidth: "450px" }}
          to={ROUTES.ROOT}
          onSubmit={onSubmit}
          onReset={handleReset}
          validateForm={validateForm}
        >
          <Input
            label="email"
            name="email"
            type="email"
            error={errors.email}
            onChange={handleChange}
            data={data}
            onKeyPress={handleKeyPress}
          />
          <Input
            label="password"
            name="password"
            type="password"
            error={errors.password}
            onChange={handleChange}
            data={data}
            onKeyPress={handleKeyPress}
          />
          <Grid item xs={12}>
            <Button
              variant="outlined"
              component={Link}
              to={ROUTES.SIGNUP}
              startIcon={<AccountBoxIcon />}
              sx={{ width: "100%" }}
            >
              Sign Up
            </Button>
          </Grid>
        </Form>
      </Container>
    </Container>
  );
}
