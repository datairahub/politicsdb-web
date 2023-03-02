<template>
  <CardWrapper>
    <template #header>
      <router-link :to="{ name: 'institution', params: { institutionid: institution.id } }">
        <img
          :src="imageSrc"
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
import { computed } from 'vue';
import CardWrapper from './CardWrapper.vue';

const props = defineProps({
  institution: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const imageSrc = computed(() => (props.institution
  ? `${import.meta.env.VITE_STATIC_URL}images/adm0/${props.institution.adm0}.png`
  : ''));
</script>
