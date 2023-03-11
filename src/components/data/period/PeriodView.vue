<template>
  <main v-loading="state.isLoading" class="main main--data">
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ name: 'data' }">
        Datos
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'institution', params: { institutionid: state.period.institution } }">
        {{ state.period.institution_name }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ state.period.name }}</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>{{ state.period.institution_name }} - {{ state.period.name }}</h1>

    <div>
      <p><strong>Número: </strong> {{ state.period.number }}</p>
      <p><strong>Código: </strong> {{ state.period.code }}</p>
      <p><strong>Periodo: </strong> {{ state.period.start }} - {{ state.period.end }}</p>
    </div>

    <TablePersons
      v-if="state.period.id"
      :filters="{ period: state.period.id }"
    />

    <ViewDataFooter />
  </main>
</template>

<script setup>
import { reactive } from 'vue';
import { useApiStore } from '@/stores/api';
import { useRoute } from 'vue-router';
import TablePersons from '@/components/layout/table/persons/TablePersons.vue';
import ViewDataFooter from '@/components/layout/views/ViewDataFooter.vue';

const route = useRoute();
const api = useApiStore();
const state = reactive({
  isLoading: false,
  period: {},
});

const getData = () => {
  state.isLoading = true;
  api.retrieve('period', route.params.periodid)
    .then((data) => {
      state.period = data;
    })
    .finally(() => {
      state.isLoading = false;
    });
};

getData();
</script>
