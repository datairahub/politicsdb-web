<template>
  <main v-loading="state.isLoading" class="main main--data">
    <h1>{{ state.person.full_name }}</h1>

    <div>
      <p><strong>ID: </strong> {{ state.person.id }}</p>
      <p><strong>Nombre único: </strong> {{ state.person.id_name }}</p>
      <p><strong>Nombre: </strong> {{ state.person.first_name }}</p>
      <p><strong>Apellidos: </strong> {{ state.person.last_name }}</p>
      <p><strong>Fecha de nacimiento: </strong> {{ state.person.birth_date }}</p>
      <p><strong>Género: </strong> {{ state.person.genre }}</p>
    </div>

    <TablePositions
      v-if="state.person.id"
      :filters="{ person: state.person.id }"
    />

    <PersonBiographies
      v-if="state.person.id"
      :filters="{ person: state.person.id }"
    />

    <TableBirthDateSources
      v-if="state.person.id"
      :filters="{ person: state.person.id }"
    />
  </main>
</template>

<script setup>
import { reactive } from 'vue';
import { useApiStore } from '@/stores/api';
import { useRoute } from 'vue-router';
import TablePositions from '@/components/layout/table/positions/TablePositions.vue';
import TableBirthDateSources from '@/components/layout/table/birthdatesource/TableBirthDateSources.vue';
import PersonBiographies from '@/components/data/person/PersonBiographies.vue';

const route = useRoute();
const api = useApiStore();
const state = reactive({
  isLoading: false,
  person: {},
});

const getData = () => {
  state.isLoading = true;
  api.retrieve('person', route.params.personid)
    .then((data) => {
      state.person = data;
    })
    .finally(() => {
      state.isLoading = false;
    });
};

getData();
</script>
