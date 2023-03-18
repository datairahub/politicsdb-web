<template>
  <div v-loading="state.isLoading" class="biographysources">
    <h2>Biografías</h2>

    <div class="biographysources__list">
      <div v-for="item in state.items" :key="item.id" class="biographysources__item">
        <div class="biographysources__item-title">
          <h3>{{ item.name }}</h3>
          <div class="biographysources__item-link">
            <a :href="item.url" :title="item.url" target="_blank" rel="noopener noreferrer">
              {{ getUrl(item) }}
            </a>
          </div>
        </div>
        <div class="biographysources__item-body">
          {{ getBiography(item) }}
        </div>
        <div v-if="item.value.length > state.limit" class="biographysources__item-button">
          <el-button size="small" @click="item.expanded = !item.expanded">
            {{ item.expanded ? 'Ver menos' : 'Ver más' }}
          </el-button>
        </div>
      </div>
    </div>

    <div v-if="!state.isLoading && state.items.length === 0" class="biographysources__empty">
      <el-alert title="Sin datos" type="info" :closable="false" />
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';
import { useApiStore } from '@/stores/api';

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
  limit: 500,
});

const getTableData = () => {
  if (state.isLoading) return;
  state.isLoading = true;
  const params = {
    ...props.filters,
    ordering: 'name',
  };
  api.list('biographysource', params)
    .then(({ results }) => {
      state.items = results.map((d) => ({ ...d, expanded: false }));
    })
    .finally(() => {
      state.isLoading = false;
    });
};

const getUrl = (item) => {
  if (item.url.length <= 60) return item.url;
  return `${item.url.substring(0, 60)}...`;
};

const getBiography = (item) => {
  if (item.value.length <= state.limit) return item.value;
  return item.expanded
    ? item.value
    : `${item.value.substring(0, state.limit)}...`;
};

watch(() => state.page, () => {
  getTableData();
});

getTableData();
</script>

<style lang="scss">
.biographysources {
  &__item {
    &-title {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 20px;
    }
    &-link {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    &-button {
      margin-top: 6px;
    }
  }
}
</style>
