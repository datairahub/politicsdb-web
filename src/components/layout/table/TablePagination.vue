<template>
  <tr>
    <td colspan="1000">
      <div class="table-pagination table__pagination">
        <div class="table-pagination__total">
          {{ pagination.total }} resultados
        </div>
        <div v-if="pagination.pages > 1" class="table-pagination__pages">
          <div
            class="table-pagination__page-btn table-pagination__page-btn--next"
            :class="{ disabled: page === 1 }"
            @click="$emit('update:page', page - 1)"
            @keyup="$emit('update:page', page - 1)"
          >
            ⬅
          </div>
          <div
            v-for="(number, i) in pageButtons"
            :key="number"
            class="table-pagination__page-btn"
            :class="{ current: number === page, step: i > 1 && number - pageButtons[i - 1] > 1 }"
            @click="$emit('update:page', number)"
            @keyup="$emit('update:page', number)"
          >
            {{ number }}
          </div>
          <div
            class="table-pagination__page-btn table-pagination__page-btn--next"
            :class="{ disabled: page === pagination.pages }"
            @click="$emit('update:page', page + 1)"
            @keyup="$emit('update:page', page + 1)"
          >
            ➡
          </div>
        </div>
      </div>
    </td>
  </tr>
</template>

<script setup>
import { computed } from 'vue';

defineEmits(['update:page']);
const props = defineProps({
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

const pageButtons = computed(() => {
  if (props.pagination.pages <= 1) return [];
  if (props.pagination.pages > 10) {
    const len = 5;
    return Array.from({ length: len }, (_, i) => i + 1)
      .concat(Array.from({ length: len }, (_, i) => (props.pagination.pages - len + 1) + i));
  }
  return Array.from({ length: props.pagination.pages }, (_, i) => i + 1);
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
  }
  &__page-btn {
    display: none;
    background: var(--background-color-dark);
    color: var(--text-color-lighter);
    cursor: pointer;
    height: $page-button-size;
    min-width: $page-button-size;
    padding: 2px;
    line-height: $page-button-size;
    border-radius: 2px;
    font-weight: 700;
    position: relative;
    box-sizing: content-box;
    &:hover {
      background: var(--background-color-darker);
      color: var(--text-color-light);
    }
    &.current {
      background: var(--background-color-inverted);
      color: var(--text-color-inverted);
      pointer-events: none;
    }
    &.disabled {
      color: var(--text-color-lightest);
      pointer-events: none;
    }
    &.step {
      margin-left: 20px;
      &:before {
        content: "...";
        position: absolute;
        left: calc($page-button-size * -1);
        color: var(--text-color-lighter) !important;
        pointer-events: none;
      }
    }
    &--next {
      display: block;
    }
  }
}

@media screen and (min-width: 568px) {
  .table-pagination {
    &__pages {
      justify-content: center;
    }
    &__page-btn {
      display: block;
    }
  }
}
</style>
