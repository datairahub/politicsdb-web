<template>
  <div class="table-positions-chart">
    <div ref="chart" :style="{ height: `${state.height * 30}px`, marginBottom: '20px' }" />
  </div>
</template>

<script setup>
import {
  ref, reactive, onMounted, onBeforeMount,
} from 'vue';
import LifeTimeChart from '@/components/charts/lifetime/d3.lifetime';
import '@/components/charts/d3.chart.scss';

const chart = ref(null);
const state = reactive({
  chart: null,
  chartData: [],
  chartConfig: {
    tooltip: (event, d) => `${d.name}`,
  },
  height: 100,
});

const props = defineProps({
  positions: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const drawChart = (positions) => {
  state.chartData = positions
    .filter((d) => new Date(d.start) < new Date())
    .map((d) => ({
      id: d.id,
      name: d.full_name,
      type: d.short_name,
      start: new Date(d.start),
      end: new Date(d.end) > new Date() ? new Date() : new Date(d.end),
    }));
  state.chart = new LifeTimeChart(chart.value, state.chartData, state.chartConfig);
};

onBeforeMount(() => {
  state.height = props.positions.reduce(
    (acc, curr) => (acc.includes(curr.short_name) ? acc : acc.concat(curr.short_name)),
    [],
  ).length;
});

onMounted(() => {
  drawChart(props.positions);
});
</script>
