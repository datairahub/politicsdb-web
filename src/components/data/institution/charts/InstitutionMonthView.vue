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
      style="height: calc(100vh - 460px)"
    />

    <ChartLegend :legends="state.chartLegends" />

    <div v-if="state.hasDateCount" class="chart-notes">
      <strong>Nota:</strong>
      <p>
        El gráfico representa datos de un total de {{ Parser.numFormatter(state.hasDateCount) }}
        miembros pertenecientes a esta institución para los cuales ha sido posible determinar
        su fecha de nacimiento con una precisión mínima mensual (mes/año o día/mes/año).
      </p>
      <p v-if="state.noHasDateCount > 0">
        Faltan datos de {{ Parser.numFormatter(state.noHasDateCount) }} miembros para los
        cuales no ha sido posible determinar su fecha de nacimiento con una precisión mínima
        mensual (mes/año o día/mes/año).
      </p>
    </div>
  </main>
</template>

<script setup>
import {
  ref, reactive, onMounted, onUnmounted,
} from 'vue';
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
  hasDateCount: 0,
  noHasDateCount: 0,
  chart: null,
  chartData: [],
  chartInfo: new Charts().getChart((d) => d.id === 'month'),
  chartConfig: {
    styles: {
      opacity: 0.9,
      cursor: 'pointer',
    },
    tooltip: (event, d) => {
      let text = `${d.name}: ${d.value} `;
      text += 'personas nacidas';
      return `${text} en ${Parser.strMonthFromInt(d.key)}`;
    },
    click: (event, d) => {
      router.push({
        name: 'period',
        params: { periodid: d.period },
        query: { tpBirthMonth: d.key },
      });
    },
    color: { key: 'color' },
  },
  chartLegends: Array
    .from({ length: 12 }, (v, k) => ({
      color: Colors.monthScale(k + 1),
      label: Parser.strMonthFromInt(k + 1),
    })),
});

const updateChart = (rawData) => {
  state.chartData = rawData
    .reduce((acc, curr) => {
      const idx = acc.findIndex((d) => d.period === curr.id);
      if (idx > -1) {
        acc[idx].values.push({
          key: curr.month,
          value: curr.total,
          period: curr.id,
          name: curr.name,
          color: Colors.monthScale(curr.month),
        });
      } else {
        acc.push({
          id: curr.name.substring(0, 17),
          period: curr.id,
          start: new Date(curr.start),
          values: [{
            key: curr.month,
            value: curr.total,
            period: curr.id,
            name: curr.name,
            color: Colors.monthScale(curr.month),
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
  api.retrieve('institution-month', route.params.institutionid, params)
    .then((data) => {
      state.institution = data.instance;
      state.hasDateCount = data.has_date;
      state.noHasDateCount = data.no_date;
      updateChart(data.periods);
    })
    .finally(() => {
      state.isLoading = false;
    });
};

onMounted(() => {
  getData(state.filters);
});

onUnmounted(() => {
  if (state.chart) state.chart.destroyChart();
});
</script>
