<template>
  <main v-loading="state.isLoading" class="main main--data">
    <h1>{{ state.person.full_name }}</h1>

    <PersonInfo
      :person="state.person"
    />

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

    <ViewDataFooter
      type="person"
      :instance="state.person"
    />
  </main>
</template>

<script setup>
import { reactive } from 'vue';
import { useApiStore } from '@/stores/api';
import { useRoute } from 'vue-router';
import PersonInfo from '@/components/data/person/components/PersonInfo.vue';
import TablePositions from '@/components/layout/table/positions/TablePositions.vue';
import TableBirthDateSources from '@/components/layout/table/birthdatesource/TableBirthDateSources.vue';
import PersonBiographies from '@/components/data/person/components/PersonBiographies.vue';
import ViewDataFooter from '@/components/layout/views/ViewDataFooter.vue';

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
