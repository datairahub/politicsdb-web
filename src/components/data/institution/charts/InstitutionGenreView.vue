<template>
  <main class="main main--data chart-view">
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ name: 'data' }">
        Datos
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'institution', params: { institutionid: state.institution.id } }">
        {{ state.institution.name }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        {{ state.chartInfo.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>

    <ChartInfo :info="state.chartInfo" />

    <div
      ref="chart"
      v-loading="state.isLoading"
      style="height: calc(100vh - 400px)"
    />

    <ChartLegend :legends="state.chartLegends" />

    <div v-if="state.hasGenreCount" class="chart-notes">
      <strong>Nota:</strong>
      <p>
        El gráfico representa datos de un total de {{ Parser.numFormatter(state.hasGenreCount) }}
        miembros pertenecientes a esta institución para los cuales ha sido posible determinar
        su género.
      </p>
      <p v-if="state.noHasGenreCount > 0">
        Faltan datos de {{ Parser.numFormatter(state.noHasGenreCount) }} miembros para los
        cuales no ha sido posible determinar su género.
      </p>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useApiStore } from '@/stores/api';
import { useRoute, useRouter } from 'vue-router';
import Charts from '@/services/charts/Charts';
import Colors from '@/services/colors/Colors';
import Parser from '@/services/parser/Parser';
import BarChart from '@/components/charts/barchart/d3.barchart';
import ChartInfo from '@/components/layout/charts/ChartInfo.vue';
import ChartLegend from '@/components/layout/charts/ChartLegend.vue';
import '@/components/charts/d3.chart.scss';

const route = useRoute();
const router = useRouter();
const api = useApiStore();
const chart = ref(null);

const state = reactive({
  isLoading: false,
  institution: {},
  data: [],
  hasGenreCount: 0,
  noHasGenreCount: 0,
  chart: null,
  chartData: [],
  chartInfo: new Charts().getChart((d) => d.id === 'genre'),
  chartConfig: {
    styles: {
      opacity: 0.9,
      cursor: 'pointer',
    },
    tooltip: (event, d) => {
      let text = `${d.name}: ${d.value}`;
      if (d.key === 'M') text += ' hombres';
      if (d.key === 'F') text += ' mujeres';
      return text;
    },
    click: (event, d) => {
      router.push({
        name: 'period',
        params: { periodid: d.period },
        query: { tpGenre: d.key },
      });
    },
    color: { key: 'color' },
  },
  chartLegends: [
    { color: Colors.genre.M, label: 'Hombre' },
    { color: Colors.genre.F, label: 'Mujer' },
  ],
});

const updateChart = (rawData) => {
  state.chartData = rawData
    .reduce((acc, curr) => {
      const idx = acc.findIndex((d) => d.period === curr.id);
      if (idx > -1) {
        acc[idx].values.push({
          key: curr.genre,
          value: curr.total,
          period: curr.id,
          name: curr.name,
          color: Colors.genre[curr.genre],
        });
      } else {
        acc.push({
          id: curr.name.substring(0, 17),
          period: curr.id,
          start: new Date(curr.start),
          values: [{
            key: curr.genre,
            value: curr.total,
            period: curr.id,
            name: curr.name,
            color: Colors.genre[curr.genre],
          }],
        });
      }
      return acc;
    }, [])
    .sort((a, b) => a.start - b.start);

  if (!state.chart) {
    state.chart = new BarChart(chart.value, state.chartData, state.chartConfig);
  } else {
    state.chart.updateData(state.chartData);
  }
};

const getData = (params = {}) => {
  if (state.isLoading) return;
  state.isLoading = true;
  api.retrieve('institution-genre', route.params.institutionid, params)
    .then((data) => {
      state.institution = data.instance;
      state.hasGenreCount = data.has_genre;
      state.noHasGenreCount = data.no_genre;
      updateChart(data.periods);
    })
    .finally(() => {
      state.isLoading = false;
    });
};

onMounted(() => {
  getData(state.filters);
});
</script>
