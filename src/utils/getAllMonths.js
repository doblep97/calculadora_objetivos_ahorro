const getAllCalculsMonths = (currentDateData, goalDateData, data) => {
  //Separamos año y mes, el .map(Number) convierte cada numero de string a number ["2025","03"] -> [2025,03]
  const [startYear, startMonth] = currentDateData.split("-").map(Number);
  const [endYear, endMonth] = goalDateData.split("-").map(Number);
  // Guardaremos el resultado final (el array de meses)
  const result = [];

  //Dinero total a ahorrar
  const totalMoney = data.goalAmount - data.initialAmount;
  //Dinero que ahorro cada mes
  const moneyOneMonth = totalMoney / data.totalMonths;
  //Dinero con el que empiezo
  const initialMoney = data.initialAmount;

  let year = startYear;
  let month = startMonth;
  //Calculamos por cuento se multiplica el ahorro mensual
  let i = 0;

  while (year < endYear || (year === endYear && month <= endMonth)) {
    //Subimos un objeto con el mes y año
    const moneyEachMonth = moneyOneMonth * i;
    result.push({
      date: `${year}-${String(month).padStart(2, "0")}`,
      amountMonth: moneyEachMonth.toFixed(2),
      amountTotal: (Number(initialMoney) + Number(moneyEachMonth)).toFixed(2),
    });
    //Sumamos un mes más
    month++;
    i++;
    //Si el mes pasa de 'Diciembre', reiniciamos a enero y sumamos año
    if (month > 12) {
      month = 1;
      year++;
    }
  }
  return result;
};

export default getAllCalculsMonths;
