<template>
  <main class="main main--data missing-view">
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ name: 'data' }">
        Datos
      </el-breadcrumb-item>
      <el-breadcrumb-item>Datos faltantes</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>Datos faltantes</h1>

    <p>Aquí se muestran los datos faltantes en la base de datos.</p>

    <TablePersons
      title="Fechas de nacimiento"
      :filters="{ page_size: 10, birth_date__isnull: true }"
    />
  </main>
</template>
