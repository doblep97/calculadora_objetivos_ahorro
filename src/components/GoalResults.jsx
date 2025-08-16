import { Box, Typography } from "@mui/material";

const GoalResults = ({ data }) => {
  //Sino hay data, el componente no se pinta
  if (!data) return null;
  const totalMoney = data.goalAmount - data.initialAmount;
  const moneyEachMonth = totalMoney / data.totalMonths;

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={2}
    >
      <Typography variant="h4">{data.objectiveName}</Typography>
      <Box display={"flex"} justifyContent={"center"} flexWrap={"wrap"} gap={2}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            backgroundColor: "#807e76ff",
            padding: 1,
            borderRadius: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h6">Meses</Typography>
          <Typography variant="h6">{data.totalMonths}</Typography>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            backgroundColor: "#807e76ff",
            padding: 1,
            borderRadius: 4,
            textAlign: "center",
            minWidth: "33%",
          }}
        >
          <Typography variant="h6">Cantidad a ahorrar</Typography>
          <Typography variant="h6">{totalMoney}€</Typography>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            backgroundColor: "#807e76ff",
            padding: 1,
            borderRadius: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h6">Ahorro mensual</Typography>
          <Typography variant="h6">{moneyEachMonth.toFixed(2)}€</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default GoalResults;
