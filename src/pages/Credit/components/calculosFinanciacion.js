export const redondearCuota = (valor, redondeoActual) => {
  if (redondeoActual === "exacto") return valor;
  const multiplos = { "100": 100, "500": 500, "1000": 1000 };
  const multiplo = multiplos[redondeoActual] || 500;
  return Math.ceil(valor / multiplo) * multiplo;
};

export const calcularCuotaDiaria = (monto, tasa, dias, redondeo) => {
  const total = monto * (1 + tasa * dias);
  const cuotaDiariaExacta = total / dias;

  return {
    total,
    cuotaDiariaExacta,
    cuotaDiaria: redondearCuota(cuotaDiariaExacta, redondeo),
  };
};
