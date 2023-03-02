<template>
  <div class="card-list">
    <slot />
  </div>
</template>

<style lang="scss">
.card-list {
  display: grid;
  gap: 16px;
}

@media screen and (min-width: 650px) {
  .card-list {
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (min-width: 1070px) {
  .card-list {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
