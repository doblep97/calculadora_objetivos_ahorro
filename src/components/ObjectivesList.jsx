import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { Box, Modal } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LinearProgress from "./LinearProgress";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";

import { styled, IconButton } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useTheme } from "@mui/material/styles";

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

// MUI: Botón expandible giratorio
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginRight: "auto", //Lleva la flecha a la izquierda directamente
  padding: 0,
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ObjectivesList = (props) => {
  //Lista de props
  const { dataObjectives = [], onContribute, onReduce, onDelete } = props;
  // Todos los estados
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedObjective, setSelectedObjective] = useState(null);
  const [openModalContribution, setOpenModalContribution] = useState(false);
  const [openModalReduction, setOpenModalReduction] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [submitedError, setSubmitedError] = useState(false);
  const [aportationAmount, setAportationAmount] = useState("");
  const [reductionAmount, setReductionAmount] = useState("");

  const theme = useTheme(); // Aquí obtenemos el theme

  // guardamos el id expandido para ver que objetivo es el que expandimos
  const [expandedId, setExpandedId] = useState(null);

  const handleExpandClick = (objectiveId) => {
    setExpandedId((prev) => (prev === objectiveId ? null : objectiveId));
  };

  const open = Boolean(anchorEl);

  const handleClick = (event, objective) => {
    setAnchorEl(event.currentTarget);
    setSelectedObjective(objective); // guardamos la tarjeta seleccionada
  };

  //Cierra el menú de opciones
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Cierra la opcion de aportacion
  const handleAdd = (objective) => {
    //Seleccionamos el objetivo escogido para modificarlo
    setSelectedObjective(objective);
    setAportationAmount("");
    setSubmitedError(false);
    setOpenModalContribution(true);
    handleClose();
  };

  //Cierra la opcion de reduccion
  const handleReduce = (objective) => {
    //Seleccionamos el objetivo escogido para modificarlo
    setSelectedObjective(objective);
    setReductionAmount("");
    setSubmitedError(false);
    setOpenModalReduction(true);
    handleClose();
  };

  //Cierra la opcion de eliminar
  const handleDelete = (objective) => {
    //Seleccionamos el objetivo escogido para eliminarlo
    setSelectedObjective(objective);
    setOpenModalDelete(true);
    handleClose();
  };

  const handleChangeAportationAmount = (event) => {
    let value = event.target.value;
    //Reemplaza la "," por el "." y elimina letras y símbolos no permitidos (excepto punto y números)
    value = value.replace(",", ".");
    value = value.replace(/[^0-9.]/g, "");

    if (!isNaN(value)) {
      setAportationAmount(value);
    }
  };

  const handleChangeReductionAmount = (event) => {
    let value = event.target.value;
    //Reemplaza la "," por el "." y elimina letras y símbolos no permitidos (excepto punto y números)
    value = value.replace(",", ".");
    value = value.replace(/[^0-9.]/g, "");

    if (!isNaN(value)) {
      setReductionAmount(value);
    }
  };

  //Los submits de los Modales
  const handleSubmitContribution = (event) => {
    event.preventDefault();
    setSubmitedError(true);

    if (!aportationAmount) {
      return;
    }
    // Envío el id del objetivo seleccionado y la cantidad
    onContribute(selectedObjective.id, aportationAmount);

    setSubmitedError(false);
    handleCloseModalContribution();
  };

  const handleSubmitReduction = (event) => {
    event.preventDefault();
    setSubmitedError(true);

    if (!reductionAmount) {
      return;
    }

    // Envío el id del objetivo seleccionado y la cantidad
    onReduce(selectedObjective.id, reductionAmount);

    setSubmitedError(false);
    handleCloseModalReduction();
  };

  const handleSubmitDelete = () => {
    // Envío el id del objetivo seleccionado
    onDelete(selectedObjective.id);
    handleCloseModalDelete();
  };

  //Cerramos los modales
  const handleCloseModalContribution = () => setOpenModalContribution(false);
  const handleCloseModalReduction = () => setOpenModalReduction(false);
  const handleCloseModalDelete = () => setOpenModalDelete(false);

  return (
    <>
      <Box display={"flex"} flexDirection={"column"} gap={2}>
        {dataObjectives.map((objective) => {
          const totalMoney = objective.goalAmount - objective.initialAmount;
          const moneyEachMonth = totalMoney / objective.totalMonths;

          return (
            <Card key={objective.id} sx={{ maxWidth: "100%" }}>
              <CardActionArea
                onClick={() => {
                  /* navegar / abrir detalle */
                }}
                disableRipple
                disableTouchRipple
                sx={{
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.action.hover,
                  },
                  "& .MuiTouchRipple-root": { display: "none" },
                  "& .MuiCardActionArea-focusHighlight": {
                    opacity: 0,
                    transition: "none",
                  },
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <Box flexGrow={2}>
                      <Typography gutterBottom variant="h5">
                        {objective.objectiveName}
                      </Typography>
                      <LinearProgress
                        dataObjective={selectedObjective}
                        onDelete={handleSubmitDelete}
                        value={
                          (Number(objective.initialAmount) * 100) /
                          Number(objective.goalAmount)
                        }
                      />
                    </Box>
                    <Box>
                      <IconButton
                        aria-label="more"
                        onClick={(event) => {
                          event.stopPropagation();
                          event.preventDefault();
                          handleClick(event, objective);
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={open && selectedObjective?.id === objective.id}
                        onClose={handleClose}
                        MenuListProps={{
                          onClick: (e) => {
                            e.stopPropagation();
                            e.preventDefault();
                          },
                        }}
                      >
                        <MenuItem onClick={() => handleAdd(objective)}>
                          Añadir ahorro
                        </MenuItem>
                        <MenuItem onClick={() => handleReduce(objective)}>
                          Reducir ahorro
                        </MenuItem>
                        <MenuItem onClick={() => handleDelete(objective)}>
                          Eliminar
                        </MenuItem>
                      </Menu>
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>

              <CardActions>
                <ExpandMore
                  expand={expandedId === objective.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExpandClick(objective.id);
                  }}
                  aria-expanded={expandedId === objective.id}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>

              <Collapse
                in={expandedId === objective.id}
                timeout="auto"
                unmountOnExit
              >
                <CardContent>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    flexWrap={"wrap"}
                    gap={2}
                  >
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      sx={{
                        backgroundColor: theme.palette.boxBackground,
                        borderRadius: 4,
                        padding: 1,
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="subtitle1">
                        Faltan{" "}
                        <span style={{ fontWeight: "bold" }}>
                          {totalMoney} €
                        </span>{" "}
                        para alcanzar tu objetivo de ahorro
                      </Typography>
                    </Box>

                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      gap={1}
                      sx={{
                        backgroundColor: theme.palette.boxBackground,
                        borderRadius: 4,
                        padding: 1,
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="subtitle1">
                        Debes ahorrar mínimo{" "}
                        <span style={{ fontWeight: "bold" }}>
                          {moneyEachMonth.toFixed(2)} €
                        </span>{" "}
                        al mes para alcanzar tu objetivo de ahorro
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Collapse>
            </Card>
          );
        })}
      </Box>

      {/*Modal aportacion objetivo */}
      <Modal
        open={openModalContribution}
        onClose={handleCloseModalContribution}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component={"form"}
          sx={styleModal}
          maxWidth={"40%"}
          onSubmit={(event) => handleSubmitContribution(event)}
        >
          <FormControl
            variant="standard"
            error={submitedError && aportationAmount.trim() === ""}
            sx={(theme) => ({
              "& input:-webkit-autofill": {
                backgroundColor: `${theme.palette.background.paper} !important`,
                WebkitBoxShadow: "0 0 0px 1000px transparent inset",
                WebkitTextFillColor:
                  theme.palette.mode === "light" ? "#000000" : "#ffffff",
                transition: "background-color 9999s ease-in-out 0s",
              },
            })}
          >
            <Typography marginBottom={1}>
              ¿Cuánto dinero va a aportar a su objetivo de ahorro?
            </Typography>

            <Input
              name="goalAmount"
              id="standard-adornment-amount"
              endAdornment={<InputAdornment position="start">€</InputAdornment>}
              onChange={handleChangeAportationAmount}
              value={aportationAmount}
            />
            {submitedError && aportationAmount.trim() === "" && (
              <Typography variant="caption" color="error">
                Este campo es obligatorio
              </Typography>
            )}
          </FormControl>
          <Box
            display={"flex"}
            justifyContent="space-around"
            flexWrap={"wrap"}
            gap={3}
            marginTop={2}
          >
            <Button
              variant="contained"
              type="submit"
              sx={{ minWidth: "30%", marginTop: "2" }}
            >
              Añadir
            </Button>
          </Box>
        </Box>
      </Modal>

      {/*Modal reducir objetivo */}
      <Modal
        open={openModalReduction}
        onClose={handleCloseModalReduction}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component={"form"}
          sx={styleModal}
          maxWidth={"40%"}
          onSubmit={handleSubmitReduction}
        >
          <FormControl
            variant="standard"
            error={submitedError && reductionAmount.trim() === ""}
            sx={(theme) => ({
              "& input:-webkit-autofill": {
                backgroundColor: `${theme.palette.background.paper} !important`,
                WebkitBoxShadow: "0 0 0px 1000px transparent inset",
                WebkitTextFillColor:
                  theme.palette.mode === "light" ? "#000000" : "#ffffff",
                transition: "background-color 9999s ease-in-out 0s",
              },
            })}
          >
            <Typography marginBottom={1}>
              ¿Cuánto dinero va a reducir de su objetivo de ahorro?
            </Typography>

            <Input
              name="goalAmount"
              id="standard-adornment-amount"
              endAdornment={<InputAdornment position="start">€</InputAdornment>}
              onChange={handleChangeReductionAmount}
              value={reductionAmount}
            />
            {submitedError && reductionAmount.trim() === "" && (
              <Typography variant="caption" color="error">
                Este campo es obligatorio
              </Typography>
            )}
          </FormControl>
          <Box
            display={"flex"}
            justifyContent="space-around"
            flexWrap={"wrap"}
            gap={3}
            marginTop={2}
          >
            <Button
              variant="contained"
              type="submit"
              sx={{ minWidth: "30%", marginTop: "2" }}
            >
              Reducir
            </Button>
          </Box>
        </Box>
      </Modal>

      {/*Modal para eliminar objetivo */}
      <Modal
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={styleModal}
          maxWidth={"40%"}
          display={"flex"}
          justifyContent={"center"}
          gap={2}
        >
          <Typography>¿Estás seguro de que quieres eliminarlo?</Typography>
          <Box display={"flex"} gap={4}>
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmitDelete}
            >
              Si
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleCloseModalDelete(false)}
            >
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ObjectivesList;
