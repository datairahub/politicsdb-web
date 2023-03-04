/**
 * Chart service class
 */
export default class {
  charts = [
    {
      id: 'age-all',
      name: 'Distribución de edad',
      image: 'age-all',
      desc: 'Distribución por edad de cada miembro en el momento de la toma de posesión de su cargo.',
      body: 'Las líneas representan la edad de cada representante, calculada a partir de su edad en el día de la toma de posesión del cargo',
    },
  ];

  getChart(filter) {
    const chart = this.charts.filter(filter);
    return chart.length ? chart[0] : undefined;
  }

  getCharts(institution = {}) {
    return this.charts.map((d) => ({
      ...d,
      route: { name: 'institution-age-all', params: { institutionid: institution.id } },
    }));
  }
}
