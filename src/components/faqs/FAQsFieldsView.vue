<template>
  <main class="main main--faqs main--text faqs-fields">
    <el-breadcrumb>
      <el-breadcrumb-item  :to="{ name: 'faqs' }">
        FAQs
      </el-breadcrumb-item>
      <el-breadcrumb-item>Modelos</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>Modelo de datos</h1>

    <el-descriptions
      v-for="model in state.models"
      :key="model.name"
      :title="model.name"
      :column="1"
      border>
      <template #extra>
        {{getDescription(model)}}
      </template>
      <el-descriptions-item
        v-for="field in model.fields"
        :key="field.name"
        :label="field.name">
        {{field.help_text}}.
      </el-descriptions-item>
    </el-descriptions>
  </main>
</template>

<script setup>
import { reactive } from 'vue';
import { useApiStore } from '@/stores/api';

const api = useApiStore();
const state = reactive({
  isLoading: false,
  models: [],
});

const getData = () => {
  state.isLoading = true;
  api.list('universe-fields')
    .then(({ results }) => {
      state.models = results;
    })
    .finally(() => {
      state.isLoading = false;
    });
};

const getDescription = (model) => {
  return model.description.replace('\n', '').trim();
}

getData();
</script>

<style lang="scss">
.faqs-fields {
  .el-descriptions {
    margin-bottom: 40px;
  }
  .el-descriptions__table {
    .el-descriptions__label {
      width: 140px;
    }
  }
}
</style>