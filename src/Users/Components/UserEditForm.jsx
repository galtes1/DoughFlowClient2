import React, { useState } from "react";
import Form from "../../Forms/Components/Form";
import Input from "../../Forms/Components/Input";
import ROUTES from "../../Routes/routesModel";
import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { useTheme } from "../../Providers/CustomThemeProvider";
import { getSavedAvatar, saveAvatarSelection } from "../Services/localStorageServices";
import AvatarSelector from "./AvatarSelector";
const UserEditForm = ({
    title,
    onSubmit,
    onReset,
    validateForm,
    errors,
    data,
    onInputChange,
    handleChangeCheckBox,
}) => {
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
          onSubmit();
        }
      };
      const {isDark} = useTheme();
      const [selectedAvatar, setSelectedAvatar] = useState(getSavedAvatar());
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
                name="currentPassword"
                label="Current Password"
                type="password"
                error={errors.currentPassword}
                onChange={onInputChange}
                data={data}
                sm={6}
                onKeyPress={handleKeyPress}
              />            
            <Input
                name="password"
                label="New Password"
                type="password"
                error={errors.password}
                onChange={onInputChange}
                data={data}
                sm={6}
                onKeyPress={handleKeyPress}
            />
            <Grid item>
            <FormControlLabel
              checked={!!data.isBusiness}
              onChange={handleChangeCheckBox}
              name="isBusiness"
              control={<Checkbox value={data.isBusiness} color="primary" />}
              label="Signup as business"
              onKeyPress={handleKeyPress}
              sx={{color: isDark? "#F7F9F9" : "#080303"}}
            />
          </Grid>
          <Grid item xs={12} mt={2} display="flex" justifyContent="center">
            <AvatarSelector
              selectedAvatar={selectedAvatar}
              onSelect={(avatar) => {
              setSelectedAvatar(avatar);
              saveAvatarSelection(avatar);
              }}
            />
          </Grid>
            </Form>
    );
}
export default React.memo(UserEditForm);