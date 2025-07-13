import React, { useEffect, useState } from "react";
import { useUser } from "../Providers/UserProvider";
import { Container, Typography, Avatar, Paper, Grid, IconButton, CardActions, Tooltip, Divider} from "@mui/material";
import { Navigate } from "react-router-dom";
import ROUTES from "../../Routes/routesModel";
import Spinner from "../../Component/Spinner";
import { useNavigate } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import useUsers from "../Hooks/useUsers";
import { getSavedAvatar } from "../Services/localStorageServices";

export default function Profile() {
  const { handleGetUser } = useUsers();
  const { user } = useUser();
  const [userFullData, setUserFullData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const fullUser = await handleGetUser(user.UserId);
        setUserFullData(fullUser);
      } catch (error) {}
    };
    getUser();
  }, [user, handleGetUser]);

  if (!userFullData) return <Spinner />;

  return (
    <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center" }}>
      <Paper
        variant= "custom"
        elevation={4}
        sx={{mt:10,}} 
           >

        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} display="flex" justifyContent="center">
            <Avatar
              alt="Profile"
              src={`/avatars/${getSavedAvatar()}`}
              sx={{ width: 130, height: 130, boxShadow: 3, backgroundColor: "#ffffff", mt:5 }}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5"   sx={{  ml: 5,fontFamily: "fantasy",textAlign: "left" }}>                                      
             Name: {userFullData.name}
            </Typography>
            <Typography  variant="h5"  sx={{  ml: 5,fontFamily: "fantasy",textAlign: "left" }} >
             Email: {userFullData.email}
            </Typography> 
            <Typography variant="h6"  sx={{ml: 5,fontFamily: "fantasy",textAlign: "left",color: userFullData.isBusiness ? "success.main" : "info.main", }}>     
              {userFullData.isBusiness ? "Pro " : "Basic"}
             </Typography>    
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="center">
            <CardActions>
              <Tooltip title="Edit your details">
                <IconButton
                  onClick={() => navigate(ROUTES.EDIT_USER)}
                  sx={{ color: "#266ed9" }}
                >
                  <ModeEditIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </CardActions>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
