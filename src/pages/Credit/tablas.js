function generarTablaCreditosRedondeados(creditos) {
  const diasList = [20, 25, 26, 30, 35, 40, 45, 50];
  const tasaDiaria = 0.011667; // 1.1667%

  const tabla = creditos.map((credito) => {
    const diasArray = diasList.map((dias) => {
      // Calculamos la cuota diaria
      const totalGanancia = credito * tasaDiaria * dias;
      let valorPorDia = (credito + totalGanancia) / dias;

      // Redondeamos hacia arriba a múltiplo de 500
      valorPorDia = Math.ceil(valorPorDia / 500) * 500;

      return { dias, valorPorDia };
    });

    return {
      credito,
      creditoStr: credito.toLocaleString("es-AR"),
      dias: diasArray,
    };
  });

  return tabla;
}

function generarTablaCreditosNoRedondeados(creditos) {
  const diasList = [20, 25, 26, 30, 35, 40, 45, 50];
  const tasaDiaria = 0.011667; // 1.1667%

  const tabla = creditos.map((credito) => {
    const diasArray = diasList.map((dias) => {
      // Calculamos la cuota diaria
      // totalGanancia = credito * tasaDiaria * dias
      // cuotaDiaria = (credito + totalGanancia) / dias
      const totalGanancia = credito * tasaDiaria * dias;
      let valorPorDia = (credito + totalGanancia) / dias;

      // Redondeamos a número "bonito"
      valorPorDia = Math.ceil(valorPorDia / 100) * 100;

      return { dias, valorPorDia };
    });

    return {
      credito,
      creditoStr: credito.toLocaleString("es-AR"),
      dias: diasArray,
    };
  });

  return tabla;
}

// Ejemplo de uso:
const creditos = [];
for (let c = 100000; c <= 1500000; c += 50000) {
  creditos.push(c);
}

const TABLA_CREDITOS = generarTablaCreditosRedondeados(creditos);
console.log(TABLA_CREDITOS);

export const TABLA_REDONDEADA_116_REDONDEADA =
  generarTablaCreditosRedondeados(creditos);

export const TABLA_REDONDEADA_116_NO_REDONDEADA =
  generarTablaCreditosNoRedondeados(creditos);
/* -------------------------------------------------------- */
/* -------------------------------------------------------- */
/* --------------1% diario 25%mensual sin domingos--------- */
/* --------------30% en 30 días---------------------------- */
/* -------------------------------------------------------- */

export const TABLA = [
  {
    credito: 100000,
    creditoStr: "100.000",
    dias: [
      { dias: 20, valorPorDia: 6000 },
      { dias: 25, valorPorDia: 5000 },
      { dias: 33, valorPorDia: 4000 },
      { dias: 50, valorPorDia: 3000 },
    ],
  },
  {
    credito: 200000,
    creditoStr: "200.000",
    dias: [
      { dias: 20, valorPorDia: 12000 },
      { dias: 25, valorPorDia: 10000 },
      { dias: 33, valorPorDia: 8000 },
      { dias: 50, valorPorDia: 6000 },
    ],
  },
  {
    credito: 250000,
    creditoStr: "250.000",
    dias: [
      { dias: 20, valorPorDia: 15000 },
      { dias: 25, valorPorDia: 12500 },
      { dias: 33, valorPorDia: 10000 },
      { dias: 50, valorPorDia: 7500 },
    ],
  },
  {
    credito: 400000,
    creditoStr: "400.000",

    dias: [
      { dias: 20, valorPorDia: 24000 },
      { dias: 25, valorPorDia: 20000 },
      { dias: 33, valorPorDia: 16000 },
      { dias: 50, valorPorDia: 12000 },
    ],
  },
  {
    credito: 500000,
    creditoStr: "500.000",
    dias: [
      { dias: 20, valorPorDia: 30000 },
      { dias: 25, valorPorDia: 25000 },
      { dias: 33, valorPorDia: 20000 },
      { dias: 50, valorPorDia: 15000 },
    ],
  },
  {
    credito: 1000000,
    creditoStr: "1.000.000",
    dias: [
      { dias: 20, valorPorDia: 60000 },
      { dias: 25, valorPorDia: 50000 },
      { dias: 33, valorPorDia: 40000 },
      { dias: 50, valorPorDia: 30000 },
    ],
  },
  {
    credito: 1500000,
    creditoStr: "1.500.000",
    dias: [
      { dias: 20, valorPorDia: 90000 },
      { dias: 25, valorPorDia: 75000 },
      { dias: 33, valorPorDia: 60000 },
      { dias: 50, valorPorDia: 45000 },
    ],
  },
];

export const TABLASEMANAL = [
  {
    credito: 100000,
    creditoStr: "100.000",
    semanas: [
      {
        semanasTot: 3,
        montosSemanales: 40000,
      },
      {
        semanasTot: 4,
        montosSemanales: 31250,
      },
      {
        semanasTot: 5,
        montosSemanales: 26400,
      },
      {
        semanasTot: 8,
        montosSemanales: 18750,
      },
    ],
  },
  {
    credito: 200000,
    creditoStr: "200.000",
    semanas: [
      {
        semanasTot: 3,
        montosSemanales: 80000,
      },
      {
        semanasTot: 4,
        montosSemanales: 62500,
      },
      {
        semanasTot: 5,
        montosSemanales: 52800,
      },
      {
        semanasTot: 8,
        montosSemanales: 37500,
      },
    ],
  },
  {
    credito: 250000,
    creditoStr: "250.000",
    semanas: [
      {
        semanasTot: 3,
        montosSemanales: 100000,
      },
      {
        semanasTot: 4,
        montosSemanales: 78125,
      },
      {
        semanasTot: 5,
        montosSemanales: 66000,
      },
      {
        semanasTot: 8,
        montosSemanales: 46875,
      },
    ],
  },
  {
    credito: 400000,
    creditoStr: "400.000",
    semanas: [
      {
        semanasTot: 3,
        montosSemanales: 160000,
      },
      {
        semanasTot: 4,
        montosSemanales: 125000,
      },
      {
        semanasTot: 5,
        montosSemanales: 105600,
      },
      {
        semanasTot: 8,
        montosSemanales: 62500,
      },
    ],
  },
  {
    credito: 500000,
    creditoStr: "500.000",
    semanas: [
      {
        semanasTot: 3,
        montosSemanales: 200000,
      },
      {
        semanasTot: 4,
        montosSemanales: 156250,
      },
      {
        semanasTot: 5,
        montosSemanales: 132000,
      },
      {
        semanasTot: 8,
        montosSemanales: 93750,
      },
    ],
  },
  {
    credito: 1000000,
    creditoStr: "1.000.000",
    semanas: [
      {
        semanasTot: 3,
        montosSemanales: 400000,
      },
      {
        semanasTot: 4,
        montosSemanales: 312500,
      },
      {
        semanasTot: 5,
        montosSemanales: 264000,
      },
      {
        semanasTot: 8,
        montosSemanales: 187500,
      },
    ],
  },
  {
    credito: 1500000,
    creditoStr: "1.500.000",
    semanas: [
      {
        semanasTot: 3,
        montosSemanales: 600000,
      },
      {
        semanasTot: 4,
        montosSemanales: 468750,
      },
      {
        semanasTot: 5,
        montosSemanales: 396000,
      },
      {
        semanasTot: 8,
        montosSemanales: 281250,
      },
    ],
  },
];

/* -------------------------------------------------------- */
/* -------------------------------------------------------- */
/* -------------------------------------------------------- */
/* -------------------------------------------------------- */
/* -------------------------------------------------------- */
