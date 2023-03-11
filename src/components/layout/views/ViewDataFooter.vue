<template>
  <div class="view-data-footer">
    <router-link :to="{name: 'contact'}">
      Comunicar datos incorrectos
    </router-link>
  </div>
</template>

<script setup>
</script>

<style lang="scss">
.view-data-footer {
  margin: 20px 0 10px;
  display: flex;
  justify-content: center;
  font-size: 12px;
  a {
    color: var(--text-color-lighter);
    &:hover {
      color: var(--primary-color-default);
    }
  }
}
</style>
