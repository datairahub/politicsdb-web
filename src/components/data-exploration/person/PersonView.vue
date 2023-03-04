<template>
  <main class="main main--data">
    <h1>{{ person.full_name }}</h1>

    <div>
      <p><strong>ID: </strong> {{ person.id }}</p>
      <p><strong>Nombre único: </strong> {{ person.id_name }}</p>
      <p><strong>Nombre: </strong> {{ person.first_name }}</p>
      <p><strong>Apellidos: </strong> {{ person.last_name }}</p>
      <p><strong>Fecha de nacimiento: </strong> {{ person.birth_date }}</p>
      <p><strong>Género: </strong> {{ person.genre }}</p>
    </div>

    <TablePositions
      v-if="person.id"
      :filters="{ person: person.id }"
    />

    <PersonBiographies
      v-if="person.id"
      :filters="{ person: person.id }"
    />

    <TableBirthDateSources
      v-if="person.id"
      :filters="{ person: person.id }"
    />
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useApiStore } from '@/stores/api';
import { useRoute } from 'vue-router';
import TablePositions from '@/components/layout/table/positions/TablePositions.vue';
import TableBirthDateSources from '@/components/layout/table/birthdatesource/TableBirthDateSources.vue';
import PersonBiographies from '@/components/data-exploration/person/PersonBiographies.vue';

const route = useRoute();
const person = ref({});
const api = useApiStore();

api.retrieve('person', route.params.personid)
  .then((data) => {
    person.value = data;
  });
</script>
