import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { Box, Button, Modal } from "@mui/material";
import { useState, useEffect } from "react";
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
const LinearProgressWithLabel = (props) => {
  const { value, dataObjective, onDelete } = props;
  const [openModalGoal, setOpenModalGoal] = useState(false);
  console.log(dataObjective);

  // Observamos el valor (value) y se abre el modal al llegar o mas a 100
  useEffect(() => {
    if (value >= 100) {
      setOpenModalGoal(true);
    }
  }, [value]);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
        <Box sx={{ width: "85%", mr: 1 }}>
          <LinearProgress variant="determinate" value={value} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {`${Math.round(value)}%`}
          </Typography>
        </Box>
      </Box>
      {/*Modal objetivo conseguido*/}
      <Modal
        //NO pongo el onClose para obligar a apretar el boton
        open={openModalGoal}
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
          <Typography variant="h4" align="center">
            🎉 Enhorabuena 🎉
          </Typography>{" "}
          <Typography variant="h6">
            Has logrado alcanzar tu objetivo de ahorro
          </Typography>
          <Box>
            <Button
              variant="contained"
              onClick={() => onDelete(dataObjective.id)}
            >
              ¡Sigo a por más!
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired, // entre 0 y 100
};

export default LinearProgressWithLabel;
