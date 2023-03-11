<template>
  <tr>
    <td colspan="1000">
      <div class="table-pagination table__pagination">
        <div class="table-pagination__total">
          {{ pagination.total }} resultados
        </div>
        <div class="table-pagination__pages">
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
  justify-content: space-between;
  width: 100%;
  &__total {
    text-align: left;
    flex: 0 0 120px;
    line-height: $page-button-size;
    padding: 2px;
  }
  &__pages {
    text-align: center;
    flex: 1 0 auto;
    display: flex;
    justify-content: flex-end;
    gap: 5px;
    align-items: center;
    ul {
      padding: 0
    }
  }
}

@media screen and (min-width: 568px) {
  .table-pagination {
    &__pages {
      justify-content: center;
    }
  }
}
</style>
