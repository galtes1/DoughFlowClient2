import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import userEditSchema from '../Models/userEditSchema';
import initialSignupForm from '../Helpers/initialForms/initialSignupForm';
import UserEditForm from '../Components/UserEditForm';
import { useUser } from '../Providers/UserProvider';
import useForm from '../../Forms/Hooks/useForm';
import useUsers from '../Hooks/useUsers';


export default function EditAccount() {
    const { handleUpdateUser, handleGetUser, } = useUsers();
    const { user } = useUser();
    const {
        data,
        errors,
        handleChange,
        handleReset,
        validateForm,
        onSubmit,
        setData,
        handleChangeCheckBox,
    } = useForm(initialSignupForm, userEditSchema, (userDetails) => {
        if (!user?.UserId) return;
        return handleUpdateUser(user.UserId, {
          ...userDetails,
          currentPassword: userDetails.currentPassword || "",
        });
      });
      
    
    
        
    useEffect(() => {
        if (user)
          handleGetUser(user.UserId).then((userDetails) => {
            const modelUser = {
              ...userDetails,
              password: "",
            };
            setData(modelUser);
          });
      }, [handleGetUser, user, setData]);
      
    return (
        <Container
            sx={{
                paddingTop: 8,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {data && (
                <UserEditForm
                    title="Edit Account"
                    onSubmit={onSubmit}
                    onReset={handleReset}
                    errors={errors}
                    validateForm={validateForm}
                    onInputChange={handleChange}
                    data={data}
                    handleChangeCheckBox={handleChangeCheckBox}
                />
            )}
        </Container>
    );
}