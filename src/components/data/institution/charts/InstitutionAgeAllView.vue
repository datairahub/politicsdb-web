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
            v-model="state.mode"
            class=""
            placeholder="Ver por"
            @change="setMode"
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
      <div v-show="state.mode === 'genre'" class="chart-controls__block">
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
      </div>
    </div>

    <div
      ref="chart"
      v-loading="state.isLoading"
      style="height: calc(100vh - 400px)"
    />

    <ChartLegend :legends="state.chartLegends[state.mode]" />

    <div v-if="state.hasDateCount" class="chart-notes">
      <strong>Nota:</strong>
      <p>
        El gráfico representa datos de un total de {{ Parser.numFormatter(state.hasDateCount) }}
        miembros pertenecientes a esta institución para los cuales ha sido posible determinar
        su fecha de nacimiento.
      </p>
      <p v-if="state.noHasDateCount">
        Faltan datos de {{ Parser.numFormatter(state.noHasDateCount) }} miembros para los
        cuales no ha sido posible determinar su fecha de nacimiento.
      </p>
    </div>

  </main>
</template>

<script setup>
import {
  ref, reactive, onMounted, watch,
} from 'vue';
import { useApiStore } from '@/stores/api';
import { useRoute, useRouter } from 'vue-router';
import { timeFormat } from 'd3-time-format';
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
  hasDateCount: 0,
  noHasDateCount: 0,
  data: [],
  chart: null,
  mode: 'all',
  options: [
    { label: 'Sin distinción', value: 'all' },
    { label: 'Por género', value: 'genre' },
  ],
  filters: {
    genre: '',
  },
  chartData: [],
  chartInfo: new Charts().getChart((d) => d.id === 'age-all'),
  chartConfig: {
    styles: {
      opacity: 0.3,
      cursor: 'pointer',
    },
    attrs: {
      'stroke-width': 3,
      'stroke-linecap': 'round',
    },
    axis: {
      xFormat: timeFormat('%Y'),
      yFormat: (d) => new Date(d).getUTCFullYear() - 1970,
    },
    tooltip: (event, d) => `${d.name}: ${Parser.round(d.values[0].y / (1000 * 60 * 60 * 24 * 365.25), 1)} años`,
    click: (event, d) => {
      router.push({ name: 'person', params: { personid: d.id } });
    },
    // scales: { yMinOverride: 0 },
    color: Colors.default,
  },
  chartModes: {
    all: { color: Colors.default },
    genre: { color: { key: 'genre' } },
  },
  chartLegends: {
    all: [],
    genre: [{ color: Colors.genre.M, label: 'Hombre' }, { color: Colors.genre.F, label: 'Mujer' }],
  },
});

const updateChart = (rawData) => {
  state.chartData = rawData.map((d) => ({
    id: d.id,
    name: d.full_name,
    genre: Colors.genre[d.genre],
    values: [
      {
        x: new Date(d.position_start),
        y: new Date(d.position_start) - new Date(d.birth_date),
      },
      {
        x: new Date(d.position_end) > new Date() ? new Date() : new Date(d.position_end),
        y: new Date(d.position_start) - new Date(d.birth_date),
      },
    ],
  }));
  if (!state.chart) {
    state.chart = new LinesChart(chart.value, state.chartData, state.chartConfig);
  } else {
    state.chart.updateData(state.chartData);
  }
};
const getData = (params = {}) => {
  if (state.isLoading) return;
  state.isLoading = true;
  api.retrieve('institution-age-all', route.params.institutionid, params)
    .then((data) => {
      state.institution = data.instance;
      state.hasDateCount = data.persons.length;
      state.noHasDateCount = data.no_date;
      updateChart(data.persons);
    })
    .finally(() => {
      state.isLoading = false;
    });
};

const setMode = (value) => {
  if (value === 'all') {
    state.filters.genre = '';
  }
  Object.keys(state.chartModes[value]).forEach((key) => {
    state.chartConfig[key] = state.chartModes[value][key];
  });
  state.chart.updateConfig(state.chartConfig);
};

onMounted(() => {
  getData(state.filters);
});

watch(state.filters, (filters) => {
  getData(filters);
});
</script>
