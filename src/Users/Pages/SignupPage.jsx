import React, { useState } from "react";
import useForm from "../../Forms/Hooks/useForm";
import initialSignupForm from "../Helpers/initialForms/initialSignupForm";
import signupSchema from "../Models/signupSchema";
import Container from "@mui/material/Container";
import SignupForm from "../Components/SignupForm";
import useUsers from "../Hooks/useUsers";
import { useUser } from "../Providers/UserProvider";
import { Navigate } from "react-router-dom";
import ROUTES from "../../Routes/routesModel";
import { getSavedAvatar, saveAvatarSelection } from "../Services/localStorageServices";



export default function SignupPage() {
  const { handleSignup } = useUsers();
  const {
    data,
    errors,
    handleChange,
    handleReset,
    validateForm,
    onSubmit,
    handleChangeCheckBox,
  } = useForm(initialSignupForm, signupSchema, handleSignup);

  const { user } = useUser();
  const [selectedAvatar, setSelectedAvatar] = useState(getSavedAvatar());

  if (user) return <Navigate to={ROUTES.CREATE_EXPENSE} replace />

  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SignupForm
        onSubmit={onSubmit}
        onReset={handleReset}
        validateForm={validateForm}
        title={"register form"}
        errors={errors}
        data={data}
        onInputChange={handleChange}
        handleChangeCheckBox={handleChangeCheckBox}
        selectedAvatar={selectedAvatar}
        onAvatarSelect={(avatar) => {
          setSelectedAvatar(avatar);
          saveAvatarSelection(avatar);
        }}
      />
     
    </Container>
  );
}