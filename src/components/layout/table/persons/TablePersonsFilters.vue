<template>
  <div class="table__filters table__filters--person table-persons-filters">
    <el-input
      v-model="state.search"
      clearable
      class="table-persons-filters__search"
      placeholder="Buscar"
    />

    <el-select v-model="state.genre" placeholder="Género" clearable>
      <el-option key="2" label="Hombre" value="M" />
      <el-option key="3" label="Mujer" value="F" />
    </el-select>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue';
import 'element-plus/es/components/button/style/css';

const emit = defineEmits(['update:filters']);
const props = defineProps({
  filters: {
    type: Object,
    required: true,
    default: () => ({
      search: '',
      genre: '',
    }),
  },
});

const state = reactive({
  search: computed({
    get() {
      return props.filters.search;
    },
    set(val) {
      emit('update:filters', { ...props.filters, search: val });
    },
  }),
  genre: computed({
    get() {
      return props.filters.genre;
    },
    set(val) {
      emit('update:filters', { ...props.filters, genre: val });
    },
  }),
});
</script>

<style lang="scss">
.table-persons-filters {
  &__search {
    flex: 0 1 300px;
  }

}
</style>
