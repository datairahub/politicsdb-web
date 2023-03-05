<template>
  <div class="chart-info">
    <h1>{{ info.name }}</h1>
    <p>{{ info.desc }}</p>
    <p>{{ info.body }}</p>
  </div>
</template>

<script setup>
defineProps({
  info: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});
</script>
