<template>
  <div class="table-persons">
    <h2>Cargos</h2>
    <TableWrapper>
      <template #thead>
        <tr>
          <th>Nombre</th>
          <th>Fecha nacimiento</th>
          <th>Género</th>
        </tr>
      </template>
      <template #tbody>
        <tr v-for="person in persons" :key="person.id">
          <td>
            <router-link :to="{ name: 'person', params: { personid: person.id } }">
              {{ person.full_name }}
            </router-link>
          </td>
          <td>
            {{ person.birth_date }}
          </td>
          <td>
            {{ person.genre }}
          </td>
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
const persons = ref([]);
const api = useApiStore();

const props = defineProps({
  filters: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

const getTableData = (filters) => {
  const params = {
    ...filters,
    ordering: 'full_name',
  };
  api.list('person', params)
    .then((data) => {
      total.value = data.count;
      page.value = data.page;
      pageSize.value = data.page_size;
      pages.value = data.total_pages;
      persons.value = data.results;
    });
};

watch(page, (val) => {
  getTableData({ ...props.filters, page: val });
});

getTableData(props.filters);

</script>
