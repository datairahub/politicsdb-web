<template>
  <main class="main main--data">
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ name: 'data' }">
        Datos
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'institution', params: { institutionid: period.institution } }">
        {{ period.institution_name }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ period.name }}</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>{{ period.institution_name }} - {{ period.name }}</h1>

    <div>
      <p><strong>Número: </strong> {{ period.number }}</p>
      <p><strong>Código: </strong> {{ period.code }}</p>
      <p><strong>Periodo: </strong> {{ period.start }} - {{ period.end }}</p>
    </div>

    <TablePersons
      v-if="period.id"
      :filters="{ period: period.id }"
    />
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useApiStore } from '@/stores/api';
import { useRoute } from 'vue-router';
import TablePersons from '@/components/layout/table/persons/TablePersons.vue';

const route = useRoute();
const period = ref({});
const api = useApiStore();

api.retrieve('period', route.params.periodid)
  .then((data) => {
    period.value = data;
  });
</script>
