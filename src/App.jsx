import "./index.css";
import GoalMoneyForm from "./components/GoalMoneyForm";
import GoalResults from "./components/GoalResults";
import TableResults from "./components/TableResults";
import { useState, useMemo } from "react";
import { Box } from "@mui/material";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { getDesignTokens } from "./theme/theme";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const App = () => {
  const [data, setData] = useState(null);

  const [mode, setMode] = useState("light");
  const themeApp = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  // Si quisiera añadir uno después de otro objetivo
  // const handleDataForm = (newObjective) => {
  //   setData((previousObjective) => [...previousObjective, newObjective]);
  // };

  const handleDataForm = (newObjective) => {
    setData(newObjective);
  };

  //Función que enviamos al form para que al hacer reset data sea null y así desaparezcan <GoalResults>
  const handleResetData = () => setData(null);

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
            // Cuando se cambia el modo con tu botón, todas las cajas cambian de color automáticamente
            backgroundColor: themeApp.palette.boxBackground, // 👈 usa la instancia que tú creaste
            padding: 2,
            borderRadius: 4,
            boxShadow: 5,
          }}
          marginBottom={3}
        >
          <GoalMoneyForm
            onAddDataForm={handleDataForm}
            resetData={handleResetData}
          />
        </Box>
        {data && (
          <Box
            sx={{
              backgroundColor: themeApp.palette.boxBackground, // 👈 usa la instancia que tú creaste
              padding: 2,
              borderRadius: 4,
              boxShadow: 5,
            }}
            marginBottom={3}
          >
            <GoalResults data={data} />
          </Box>
        )}
        {data && (
          <Box
            sx={{
              backgroundColor: themeApp.palette.boxBackground, // 👈 usa la instancia que tú creaste
              padding: 2,
              borderRadius: 4,
              boxShadow: 5,
            }}
          >
            <TableResults data={data} />
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default App;
