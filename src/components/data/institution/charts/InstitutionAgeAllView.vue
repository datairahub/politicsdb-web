<template>
  <main class="main main--data">
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ name: 'data' }">
        Datos
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'institution', params: { institutionid: state.institution.id } }">
        {{ state.institution.name }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ state.info.name }}</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>{{ state.info.name }}</h1>
    <p>{{ state.info.desc }}</p>
    <p>{{ state.info.body }}</p>
    <div ref="chart" style="height: 600px" />
  </main>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useApiStore } from '@/stores/api';
import { useRoute, useRouter } from 'vue-router';
import { timeFormat } from 'd3-time-format';
import Charts from '@/services/charts/Charts';
import Parser from '@/services/parser/Parser';
import LinesChart from '@/components/charts/lineschart/d3.lineschart';
import '@/components/charts/d3.chart.scss';

const route = useRoute();
const router = useRouter();
const api = useApiStore();
const chart = ref(null);

const state = reactive({
  institution: {},
  data: [],
  chart: null,
  info: new Charts().getChart((d) => d.id === 'age-all'),
});

const createChart = (rawData) => {
  const data = rawData.map((d) => ({
    id: d.id,
    name: d.full_name,
    x0: new Date(d.position_start),
    x1: new Date(d.position_end) > new Date() ? new Date() : new Date(d.position_end),
    y0: new Date(d.position_start) - new Date(d.birth_date),
    y1: new Date(d.position_start) - new Date(d.birth_date),
  }));

  const config = {
    styles: {
      opacity: 0.3,
      cursor: 'pointer',
    },
    attrs: {
      'stroke-width': 2,
      'stroke-linecap': 'round',
    },
    axis: {
      xFormat: timeFormat('%Y'),
      yFormat: (d) => new Date(d).getUTCFullYear() - 1970,
    },
    tooltip: (event, d) => `${d.name}: ${Parser.round(d.y1 / (1000 * 60 * 60 * 24 * 365.25), 1)} años`,
    click: (event, d) => {
      router.push({ name: 'person', params: { personid: d.id } });
    },
  };

  state.chart = new LinesChart(chart.value, data, config);
};

onMounted(() => {
  api.retrieve('institution-age', route.params.institutionid)
    .then((data) => {
      state.institution = data.instance;
      createChart(data.positions);
    });
});

</script>
