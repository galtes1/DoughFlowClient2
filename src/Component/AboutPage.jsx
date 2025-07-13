import React from "react";
import { Container, Typography, Box, List, ListItem, ListItemIcon, ListItemText, Button } from "@mui/material";
import { MonetizationOn, Category, BarChart, Lock, Insights, EmojiEvents, Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


  const AboutPage = () => {
  const navigate = useNavigate();
  
  return (
    <Container maxWidth="md" sx={{ mt: 0, p: { xs: 2, sm: 3 }, textAlign: "center" }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom color="text.primary">
        💰 Trackly
      </Typography>
      <Typography variant="h6" color="textSecondary" paragraph>
        The ultimate financial management tool to track your income and expenses effortlessly.
      </Typography>
      <Box sx={{ my: 4, textAlign: "left" }}>
        <Typography variant="h5" gutterBottom color="text.primary">
          🌟 Key Features:
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <MonetizationOn color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Real-Time Expense Tracking" 
              secondary="Log your daily expenses and income to gain full financial visibility." 
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Category color="secondary" />
            </ListItemIcon>
            <ListItemText 
              primary="Customizable Categories" 
              secondary="Organize your spending with personalized categories to better manage your budget." 
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <BarChart color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="Interactive Reports & Charts" 
              secondary="Visualize your financial trends with intuitive graphs and statistics." 
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Lock color="error" />
            </ListItemIcon>
            <ListItemText 
              primary="Secure & Encrypted Data" 
              secondary="Your financial information is protected with advanced security measures." 
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Insights color="warning" />
            </ListItemIcon>
            <ListItemText 
              primary="Smart Budget Insights" 
              secondary="Receive tailored suggestions to optimize your spending and saving habits." 
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmojiEvents color="info" />
            </ListItemIcon>
            <ListItemText 
              primary="Goal-Oriented Saving" 
              secondary="Set and track financial goals to achieve greater stability and prosperity." 
            />
          </ListItem>
        </List>
      </Box>
      <Typography variant="h5" gutterBottom color="text.primary">
        🚀 Why Choose Trackly?
      </Typography>
      <Typography variant="body1" paragraph color="text.primary">
        Managing your finances can be overwhelming, but our app simplifies the process. With a user-friendly interface and powerful features, you can:
      </Typography>
      <List>
        <ListItem>
          <ListItemText 
            primary="📊 Understand your spending patterns" 
            secondary="Identify where your money goes and make smarter financial decisions." 
          />
        </ListItem>
        <ListItem>
          <ListItemText 
            primary="🔔 Stay on top of your budget" 
            secondary="Get notified when you're close to exceeding your spending limits." 
          />
        </ListItem>
        <ListItem>
          <ListItemText 
            primary="📅 Plan for the future"
            secondary="Use predictive analytics to anticipate future expenses and savings." 
          />
        </ListItem>
      </List>

      <Typography variant="body1" paragraph sx={{ mt: 2 }} color="text.primary">
        Join thousands of users who have already gained financial control with Expense Tracker Pro. Start making better financial decisions today!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Home />}
        onClick={() => navigate("/")}
      >
         Back to Home
      </Button>
    </Container>
  );
};

export default AboutPage;
