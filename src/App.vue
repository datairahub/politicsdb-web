<template>
  <div class="app">
    <NavBar />
    <RouterView />
    <FooterBase />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import NavBar from '@/components/layout/navbar/NavBar.vue';
import FooterBase from '@/components/layout/footer/FooterBase.vue';
</script>

<style lang="scss">
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  .main {
    flex: 1 0 auto;
  }
}
</style>
