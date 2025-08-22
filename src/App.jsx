import "./index.css";
import { useState, useMemo, useEffect } from "react";
import {
  Box,
  IconButton,
  CssBaseline,
  ThemeProvider,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import getDesignTokens from "./theme/theme";
import Objectives from "./components/Objectives";

const App = () => {
  // 1) Preferencia del sistema para primer render
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  // 2) Carga inicial desde localStorage o SO
  const [mode, setMode] = useState(() => {
    return (
      localStorage.getItem("themeMode") || (prefersDark ? "dark" : "light")
    );
  });

  // 3) Persistir cada cambio
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  // 4) Crear theme
  const themeApp = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const toggleMode = () => setMode((m) => (m === "light" ? "dark" : "light"));

  return (
    <ThemeProvider theme={themeApp}>
      <CssBaseline />

      <Box sx={{ width: "85%", mx: "auto", my: 3 }}>
        <Box display="flex" justifyContent="end" mb={2}>
          <Tooltip title={`Cambiar a ${mode === "light" ? "oscuro" : "claro"}`}>
            <IconButton onClick={toggleMode} aria-label="Cambiar tema">
              {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Tooltip>
        </Box>

        <Box
          sx={(t) => ({
            backgroundColor: t.palette.boxBackground, // <- usa el theme desde sx
            p: 2,
            borderRadius: 4,
            boxShadow: 5,
          })}
        >
          <Objectives />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
