import React, { useEffect } from "react";
import { Container, Typography, Button, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Users/Providers/UserProvider";

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      navigate("/summary-Page");
    }
  }, [user, navigate]);

  return (
    <Container
      maxWidth="xl"
      sx={{
        height: "100vh",
        py: 6,
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
      }}
    >
      <Box textAlign="center" mb={4}>
        <Typography variant="custom" >
          Trackly
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{fontWeight: "bold"}}>
          Take control of your monthly spending and savings.
        </Typography>
      </Box>

      {/* תוכן + תמונה */}
      <Grid container spacing={2} alignItems="center" justifyContent="center" px={4}>
        {/* טקסט וכפתורים */}
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: "left", maxWidth: 500, mx: "auto" }}>
            <Typography variant="customBody">
              Trackly helps you manage your income and expenses with clarity.
              Track your spending habits, categorize your finances, and reach your goals faster – all in one place.
            </Typography>

            <Box mt={6}>              
              <Box mt={1} >
                <Typography variant="subtitle1" fontWeight="bold" color="text.secondary" mb={1}>
                  Start now!
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    width: 200,
                    fontWeight: "bold",
                    fontSize: "1.05rem",
                    boxShadow: 4,
                    py: 1.5,
                  }}
                  onClick={() => navigate("/signup")}
                >
                  Register
                </Button>
              </Box>
              <Box mb={4} mt={5}>
                <Typography variant="subtitle1" fontWeight="bold" color="text.secondary" mb={1}>
                Already have an account?
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ width: 140, fontWeight: "bold", fontSize: "0.9rem"}}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>

     
        <Grid item xs={12} md={5}>
          <Box
            component="img"
            src={`${process.env.PUBLIC_URL}/avatars/LogoMoney.png`}
            alt="Trackly Illustration"
            sx={{
              width: "100%",
              maxWidth: 400,
              display: "block",
              mx: "auto",
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
