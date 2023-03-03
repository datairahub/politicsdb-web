<template>
  <div class="home-people-search">
    <h2 class="home-people-search__title">
      ¿Buscas a alguien?
    </h2>
    <p class="home-people-search__desc">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </p>
    <el-select
      v-model="state.selected"
      class="home-people-search__input"
      filterable
      remote
      clearable
      placeholder="Nombre"
      size="large"
      :remote-method="getData"
      :loading="state.isLoading"
      @change="goToPerson"
    >
      <el-option
        v-for="item in state.items"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
        <span>{{ item.label }}</span>
      </el-option>
    </el-select>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useApiStore } from '@/stores/api';

const api = useApiStore();
const router = useRouter();

const state = reactive({
  isLoading: false,
  selected: '',
  items: [],
});

const getData = (search) => {
  if (state.isLoading) return;
  if (!search || search.length < 4) {
    state.items = [];
    return;
  }
  state.isLoading = true;
  api.list('person', { search })
    .then(({ results }) => {
      state.items = results.map((d) => ({
        value: d.id,
        label: d.full_name,
      }));
    })
    .finally(() => {
      state.isLoading = false;
    });
};

const goToPerson = (personid) => {
  router.push({ name: 'person', params: { personid } });
};
</script>

<style lang="scss">
.home-people-search {
  text-align: center;
  padding: 40px 0;
  &__title {
    margin-top: 0 !important;
    line-height: 1.5;
  }
  &__desc {
    font-size: 14px;
    color: var(--text-color-light);
  }
  &__input {
    width: 100%;
    max-width: 480px;
    margin: 10px 0;
  }
}
</style>
