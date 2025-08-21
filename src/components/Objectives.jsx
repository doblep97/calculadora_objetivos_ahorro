import { useState } from "react";
import GoalMoneyForm from "./GoalMoneyForm";
import GoalResults from "./GoalResults";
import TableResults from "./TableResults";
import { Box, Button, Typography, Modal } from "@mui/material";
import ObjectivesList from "./ObjectivesList";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
};

const Objectives = () => {
  const [dataObjectives, setDataObjectives] = useState([]); //cambiar en componentes
  const [openModalForm, setOpenModalForm] = useState(false);

  const handleCloseModalForm = () => setOpenModalForm(false);

  // Funcion que se encarga de guardar todos los objetivos
  const handleDataObjectivesForm = (newObjective) => {
    setDataObjectives((previousObjective) => [
      ...previousObjective,
      newObjective,
    ]);
  };
  console.log(dataObjectives);

  //Funciones manejadores que actualizan la cantidad de cada objetivo de ahorro
  const handleContribute = (id, amountAdd) => {
    //Convertimos el dinero a añadir a numero y sino hay nada devolvemos 0
    const newAmountAdd = Number(amountAdd) || 0;
    //Modificamos el array anterior de data, es decir, el array donde estan todos los objetos de objectives
    setDataObjectives((previous) =>
      //Recorremos cada uno de los objetivos buscando cual coincide con el id del objetivo a modificar
      previous.map((objective) =>
        //Si coincide, lo modificamos y sino lo devolvemos tal cual estaba
        objective.id === id
          ? {
              //Copiamos el objetivo
              ...objective,
              initialAmount: Math.max(
                //Math.max(0, ...): asegura que nunca baje de 0 (por si en vez de aportar estuviéramos restando).
                0,
                Math.min(
                  Number(objective.initialAmount) + newAmountAdd,
                  Number(objective.goalAmount)
                )
              ),
              // opcional: guarda histórico o timestamp
              // history: [...(o.history||[]), { type: 'add', amount, at: Date.now() }]
            }
          : objective
      )
    );
  };

  const handleReducte = (id, amountRest) => {
    const newAmountRest = Number(amountRest) || 0;
    setDataObjectives((previous) =>
      previous.map((objective) =>
        objective.id === id
          ? {
              ...objective,
              initialAmount: Math.max(
                0,
                Math.min(
                  Number(objective.initialAmount) - newAmountRest,
                  Number(objective.goalAmount)
                )
              ),
              // opcional: guarda histórico o timestamp
              // history: [...(o.history||[]), { type: 'add', amount, at: Date.now() }]
            }
          : objective
      )
    );
  };

  const handleDelete = (id) => {
    setDataObjectives((previous) =>
      //Recorremos cada uno de los objetivos buscando cual coincide con el id del objetivo a modificar
      previous.filter(
        (objective) =>
          //Si coincide, lo modificamos y sino lo devolvemos tal cual estaba
          objective.id !== id
      )
    );
  };

  //Función que enviamos al form para que al hacer reset data este vacio y así desaparezcan <GoalResults>
  const handleResetData = () => setDataObjectives([]);
  return (
    <>
      {dataObjectives.length === 0 && (
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Typography variant="h6" maxWidth={"100%"} textAlign={"center"}>
              ¡Aquí verás el progreso de tu esfuerzo!
            </Typography>
            <Typography variant="h6" maxWidth={"90%"} textAlign={"center"}>
              Añade tu primer objetivo de ahorro
            </Typography>
          </Box>

          <Button variant="contained" onClick={() => setOpenModalForm(true)}>
            Añadir objetivo
          </Button>
        </Box>
      )}
      {dataObjectives.length > 0 && (
        <>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            marginBottom={2}
          >
            <Typography variant={"h5"}>Mis objetivos de ahorro</Typography>
            <Button variant="contained" onClick={() => setOpenModalForm(true)}>
              Añadir objetivo
            </Button>
          </Box>
          <Box>
            <ObjectivesList
              dataObjectives={dataObjectives}
              onContribute={handleContribute}
              onReduce={handleReducte}
              onDelete={handleDelete}
            />
          </Box>
        </>
      )}

      {/* {data && (
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
        {data.length > 0 && (
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
        )} */}
      {/*Modal para el formulario */}
      <Modal
        open={openModalForm}
        onClose={handleCloseModalForm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <GoalMoneyForm
            onAddDataForm={handleDataObjectivesForm}
            resetData={handleResetData}
            handleCloseModalForm={handleCloseModalForm}
          />
        </Box>
      </Modal>
    </>
  );
};

export default Objectives;
