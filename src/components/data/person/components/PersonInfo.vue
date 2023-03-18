<template>
  <div class="person-info">
    <div v-if="person.image" class="person-info__image">
      <img :src="person.image" :alt="`Foto de ${person.full_name}`">
    </div>
    <div class="person-info__body">
      <p><strong>ID: </strong> {{ person.id }}</p>
      <p><strong>Nombre único: </strong> {{ person.id_name }}</p>
      <p><strong>Nombre: </strong> {{ person.first_name }}</p>
      <p><strong>Apellidos: </strong> {{ person.last_name }}</p>
      <p><strong>Fecha de nacimiento: </strong> {{ person.birth_date }}</p>
      <p><strong>Edad: </strong> {{ getAge(person.birth_date) }} años</p>
      <p><strong>Género: </strong> {{ Person.translateGenre(person.genre) }}</p>
    </div>
  </div>
</template>

<script setup>
import Parser from '@/services/parser/Parser';
import Person from '@/services/person/Person';

defineProps({
  person: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const getAge = (birthDate) => {
  if (!birthDate) return '?';
  return Parser.yearsBetweenDates(new Date(birthDate));
};
</script>

<style lang="scss">
.person-info {
  display: flex;
  gap: 10px;
  &__image {

  }
  &__body {

  }
}
</style>
