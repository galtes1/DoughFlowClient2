import React, { useState, useEffect } from "react";
import MuiMenu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useUser } from "../../../../Users/Providers/UserProvider";
import useUsers from "../../../../Users/Hooks/useUsers";
import MenuLink from "../../../../Routes/Components/MenuLink";
import ROUTES from "../../../../Routes/routesModel";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "../../../../Providers/CustomThemeProvider";
import { useNavigate } from "react-router-dom";

export default function Menu({ isOpen, anchorEl, onClose }) {
  const { user } = useUser();
  const { handleLogout } = useUsers();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleMobileToggle = () => {
    onClose();
    setMobileOpen(!mobileOpen);
  };

  const onLogout = () => {
    handleLogout();
    onClose();
    if (isMobile) {
      handleMobileToggle();
    }
  };

  useEffect(() => {
  }, [isOpen]);

  const renderMenuItems = () => (
    <Box>
      {isMobile}
      <MenuItem onClick={() => {navigate(ROUTES.ABOUT); onClose()}}>About</MenuItem>
      {!user ? (
        <>
          <MenuLink text="Login" navigateTo={ROUTES.LOGIN} onClick={() => onClose()} sx={{ color: "blue" }} />
          <MenuLink text="Signup" navigateTo={ROUTES.SIGNUP} onClick={() => onClose()} />
        </>
      ) : (
        <>
          <MenuItem onClick={() => {navigate(ROUTES.USER_PROFILE); onClose()}}>Profile</MenuItem>
          <MenuItem onClick={() => {navigate(ROUTES.EDIT_USER); onClose()}}>Edit Account</MenuItem>
          <MenuItem onClick={() => {navigate(ROUTES.PREVIOUS_MONTH); onClose()}}>Previous Month</MenuItem>
          {user && (user.isAdmin || user.isBusiness) ? (
            <MenuItem onClick={() => {navigate(ROUTES.ROOT); onClose()}}>My Cards</MenuItem>
          ) : null}
          <MenuItem onClick={onLogout}>Logout</MenuItem>
        </>
      )}
      {isMobile && (
        <MenuItem>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Dark/Light Mode">
              <IconButton sx={{ ml: 1 }} onClick={toggleDarkMode}>
                {isDark ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
            <Box component="span" ml={1}></Box>
          </Box>
        </MenuItem>
      )}
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mr: 2 }}>
          <Drawer
            anchor="right"
            open={isOpen}
            onClose={handleMobileToggle}
            sx={{ '& .MuiDrawer-paper': { width: 'auto', height: 'auto', maxHeight: '100%' } }}
          >
            {renderMenuItems()}
          </Drawer>
        </Box>
      ) : (
        <MuiMenu
          open={isOpen}
          onClose={onClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {renderMenuItems()}
        </MuiMenu>
      )}
    </>
  );
}