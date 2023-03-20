<template>
  <main class="main main--faqs main--text">
    <el-breadcrumb>
      <el-breadcrumb-item>FAQs</el-breadcrumb-item>
    </el-breadcrumb>
    <h1>Preguntas frecuentes</h1>

    <h2>Modelos de datos</h2>
    <p>
      Puedes consultar los modelos de datos y la descripción de sus campos en la sección
      <router-link :to="{ name: 'faqs-fields' }">
        Modelos
      </router-link>.
    </p>
  </main>
</template>
