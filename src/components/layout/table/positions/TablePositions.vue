<template>
  <div class="table-positions">
    <h2>Cargos</h2>

    <TablePositionsChart v-if="state.items?.length" :positions="state.items" />

    <TableWrapper v-if="state.items.length" v-loading="state.isLoading">
      <template #thead>
        <tr>
          <th>Nombre</th>
          <th>Inicio</th>
          <th>Fin</th>
        </tr>
      </template>
      <template #tbody>
        <tr v-for="item in state.items" :key="item.id">
          <td>
            <router-link :to="{ name: 'period', params: { periodid: item.period } }">
              {{ item.full_name }}
            </router-link>
          </td>
          <td>
            {{ item.start }}
          </td>
          <td>
            {{ item.end }}
          </td>
        </tr>
      </template>
      <template #tfoot>
        <TablePagination v-model:page="state.page" :pagination="state.pagination" />
      </template>
    </TableWrapper>

    <div v-if="!state.isLoading && state.items.length === 0" class="table__empty">
      <el-alert title="Sin datos" type="info" :closable="false" />
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';
import { useApiStore } from '@/stores/api';
import TableWrapper from '@/components/layout/table/TableWrapper.vue';
import TablePagination from '@/components/layout/table/TablePagination.vue';
import TablePositionsChart from '@/components/layout/table/positions/TablePositionsChart.vue';

const props = defineProps({
  filters: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

const api = useApiStore();

const state = reactive({
  isLoading: false,
  items: [],
  pagination: {
    total: 0,
    pageSize: 0,
    pages: 0,
  },
  page: 1,
});

const getTableData = () => {
  if (state.isLoading) return;
  state.isLoading = true;
  const params = {
    ...props.filters,
    page: state.page,
    ordering: '-start',
  };
  api
    .list('position', params)
    .then((data) => {
      state.pagination.total = data.count;
      state.pagination.pageSize = data.page_size;
      state.pagination.pages = data.total_pages;
      state.page = data.page;
      state.items = data.results;
    })
    .finally(() => {
      state.isLoading = false;
    });
};

watch(
  () => state.page,
  () => {
    getTableData();
  },
);

getTableData();
</script>
