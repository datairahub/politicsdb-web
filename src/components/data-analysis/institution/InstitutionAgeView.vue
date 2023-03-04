<template>
  <main class="main main--data">
    <h1>{{ state.instance.name }}</h1>
    <div ref="chart" style="height: 600px" />
  </main>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useApiStore } from '@/stores/api';
import { useRoute, useRouter } from 'vue-router';
import { timeFormat } from 'd3-time-format';
import LinesChart from '@/components/charts/lineschart/d3.lineschart';
import '@/components/charts/d3.chart.scss';

const route = useRoute();
const router = useRouter();
const api = useApiStore();
const chart = ref(null);

const state = reactive({
  instance: {},
  data: [],
  chart: null,
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
    tooltip: (event, d) => d.name,
    click: (event, d) => {
      router.push({ name: 'person', params: { personid: d.id } });
    },
  };

  state.chart = new LinesChart(chart.value, data, config);
};

onMounted(() => {
  api.retrieve('institution-age', route.params.institutionid)
    .then((data) => {
      state.instance = data.instance;
      createChart(data.positions);
    });
});

</script>
