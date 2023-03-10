/**
 * Chart service class
 */
export default class {
  charts = [
    {
      id: 'age-mean',
      name: 'Media de edad',
      image: 'age-mean',
      desc: 'Media por edad de de los miembros en el momento de la toma de posesión de su cargo por cada periodo.',
      body: 'Las líneas representan la edad de cada periodo, calculada a partir de la edad de sus miembros en el momento de la toma de posesión del cargo.',
    },
    {
      id: 'age-all',
      name: 'Distribución de edad',
      image: 'age-all',
      desc: 'Distribución por edad de cada miembro de la institución.',
      body: 'Las líneas representan la edad de cada representante, calculada a partir de su edad en el momento de la toma de posesión del cargo.',
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
