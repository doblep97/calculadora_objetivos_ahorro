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

  const currentDateData = currentDate();
  const goalDateData = data.goalDate;
  const tableResults = getAllCalculsMonths(currentDateData, goalDateData, data);

  return (
    <>
      <Typography variant="h6" sx={{ mb: 1, textAlign: "center" }}>
        Evolución de tu ahorro
      </Typography>

      <TableContainer component={Paper} sx={{ bgcolor: "background.paper" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead
            sx={(theme) => {
              const bg =
                theme.palette.mode === "light"
                  ? theme.palette.grey[400]
                  : theme.palette.grey[800];
              return {
                backgroundColor: bg,
                "& .MuiTableCell-head": {
                  color: theme.palette.getContrastText(bg),
                  fontWeight: 600,
                },
              };
            }}
          >
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
