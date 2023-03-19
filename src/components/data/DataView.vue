<template>
  <main v-loading="state.isLoading" class="main main--data">
    <el-breadcrumb>
      <el-breadcrumb-item>Datos</el-breadcrumb-item>
    </el-breadcrumb>
    <h1>Explorar datos</h1>

    <p>
      Puedes descargar la base de datos completa en la sección
      <router-link :to="{ name: 'download' }">Descargar datos</router-link>.
    </p>
    <p>
      Puedes explorar los datos faltantes en la sección
      <router-link :to="{ name: 'missing' }">Datos faltantes</router-link>.
    </p>

    <h2>Instituciones</h2>
    <CardListWrapper>
      <CardInstitution
        v-for="institution in state.institutions"
        :key="institution.id"
        :institution="institution"
      />
    </CardListWrapper>

    <TablePersons
      :filters="{ page_size: 5 }"
    />
  </main>
</template>

<script setup>
import { reactive } from 'vue';
import { useApiStore } from '@/stores/api';
import CardListWrapper from '@/components/layout/card/CardListWrapper.vue';
import CardInstitution from '@/components/layout/card/CardInstitution.vue';
import TablePersons from '@/components/layout/table/persons/TablePersons.vue';

const api = useApiStore();

const state = reactive({
  isLoading: false,
  institutions: [],
});

const getData = () => {
  state.isLoading = true;
  api.list('institution')
    .then(({ results }) => {
      state.institutions = results;
    })
    .finally(() => {
      state.isLoading = false;
    });
};

getData();
</script>
