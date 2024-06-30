import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import GlobalThemeProvider from "./styles/GlobalStyles.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GlobalThemeProvider>
    <App />
  </GlobalThemeProvider>
);
