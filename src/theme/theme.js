// Esta función recibe el parámetro mode ("light" o "dark").
// Devolverá un objeto con clave {palette:...} que es lo que MUI necesita para constrir el tema
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light" //Object spread (...): “desparrama” las propiedades del objeto elegido dentro de palette. Es decir, mezcla esas claves (primary, background, boxBackground) con lo ya existente en palette.
      ? {
          // Colores para modo claro
          primary: { main: "#1976d2" },
          background: { default: "#f5f5f5" },
          boxBackground: "#edede8ff", // 👈 color claro
        }
      : {
          // Colores para modo oscuro
          primary: { main: "#90caf9" },
          background: { default: "#2a2a2bff" },
          boxBackground: "#333333", // 👈 color oscuro
        }),
  },
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: mode === "light" ? "#e0e0e0" : "#444444",
          color: mode === "light" ? "#000000" : "#ffffff",
        },
      },
    },
  },
});

export default getDesignTokens;
