<template>
  <main class="main main--data">
    <h1>{{ person.full_name }}</h1>

    <TablePositions
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

const route = useRoute();
const person = ref({});
const api = useApiStore();

api.retrieve('person', route.params.personid)
  .then((data) => {
    person.value = data;
  });
</script>
