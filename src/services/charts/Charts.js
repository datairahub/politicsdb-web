/**
 * Chart service class
 */
export default class {
  charts = [
    {
      id: 'age-all',
      name: 'Distribución de edad',
      image: 'age-all',
      desc: 'Distribución por edad de cada miembro de la institución.',
      body: 'Las líneas representan la edad de cada representante, calculada a partir de su edad en el momento de la toma de posesión del cargo.',
    },
    {
      id: 'age-mean',
      name: 'Media de edad',
      image: 'age-mean',
      desc: 'Media de edad de los miembros de la institución.',
      body: 'Las líneas representan la edad de cada periodo, calculada a partir de la edad de sus miembros en el momento de la toma de posesión del cargo.',
    },
    {
      id: 'genre',
      name: 'Miembros por género',
      image: 'genre',
      desc: 'Total de miembros por género por cada periodo.',
      body: 'Cada barra representa el número total de miembros en cada periodo según su género.',
    },
    {
      id: 'month',
      name: 'Miembros por mes de nacimiento',
      image: 'month',
      desc: 'Total de miembros por mes de nacimiento por cada periodo.',
      body: 'Cada barra representa el número total de miembros de la institución según su mes de nacimiento.',
    },
  ];

  getChart(filter) {
    const chart = this.charts.filter(filter);
    return chart.length ? chart[0] : undefined;
  }

  getCharts(institution = {}) {
    return this.charts.map((d) => ({
      ...d,
      route: { name: `institution-${d.id}`, params: { institutionid: institution.id } },
    }));
  }
}
