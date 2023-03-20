<template>
  <main class="main main--data download-view">
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ name: 'data' }">
        Datos
      </el-breadcrumb-item>
      <el-breadcrumb-item>Descarga</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>Descargar datos</h1>

    <p>
      Puedes consultar los modelos de datos y la descripción de sus campos en la sección
      <router-link :to="{ name: 'faqs-fields' }">Modelos</router-link>.
    </p>

    <h2>Descargar base de datos completa</h2>

    <p>
      Esta base de datos está licenciada bajo
      <a href="http://opendatacommons.org/licenses/odbl/1.0/" target="_blank" rel="noopener noreferrer">Open Database License</a>.
      Si transmite públicamente esta base de datos o cualquier
      base de datos derivada, deberá hacerlo <strong>bajo los términos
        de esta licencia u otra compatible, incluir una copia de
        esta licencia y mantener los avisos de derechos de autor</strong>.
    </p>
    <p />

    <div class="download-view__actions">
      <el-checkbox
        v-model="state.licenseAccepted"
        label="He leído y acepto los términos de la licencia"
        size="large"
      />
      <div>
        <el-button
          type="primary"
          :disabled="!state.licenseAccepted"
          @click="download"
        >
          Descargar
        </el-button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { reactive } from 'vue';

const state = reactive({
  licenseAccepted: false,
});

const download = () => {
  const url = `${import.meta.env.VITE_STATIC_URL}dump/dump.zip`;
  window.open(url, '_blank').focus();
};
</script>

<style lang="scss">
.download-view {
  &__actions {
    margin-top: 10px;
  }
}
</style>
