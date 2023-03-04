<template>
  <div class="hero">
    <h1 class="hero__title">
      Lorem ipsum dolor sit amet contectetur
    </h1>
    <p class="hero__subtitle">
      Quidem ducimus, possimus ab explicabo dolore, culpa nihil
      quisquam quam nostrum facilis excepturi rerum
    </p>
    <div class="hero__actions">
      <router-link :to="{ name: 'data' }">
        <el-button type="primary">
          Explorar
        </el-button>
      </router-link>
      <router-link :to="{ name: 'download' }">
        <el-button type="primary">
          Descargar
        </el-button>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss">
.hero {
  text-align: center;
  margin-bottom: 20px;
  &__title {
    line-height: 1;
    margin-bottom: 10px;
  }
  &__subtitle {
    margin-bottom: 10px;
  }
  &__actions {
    display: flex;
    gap: 10px;
    justify-content: center;
  }
}
</style>
