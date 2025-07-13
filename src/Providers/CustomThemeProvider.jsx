import { createContext, useCallback, useContext, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const ThemeContext = createContext();

export default function CustomThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  const theme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
      ...(isDark
        ? {
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
            text: {
              primary: "#F7F9F9",
              secondary: "#BBBBBB",
            },
          }
        : {
            background: {
              default: "#ffffff",
              paper: "#f5f5f5",
            },
            text: {
              primary: "#080303",
              secondary: "#333333",
            },
          }),
    },
    typography: {
      fontFamily: "'Varela Round', 'Segoe UI', sans-serif",
    },
    components: {
      MuiTypography: {
        variants: [
          {
            props: { variant: "custom" },
            style: {
              color: isDark ? "#F7F9F9" : "#080303",
              fontFamily: "fantasy",
              fontSize: "4.1rem",
            },
          },
          {
            props: { variant: "customBody" },
            style: {
              color: isDark ? "#F7F9F9" : "#080303",
              fontSize: "1rem",
              fontWeight: 500,
              fontFamily: "'Segoe UI', sans-serif",
              lineHeight: 1.6,
              textAlign: "left",
              maxWidth: "600px",
              margin: "0 auto",
            },
          },
        ],
      },
      MuiPaper: {
        variants: [
          {
            props: { variant: "custom" },
            style: {
              backgroundColor: isDark ? "#c0c4ca" : "#f9f9f9",
              color: "#080303",
              borderRadius: "12px",
              boxShadow: isDark
                ? "0 4px 12px rgba(0, 0, 0, 0.3)"
                : "0 4px 12px rgba(0, 0, 0, 0.1)",
            },
          },
          {
            props: { variant: "gptBubble" },
            style: {
              backgroundColor: isDark ? "#2c2c2c" : "#ffffff",
              color: isDark ? "#f1f1f1" : "#080303",
              padding: "16px",
              borderRadius: "12px",
              width: "400px",
              minHeight: "80px",
              textAlign: "right",
              direction: "rtl",
              fontFamily: "'Varela Round', sans-serif",
              fontSize: "1.1rem",
              lineHeight: 1.6,
              bottom: 70,
              position: "absolute", 
              right: 100,
              zIndex: 10 ,
              boxShadow: isDark
                ? "0 4px 12px rgba(255, 255, 255, 0.1)"
                : "0 4px 12px rgba(0, 0, 0, 0.1)",
            },
          },
        ],
      },
      MuiButton: {
        variants: [
          {
            props: { variant: "custom" },
            style: {
              backgroundColor: isDark ? "#f9c74f" : "#080303",
              color: isDark ? "#080303" : "#f9f9f9",
              fontWeight: "bold",
              fontSize: "1rem",
              padding: "8px 24px",
              borderRadius: "8px",
              width: 150,
              boxShadow: isDark
                ? "0 4px 10px rgba(255, 255, 255, 0.1)"
                : "0 4px 10px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                backgroundColor: isDark ? "#f1c232" : "#1a1a1a",
              },
            },
          },
        ],
      },
      MuiFormControlLabel: {
        styleOverrides: {
          label: {
            color: isDark ? "#F7F9F9" : "#080303",
          },
        },
      },
      MuiListItemText: {
        defaultProps: {
          primaryTypographyProps: {
            color: "text.primary",
            fontWeight: "bold",
          },
          secondaryTypographyProps: {
            color: "text.secondary",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ toggleDarkMode, isDark }}>
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a Provider");
  return context;
};
