<template>
  <div class="chart-legend">
    <div v-for="(legend, i) in legends" :key="i">
      <span
        class="chart-legend-dot"
        :style="{ backgroundColor: legend.color }"
      />
      <span class="chart-legend-label">
        {{ legend.label }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  legends: {
    type: Array,
    required: true,
    default: () => ([]),
  },
});
</script>
