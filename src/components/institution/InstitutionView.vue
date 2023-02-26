<template>
  <main class="main main--data">
    <h1>{{ institution.name }}</h1>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useApiStore } from '@/stores/api';
import { useRoute } from 'vue-router';

const route = useRoute();
const institution = ref({});
const api = useApiStore();

api.retrieve('institution', route.params.institutionid)
  .then((data) => {
    institution.value = data;
  });
</script>
