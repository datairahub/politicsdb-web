<template>
  <CardWrapper>
    <template #header>
      <router-link :to="{ name: 'institution', params: { institutionid: institution.id } }">
        <img
          :src="imageSrc(institution)"
          :alt="`Bandera de ${institution.name}`"
          class="card__flag"
        >
        <h3>{{ institution.name }}</h3>
      </router-link>
    </template>

    <template #footer>
      <a href="">lorem</a>
      <a href="">ipsum</a>
      <a href="">dolor</a>
    </template>
  </CardWrapper>
</template>

<script setup>
import CardWrapper from './CardWrapper.vue';

defineProps({
  institution: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const imageSrc = (institution) => (institution && institution.id
  ? `${import.meta.env.VITE_STATIC_URL}images/adm0/${institution.adm0_code}.png`
  : '');
</script>
