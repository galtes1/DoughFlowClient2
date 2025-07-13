import { Box, CardActions, IconButton, Tooltip } from "@mui/material";
import { useUser } from "../../../../Users/Providers/UserProvider";
import { useTheme } from "../../../../Providers/CustomThemeProvider";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import NotLogged from "./NotLogged";
import Logged from "./Logged";


export default function RightNavBar() {
  const { user } = useUser();
  const { isDark, toggleDarkMode } = useTheme();

  return (
    <>
      <Box
        sx={{
          display: { md: "inline-flex" },
          alignItems: "center",
        }}
      >
        <Box sx={{ display: {xs: "none",  md: "inline-flex"  }}}>
        
        <CardActions>
          <Tooltip title="Dark/Light Mode">
            <IconButton sx={{ ml: 1 }} onClick={toggleDarkMode}>
              {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
          </CardActions>

        </Box>
        {user && <Logged/>}
        {!user && <NotLogged/>}
        
      </Box>
    </>
  );
}