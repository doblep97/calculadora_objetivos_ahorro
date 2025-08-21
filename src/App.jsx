import "./index.css";

import { useState, useMemo } from "react";
import { Box } from "@mui/material";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import getDesignTokens from "./theme/theme";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Objectives from "./components/Objectives";

const App = () => {
  const [mode, setMode] = useState("light");
  const themeApp = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={themeApp}>
      <CssBaseline />

      <Box width={"85%"} margin={"auto"} marginTop={3} marginBottom={3}>
        <Box display={"flex"} justifyContent={"end"} marginBottom={2}>
          <IconButton
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
          >
            {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Box>
        <Box
          sx={{
            backgroundColor: themeApp.palette.boxBackground, // 👈 usa la instancia que tú creaste
            padding: 2,
            borderRadius: 4,
            boxShadow: 5,
          }}
        >
          <Objectives />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
