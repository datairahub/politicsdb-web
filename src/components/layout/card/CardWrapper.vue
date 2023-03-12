<template>
  <div class="card" :class="classes">
    <div v-if="$slots.header" class="card__header">
      <slot name="header" />
    </div>
    <div v-if="$slots.default" class="card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  classes: {
    type: String,
    required: false,
    default: '',
  },
});
</script>

<style lang="scss">
.card {
  -webkit-box-shadow: 0 7px 14px 0 rgb(60 66 87 / 10%), 0 3px 6px 0 rgb(0 0 0 / 7%);
  box-shadow: 0 7px 14px 0 rgb(60 66 87 / 10%), 0 3px 6px 0 rgb(0 0 0 / 7%);
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  &__header {
    padding: 10px;
    a {
      color: var(--text-color-default);
      &:hover {
        color: var(--primary-color-default);
      }
    }
    img {
      display: inline-block;
      vertical-align: top;
      margin-top: 7px;
    }
    h3 {
      display: inline-block;
      margin-top: 0;
    }
  }
  &__body {
    padding: 10px;
    flex: 1 1 auto;
    min-height: 100px;
  }
  &__footer {
    padding: 10px;
    background: var(--background-color-light);
    line-height: 1;
    display: flex;
    gap: 10px;
    font-size: 12px;
    a {
      color: var(--text-color-default);
      &:hover {
        text-decoration: underline;
      }
    }
  }
  &__flag {
    height: 14px;
    width: auto;
    margin-right: 4px;
  }
}
</style>
