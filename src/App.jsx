import "./index.css";
import GoalMoneyForm from "./components/GoalMoneyForm";
import GoalResults from "./components/GoalResults";
import TableResults from "./components/TableResults";
import { useState } from "react";
import { Box, Tab } from "@mui/material";

const App = () => {
  const [data, setData] = useState(null);

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
    <div className="App">
      <Box width={"85%"} margin={"auto"} marginTop={3} marginBottom={3}>
        <Box
          sx={{
            backgroundColor: "#c6c4b8",
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
              backgroundColor: "#c6c4b8",
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
              backgroundColor: "#c6c4b8",
              padding: 2,
              borderRadius: 4,
              boxShadow: 5,
            }}
          >
            <TableResults data={data} />
          </Box>
        )}
      </Box>
    </div>
  );
};

export default App;
