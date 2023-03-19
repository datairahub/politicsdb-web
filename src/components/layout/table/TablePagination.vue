<template>
  <tr>
    <td colspan="1000">
      <div class="table-pagination table__pagination">
        <div class="table-pagination__total">
          {{ pagination.total }} resultados
        </div>
        <div
          v-if="pagination.total > pagination.pageSize"
          class="table-pagination__pages"
        >
          <el-pagination
            small
            background
            layout="prev, pager, next"
            :hide-on-single-page="true"
            :total="pagination.total"
            class="mt-4"
            @current-change="$emit('update:page', $event)"
          />
        </div>
      </div>
    </td>
  </tr>
</template>

<script setup>
defineEmits(['update:page']);
defineProps({
  pagination: {
    type: Object,
    required: true,
    default: () => ({
      total: 0,
      pageSize: 0,
      pages: 0,
    }),
  },
  page: {
    type: Number,
    required: true,
    default: 1,
  },
});
</script>

<style lang="scss">
$page-button-size: 20px;

.table-pagination {
  display: flex;
  justify-content: center;
  width: 100%;
  &__total {
    display: none;
    text-align: left;
    flex: 0 0 120px;
    line-height: $page-button-size;
    padding: 2px;
  }
  &__pages ul {
    padding: 0
  }
}

@media screen and (min-width: 588px) {
  .table-pagination {
    justify-content: space-between;
    &__total {
      display: block;
    }
  }
}

@media screen and (min-width: 768px) {
  .table-pagination {
    display: block;
    text-align: center;
    position: relative;
    &__total {
      display: block;
      float: left;
      position: absolute;
    }
    &__pages {
      display: inline-block;
    }
  }
}
</style>
