<template>
  <main class="main main--data">
    <h1>Datos</h1>

    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    <h2>Instituciones</h2>
    <CardListWrapper>
      <CardInstitution
        v-for="institution in institutions"
        :key="institution.id"
        :institution="institution"
      />
    </CardListWrapper>

    <TablePersons />
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useApiStore } from '@/stores/api';
import CardListWrapper from '@/components/layout/card/CardListWrapper.vue';
import CardInstitution from '@/components/layout/card/CardInstitution.vue';
import TablePersons from '@/components/layout/table/persons/TablePersons.vue';

const institutions = ref([]);
const api = useApiStore();

api.list('institution')
  .then(({ results }) => {
    institutions.value = results;
  });
</script>
