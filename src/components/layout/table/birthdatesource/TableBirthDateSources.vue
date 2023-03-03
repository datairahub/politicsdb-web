<template>
  <div class="table-birthdatesources">
    <h2>Fechas nacimiento</h2>

    <TableWrapper v-if="state.items.length">
      <template #thead>
        <tr>
          <th>Fuente</th>
          <th>Fecha</th>
          <th>Enlace</th>
        </tr>
      </template>
      <template #tbody>
        <tr v-for="item in state.items" :key="item.id">
          <td>
            {{ item.name }}
          </td>
          <td>
            {{ item.date }}{{ item.is_exact ? '' : '*' }}
          </td>
          <td style="max-width: 100px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">
            <a :href="item.url" :title="item.url" target="_blank" rel="noopener noreferrer">
              {{ item.url }}
            </a>
          </td>
        </tr>
      </template>
      <template #tfoot>
        <TablePagination
          v-model:page="state.page"
          :pagination="state.pagination"
        />
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
    ordering: 'name',
  };
  api.list('birthdatesource', params)
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

watch(() => state.page, () => {
  getTableData();
});

getTableData();
</script>
