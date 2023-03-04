<template>
  <main class="main main--data">
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ name: 'explore' }">
        Datos
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ institution.name }}</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>{{ institution.name }}</h1>

    <TablePeriods
      v-if="institution.id"
      :filters="{ institution: institution.id }"
    />

    <TablePersons
      v-if="institution.id"
      :filters="{ institution: institution.id }"
    />
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useApiStore } from '@/stores/api';
import { useRoute } from 'vue-router';
import TablePeriods from '@/components/layout/table/periods/TablePeriods.vue';
import TablePersons from '@/components/layout/table/persons/TablePersons.vue';

const route = useRoute();
const institution = ref({});
const api = useApiStore();

api.retrieve('institution', route.params.institutionid)
  .then((data) => {
    institution.value = data;
  });
</script>
