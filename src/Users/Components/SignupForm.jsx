import React from "react";
import Form from "../../Forms/Components/Form.jsx";
import ROUTES from "../../Routes/routesModel.js";
import Input from "../../Forms/Components/Input.jsx";
import {  FormControlLabel, Checkbox, Typography, Box } from "@mui/material";
import AvatarSelector from "./AvatarSelector.jsx";

const SignupForm = ({
  title,
  onSubmit,
  onReset,
  validateForm,
  errors,
  data,
  onInputChange,
  handleChangeCheckBox,
  selectedAvatar,
  onAvatarSelect,
}) => {


  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <Form
      title={title}
      onSubmit={onSubmit}
      onReset={onReset}
      errors={errors}
      validateForm={validateForm}
      styles={{ maxWidth: "800px" }}
      to={ROUTES.ROOT}
    >
      <Input
        name="name"
        label="name"
        error={errors.name}
        onChange={onInputChange}
        data={data}
        sm={6}
        onKeyPress={handleKeyPress}
      />
     
      <Input
        name="email"
        label="email"
        type="email"
        error={errors.email}
        onChange={onInputChange}
        data={data}
        sm={6}
        onKeyPress={handleKeyPress}
      />
      <Input
        name="password"
        label="password"
        type="password"
        error={errors.password}
        onChange={onInputChange}
        data={data}
        sm={6}
        onKeyPress={handleKeyPress}
      />
        <FormControlLabel
          onChange={handleChangeCheckBox}
          name="isBusiness"
          control={<Checkbox value={data.isBusiness} color="primary" />}
          label="Signup as business"
          onKeyPress={handleKeyPress}
        />

       <Box mt={4}>
        <Typography variant="customBody" mb={1} sx={{ textAlign: "left" }}>
          Choose profile picture
        </Typography>
        <AvatarSelector selectedAvatar={selectedAvatar} onSelect={onAvatarSelect} />
      </Box>
    </Form>
  );
}
export default React.memo(SignupForm);

