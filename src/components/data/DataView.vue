<template>
  <main class="main main--data">
    <h1>Datos</h1>

    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    <h2>Instituciones</h2>
    <div v-for="institution in institutions" :key="institution.id">
      <router-link :to="{ name: 'institution', params: { institutionid: institution.id } }">
        {{ institution.name }}
      </router-link>
    </div>
    {{ api.name }}
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useApiStore } from '@/stores/api';

const institutions = ref([]);
const api = useApiStore();

api.list('institution')
  .then(({ results }) => {
    institutions.value = results;
  });
</script>
