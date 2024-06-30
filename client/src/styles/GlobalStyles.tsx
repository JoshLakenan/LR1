// GlobalStyles.tsx
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { GlobalStyles as MUIGlobalStyles } from "@mui/material";
import { PropsWithChildren } from "react";

const GlobalStyles = () => (
  <MUIGlobalStyles
    styles={{
      "html, body, #root": {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 0,
        padding: 0,
        backgroundColor: "#2b2a2a",
      },
    }}
  />
);

export const theme = createTheme();

const GlobalThemeProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <GlobalStyles />
    {children}
  </ThemeProvider>
);

export default GlobalThemeProvider;
