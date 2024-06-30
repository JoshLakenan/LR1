import ControllerPage from "./pages/ControllerPage";
import "./App.css";
import { Box } from "@mui/material";

function App() {
  return (
    <Box
      id="App"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <ControllerPage />
    </Box>
  );
}

export default App;
