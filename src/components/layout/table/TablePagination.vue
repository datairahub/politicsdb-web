<template>
  <tr>
    <td colspan="1000">
      <div class="table-pagination table__pagination">
        <div class="table-pagination__total">
          {{ total }} resultados
        </div>
        <div v-if="pages > 1" class="table-pagination__pages">
          <div
            class="table-pagination__page-btn"
            :class="{ disabled: page === 1 }"
            @click="$emit('page-diff', -1)"
            @keyup="$emit('page-diff', -1)"
          >
            ⬅
          </div>
          <div
            v-for="(number, i) in pageButtons"
            :key="number"
            class="table-pagination__page-btn"
            :class="{ current: number === page, step: i > 1 && number - pageButtons[i - 1] > 1 }"
            @click="$emit('page-set', number)"
            @keyup="$emit('page-set', number)"
          >
            {{ number }}
          </div>
          <div
            class="table-pagination__page-btn"
            :class="{ disabled: page === pages }"
            @click="$emit('page-diff', 1)"
            @keyup="$emit('page-diff', 1)"
          >
            ➡
          </div>
        </div>
        <div class="table-pagination__buttons" />
      </div>
    </td>
  </tr>
</template>

<script setup>
import { computed } from 'vue';

defineEmits(['page-set', 'page-diff']);

const props = defineProps({
  total: {
    type: Number,
    required: false,
    default: 0,
  },
  page: {
    type: Number,
    required: false,
    default: 0,
  },
  pageSize: {
    type: Number,
    required: false,
    default: 0,
  },
  pages: {
    type: Number,
    required: false,
    default: 0,
  },
});

const pageButtons = computed(() => {
  if (props.pages <= 1) return [];
  if (props.pages > 10) {
    const len = 5;
    return Array.from({ length: len }, (_, i) => i + 1)
      .concat(Array.from({ length: len }, (_, i) => (props.pages - len + 1) + i));
  }

  return Array.from({ length: props.pages }, (_, i) => i + 1);
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
    flex: 0 0 160px;
  }
  &__pages {
    text-align: center;
    flex: 1 0 auto;
    display: flex;
    justify-content: center;
    gap: 5px;
    align-items: center;
  }
  &__page-btn {
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
  }
  &__buttons {
    text-align: right;
    flex: 0 0 160px;
  }
}
</style>
