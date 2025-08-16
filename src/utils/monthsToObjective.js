// Calcula los meses restantes para llegar a la fecha objetivo del ahorro

const monthsToObjective = (goalDate) => {
  const [yearObjective, monthObjective] = goalDate.split("-");

  //Consigo separar en variables la fecha de hoy
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  const totalMonths =
    (yearObjective - currentYear) * 12 + (monthObjective - currentMonth);

  return totalMonths;
};

export default monthsToObjective;
