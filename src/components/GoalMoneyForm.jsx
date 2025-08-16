import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";

import InputLabel from "@mui/material/InputLabel";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useState } from "react";
import currentDate from "../utils/currentDate";
import monthsToObjective from "../utils/monthsToObjective";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
};

const GoalMoneyForm = ({ onAddDataForm, resetData }) => {
  const [objectiveName, setObjectiveName] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [initialAmount, setInitialAmount] = useState("");
  const [goalDate, setGoalDate] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [submitedError, setSubmitedError] = useState(false);
  const [openDateModal, setOpenDateModal] = useState(false);
  const handleCloseDateModal = () => setOpenDateModal(false);

  const objectiveData = {
    id: Date.now(),
    objectiveName: objectiveName,
    initialAmount: initialAmount,
    goalAmount: goalAmount,
    goalDate: goalDate,
    totalMonths: monthsToObjective(goalDate),
  };

  const handleChangeInitiallAmount = (event) => {
    let value = event.target.value;
    //Reemplaza la "," por el "." y elimina letras y símbolos no permitidos (excepto punto y números)
    value = value.replace(",", ".");
    value = value.replace(/[^0-9.]/g, "");
    if (!isNaN(value)) {
      setInitialAmount(value);
    }
  };
  const handleChangeGoalAmount = (event) => {
    let value = event.target.value;
    //Reemplaza la "," por el "." y elimina letras y símbolos no permitidos (excepto punto y números)
    value = value.replace(",", ".");
    value = value.replace(/[^0-9.]/g, "");

    if (!isNaN(value)) {
      setGoalAmount(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitedError(true);

    //Si los campos están vacios

    if (!objectiveName || !goalAmount || !initialAmount || !goalDate) {
      return;
    }

    //Si la cantidad de futuro es igual o menor a la inicial
    if (Number(goalAmount) <= Number(initialAmount)) {
      setOpenModal(true);
      return;
    }

    //Comprobamos que la fecha de objetivo sea posterior a la actual
    const now = currentDate(); // llamamos a la función que comprueba la fecha actual, sino pusieramos '()' estariamos comprobando goalDate con una funcion y no puede ser. y debemos ponerle los '()' para que esa funcion retorne el valor

    if (goalDate <= now) {
      setOpenDateModal(true);
      return;
    }

    setSubmitedError(false);
    onAddDataForm(objectiveData);
  };

  const handleReset = () => {
    setSubmitedError(false);
    setGoalDate("");
    setInitialAmount("");
    setGoalAmount("");
    setObjectiveName("");
    //Activamos la función que se envía desde 'app' para que devuelva null y no pinte los resultados
    resetData();
  };

  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
        Calculadora de ahorros para objetivos personales
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display={"flex"}
        flexDirection={"column"}
        gap={3}
      >
        {/* Nombre del objetivo */}
        <TextField
          variant="standard"
          label="Objetivo"
          name="nameObjective"
          value={objectiveName}
          onChange={(event) => setObjectiveName(event.target.value)}
          error={submitedError && objectiveName.trim() === ""}
          helperText={
            submitedError && objectiveName.trim() === ""
              ? "Este campo es obligatorio"
              : ""
          }
        />

        {/* Ahorro inicial */}
        <FormControl
          fullWidth
          variant="standard"
          error={submitedError && initialAmount.trim() === ""}
        >
          <InputLabel htmlFor="standard-adornment-amount">
            Ahorro inicial
          </InputLabel>
          <Input
            name="initialAmount"
            id="standard-adornment-amount"
            endAdornment={<InputAdornment position="start">€</InputAdornment>}
            onChange={handleChangeInitiallAmount}
            value={initialAmount}
          />
          {submitedError && initialAmount.trim() === "" && (
            <Typography variant="caption" color="error">
              Este campo es obligatorio
            </Typography>
          )}
        </FormControl>

        {/* Objetivo de ahorro final */}
        <FormControl
          fullWidth
          variant="standard"
          error={submitedError && goalAmount.trim() === ""}
        >
          <InputLabel htmlFor="standard-adornment-amount">
            Objetivo de ahorro
          </InputLabel>
          <Input
            name="goalAmount"
            id="standard-adornment-amount"
            endAdornment={<InputAdornment position="start">€</InputAdornment>}
            onChange={handleChangeGoalAmount}
            value={goalAmount}
          />
          {submitedError && goalAmount.trim() === "" && (
            <Typography variant="caption" color="error">
              Este campo es obligatorio
            </Typography>
          )}
        </FormControl>

        {/* Fecha para cumplir el ahorro final */}
        <TextField
          id="standard-basic"
          label="Fecha objetivo (mes - año)"
          type="month"
          name="date"
          variant="standard"
          value={goalDate}
          onChange={(event) => setGoalDate(event.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          error={submitedError && goalDate === ""}
          helperText={
            submitedError && goalDate === "" ? "Este campo es obligatorio" : ""
          }
        />
        <Box
          display={"flex"}
          justifyContent="space-around"
          flexWrap={"wrap"}
          gap={3}
        >
          <Button
            variant="contained"
            onClick={handleReset}
            sx={{ minWidth: "55%" }}
          >
            Establecer otro objetivo
          </Button>
          <Button variant="contained" type="submit" sx={{ minWidth: "40%" }}>
            Calcular
          </Button>
        </Box>
      </Box>

      {/* Modal para las cantidades */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            ¡Cuidado!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            La cantidad introducida para tu objetivo de ahorro futuro no puede
            ser igual o inferior a la cantidad de ahorro inicial
          </Typography>
          <Button
            variant="contained"
            onClick={handleCloseModal}
            sx={{ mt: 2, maxWidth: "50%" }}
          >
            ¡Voy a corregirlo!
          </Button>
        </Box>
      </Modal>

      {/* Modal para la fecha */}
      <Modal
        open={openDateModal}
        onClose={handleCloseDateModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            ¡Cuidado!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            La fecha para tu objetivo de ahorro no puede ser igual o anterior a
            la fecha actual
          </Typography>
          <Button
            variant="contained"
            onClick={handleCloseDateModal}
            sx={{ mt: 2, maxWidth: "50%" }}
          >
            ¡Voy a corregirlo!
          </Button>
        </Box>
      </Modal>
    </>
  );
};
export default GoalMoneyForm;
