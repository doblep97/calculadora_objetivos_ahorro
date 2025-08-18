import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import currentDate from "../utils/currentDate";
import getAllCalculsMonths from "../utils/getAllMonths";

const TableResults = ({ data }) => {
  if (!data) return null;
  console.log(data);
  //Guardo en variables ambas fechas
  const currentDateData = currentDate();
  const goalDateData = data.goalDate;
  //Extraigo de una fucnión toda la lista de meses de la fecha actual a la fecha objetivo
  const tableResults = getAllCalculsMonths(currentDateData, goalDateData, data);

  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: 1, textAlign: "center" }}>
        Evolución de tu ahorro
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "green" }}>
            <TableRow>
              <TableCell align="center">Fecha</TableCell>
              <TableCell align="center">Ahorro acumulado</TableCell>
              <TableCell align="center">Ahorro total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableResults.map((item) => (
              <TableRow
                key={item.date}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{item.date}</TableCell>
                <TableCell align="center">{`${item.amountMonth} €`}</TableCell>
                <TableCell align="center">{`${item.amountTotal} €`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableResults;
