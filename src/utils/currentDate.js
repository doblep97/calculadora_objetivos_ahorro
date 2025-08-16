// Calcula la fecha actual

const currentDate = () => {
  //Consigo separar en variables la fecha de hoy
  const today = new Date();
  const currentYear = today.getFullYear();
  // today.getMonth() + 1 devuelve un número, y padStart solo existe para strings, por eso hay que pasarlo a string
  const currentMonth = String(today.getMonth() + 1).padStart(2, "0"); // Coge el mes y le suma 1 (para que empiece por 1 y le añade un 0 -> 01..12;

  return `${currentYear}-${currentMonth}`;
};

export default currentDate;
