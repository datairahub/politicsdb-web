<template>
  <div class="table-persons">
    <h2>Personas</h2>

    <TablePersonsFilters
      v-model:filters="state.filters"
    />

    <TableWrapper v-if="state.items.length">
      <template #thead>
        <tr>
          <th>Nombre</th>
          <th>Nacimiento</th>
          <th>Género</th>
        </tr>
      </template>
      <template #tbody>
        <tr v-for="item in state.items" :key="item.id">
          <td>
            <router-link :to="{ name: 'person', params: { personid: item.id } }">
              {{ item.full_name }}
            </router-link>
          </td>
          <td>
            {{ item.birth_date }}
          </td>
          <td>
            {{ item.genre }}
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
import { useRoute } from 'vue-router';
import TableWrapper from '@/components/layout/table/TableWrapper.vue';
import TablePagination from '@/components/layout/table/TablePagination.vue';
import TablePersonsFilters from '@/components/layout/table/persons/TablePersonsFilters.vue';

const props = defineProps({
  filters: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

const route = useRoute();
const api = useApiStore();

const state = reactive({
  isLoading: false,
  items: [],
  filters: {
    search: route.query?.tpSearch,
    genre: route.query?.tpGenre,
  },
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
    ...state.filters,
    page: state.page,
    ordering: 'full_name',
  };
  api.list('person', params)
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

watch(() => state.filters, () => {
  if (state.page !== 1) {
    state.page = 1;
  } else {
    getTableData();
  }
});

watch(() => state.page, () => {
  getTableData();
});

getTableData();
</script>
