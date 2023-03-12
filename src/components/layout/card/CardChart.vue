<template>
  <CardWrapper classes="chart-chart">
    <template #header>
      <router-link :to="chart.route">
        <h3>{{ chart.name }}</h3>
      </router-link>
    </template>
    <router-link :to="chart.route">
      <div class="chart-chart__bg" :style="{ backgroundImage: `url(${imageSrc(chart)})` }" />
    </router-link>
    <template #footer>
      {{ chart.desc }}
    </template>
  </CardWrapper>
</template>

<script setup>
import CardWrapper from './CardWrapper.vue';

defineProps({
  chart: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const imageSrc = (chart) => (chart && chart.id
  ? `${import.meta.env.VITE_STATIC_URL}images/charts/${chart.image}.png`
  : '');
</script>

<style lang="scss">
.chart-chart {
  &__bg {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .card__body {
    padding: 0;
  }
}
</style>
