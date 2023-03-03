<template>
  <div class="biographysources">
    <h2>Biografías</h2>

    <div class="biographysources__list">
      <div v-for="item in state.items" :key="item.id" class="biographysources__item">
        <div class="biographysources__item-title">
          <h3>{{ item.name }}</h3>
          <div class="biographysources__item-link">
            <a :href="item.url" :title="item.url" target="_blank" rel="noopener noreferrer">
              {{ item.url }}
            </a>
          </div>
        </div>
        <div class="biographysources__item-body">
          {{ item.expanded ? item.bio : `${item.bio.substring(0, state.limit)}...` }}
        </div>
        <div class="biographysources__item-button">
          <el-button size="small" @click="item.expanded = !item.expanded">
            {{ item.expanded ? 'Ver menos' : 'Ver más' }}
          </el-button>
        </div>
      </div>
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