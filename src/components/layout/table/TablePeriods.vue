<template>
  <div class="table-periods">
    <h2>Periodos</h2>
    <TableWrapper>
      <template #thead>
        <tr>
          <th>Nombre</th>
          <th>Número</th>
          <th>Código</th>
          <th>Inicio</th>
          <th>Fin</th>
        </tr>
      </template>
      <template #tbody>
        <tr v-for="period in periods" :key="period.id">
          <td>
            <router-link :to="{ name: 'period', params: { periodid: period.id } }">
              {{ period.name }}
            </router-link>
          </td>
          <td>{{ period.number }}</td>
          <td>{{ period.code }}</td>
          <td>{{ period.start }}</td>
          <td>{{ period.end }}</td>
        </tr>
      </template>
      <template #tfoot>
        <TablePagination
          :total="total"
          :page="page"
          :page-size="pageSize"
          :pages="pages"
          @page-diff="($event) => page += $event"
          @page-set="($event) => page = $event"
        />
      </template>
    </TableWrapper>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useApiStore } from '@/stores/api';
import TableWrapper from '@/components/layout/table/TableWrapper.vue';
import TablePagination from '@/components/layout/table/TablePagination.vue';

const total = ref(0);
const page = ref(1);
const pageSize = ref(0);
const pages = ref(0);
const periods = ref([]);
const api = useApiStore();

const props = defineProps({
  filters: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const getTableData = (filters) => {
  const params = {
    ...filters,
    ordering: '-number',
  };
  api.list('period', params)
    .then((data) => {
      total.value = data.count;
      page.value = data.page;
      pageSize.value = data.page_size;
      pages.value = data.total_pages;
      periods.value = data.results;
    });
};

watch(page, (val) => {
  getTableData({ ...props.filters, page: val });
});

getTableData(props.filters);
</script>
