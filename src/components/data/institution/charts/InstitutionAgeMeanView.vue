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

    <div class="chart-controls">
      <div class="chart-controls__block">
        <div class="chart-controls__label">
          Ver por
        </div>
        <div class="chart-controls__input">
          <el-select
            v-model="state.filters.split"
            class=""
            placeholder="Ver por"
          >
            <el-option
              v-for="option in state.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </div>
      </div>
      <!-- <div class="chart-controls__block">
        <div class="chart-controls__label">
          Filtrar por
        </div>
        <div class="chart-controls__input">
          <el-select
            v-model="state.filters.genre"
            class=""
            placeholder="Género"
          >
            <el-option
              key="T"
              label="Todos los géneros"
              value=""
            />
            <el-option
              key="M"
              label="Hombres"
              value="M"
            />
            <el-option
              key="F"
              label="Mujeres"
              value="F"
            />
          </el-select>
        </div>
      </div> -->
    </div>

    <div
      ref="chart"
      v-loading="state.isLoading"
      style="height: calc(100vh - 460px)"
    />

    <ChartLegend :legends="state.chartLegends[state.filters.split]" />

    <div v-if="state.hasDateCount" class="chart-notes">
      <strong>Nota:</strong>
      <p>
        El gráfico representa datos de un total de {{ Parser.numFormatter(state.hasDateCount) }}
        miembros pertenecientes a esta institución para los cuales ha sido posible determinar
        su fecha de nacimiento.
      </p>
      <p v-if="state.noHasDateCount > 0">
        Faltan datos de {{ Parser.numFormatter(state.noHasDateCount) }} miembros para los
        cuales no ha sido posible determinar su fecha de nacimiento.
      </p>
    </div>
  </main>
</template>

<script setup>
import {
  ref, reactive, onMounted, watch, onUnmounted,
} from 'vue';
import { useApiStore } from '@/stores/api';
import { useRoute, useRouter } from 'vue-router';
import { extent } from 'd3-array';
import Charts from '@/services/charts/Charts';
import Colors from '@/services/colors/Colors';
import Parser from '@/services/parser/Parser';
import LinesChart from '@/components/charts/lineschart/d3.lineschart';
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
  mode: 'all',
  options: [
    { label: 'Sin distinción', value: '' },
    { label: 'Por género', value: 'genre' },
  ],
  filters: {
    genre: '',
    split: 'genre',
  },
  chartData: [],
  chartInfo: new Charts().getChart((d) => d.id === 'age-mean'),
  chartConfig: {
    styles: {
      opacity: 0.8,
      cursor: 'pointer',
    },
    attrs: {
      'stroke-width': 10,
      'stroke-linecap': 'round',
    },
    tooltip: (event, d) => {
      let text = `${d.name}: ${d.values[0].y} años de media`;
      if (d.genre === 'M') text += ' (Hombres)';
      if (d.genre === 'F') text += ' (Mujeres)';
      return text;
    },
    click: (event, d) => {
      router.push({
        name: 'period',
        params: { periodid: d.id.split(':')[0] },
        query: { tpGenre: d.genre },
      });
    },
  },
  chartLegends: {
    '': [],
    genre: [{ color: Colors.genre.M, label: 'Hombre' }, { color: Colors.genre.F, label: 'Mujer' }],
  },
});

const updateConfig = (data) => {
  const minmax = extent(data, (d) => d.val);
  return {
    ...state.chartConfig,
    color: state.filters.split ? { key: 'color' } : Colors.default,
    scales: {
      // yMinOverride: 30,
      yMinOverride: Parser.round(minmax[0]) - 2,
      yMaxOverride: Parser.round(minmax[1]) + 2,
    },
  };
};

const updateChart = (rawData) => {
  state.chartData = rawData.map((d) => ({
    id: `${d.id}:${d.genre}`,
    name: d.name,
    genre: d.genre,
    color: Colors.genre[d.genre] || Colors.default,
    val: Parser.yearsFromSeconds(d.mean_seconds, 2),
    values: [
      {
        x: new Date(d.start),
        y: Parser.yearsFromSeconds(d.mean_seconds, 2),
      },
      {
        x: new Date(d.end) > new Date() ? new Date() : new Date(d.end),
        y: Parser.yearsFromSeconds(d.mean_seconds, 2),
      },
    ],
  }));

  if (!state.chart) {
    state.chart = new LinesChart(chart.value, state.chartData, updateConfig(state.chartData));
  } else {
    state.chart.updateConfig(updateConfig(state.chartData));
    state.chart.updateData(state.chartData);
  }
};

const getData = (params = {}) => {
  if (state.isLoading) return;
  state.isLoading = true;
  api.retrieve('institution-age-mean', route.params.institutionid, params, false)
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

watch(state.filters, (filters) => {
  getData(filters);
});

onMounted(() => {
  getData(state.filters);
});

onUnmounted(() => {
  if (state.chart) state.chart.destroyChart();
});
</script>
