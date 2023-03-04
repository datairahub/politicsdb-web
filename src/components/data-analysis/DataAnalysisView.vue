<template>
  <main class="main main--data">
    <h1>Analizar datos</h1>

    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    <h2>Edad de acceso al poder</h2>

    <CardListWrapper>
      <CardWrapper v-for="institution in institutions" :key="institution.id">
        <template #header>
          <router-link :to="{ name: 'analysis-institution-age', params: { institutionid: institution.id } }">
            <img
              :src="imageSrc(institution)"
              :alt="`Bandera de ${institution.name}`"
              class="card__flag"
            >
            <h3>{{ institution.name }}</h3>
          </router-link>
        </template>
      </CardWrapper>
    </CardListWrapper>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useApiStore } from '@/stores/api';
import CardListWrapper from '@/components/layout/card/CardListWrapper.vue';
import CardWrapper from '@/components/layout/card/CardWrapper.vue';

const institutions = ref([]);
const api = useApiStore();

api.list('institution')
  .then(({ results }) => {
    institutions.value = results;
  });

const imageSrc = (institution) => (institution && institution.id
  ? `${import.meta.env.VITE_STATIC_URL}images/adm0/${institution.adm0}.png`
  : '');
</script>
