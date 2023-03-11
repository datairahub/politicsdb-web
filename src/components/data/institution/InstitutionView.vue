<template>
  <main v-loading="state.isLoading" class="main main--data">
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ name: 'data' }">
        Datos
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ state.institution.name }}</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>{{ state.institution.name }}</h1>

    <h2>Gráficos</h2>
    <CardListWrapper>
      <CardChart
        v-for="chart in state.charts"
        :key="chart.id"
        :chart="chart"
      />
    </CardListWrapper>

    <TablePeriods
      v-if="state.institution.id"
      :filters="{ institution: state.institution.id }"
    />

    <TablePersons
      v-if="state.institution.id"
      :filters="{ institution: state.institution.id }"
    />
  </main>
</template>

<script setup>
import { reactive } from 'vue';
import { useApiStore } from '@/stores/api';
import { useRoute } from 'vue-router';
import Charts from '@/services/charts/Charts';
import CardListWrapper from '@/components/layout/card/CardListWrapper.vue';
import CardChart from '@/components/layout/card/CardChart.vue';
import TablePeriods from '@/components/layout/table/periods/TablePeriods.vue';
import TablePersons from '@/components/layout/table/persons/TablePersons.vue';

const route = useRoute();
const api = useApiStore();
const charts = new Charts();
const state = reactive({
  isLoading: false,
  institution: {},
  charts: [],
});

const getData = () => {
  state.isLoading = true;
  api.retrieve('institution', route.params.institutionid)
    .then((data) => {
      state.institution = data;
      state.charts = charts.getCharts(data);
    })
    .finally(() => {
      state.isLoading = false;
    });
};

getData();
</script>
