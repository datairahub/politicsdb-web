<template>
  <main class="main main--contact main--text">
    <h1>Contacto</h1>
    <p>
      Puedes contactarnos por <strong><a href="https://twitter.com/Saigesp" target="_blank" rel="noopener noreferrer">Twitter</a></strong>
      o usar el siguiente formulario:
    </p>

    <ContactForm
      v-model="state.form"
      @send="sendEmail"
    />
  </main>
</template>

<script setup>
import { reactive, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import ContactForm from '@/components/contact/components/ContactForm.vue';

const route = useRoute();

const state = reactive({
  form: {
    from: '',
    subject: '',
    message: '',
    data: route.query,
  },
});

onBeforeMount(() => {
  if (!route.query || !route.query.topic) return;

  if (route.query.topic === 'data') {
    state.form.subject = "Corrección de datos"
  }
});

const sendEmail = () => {
  console.log('send email', JSON.parse(JSON.stringify(state.form)));
};
</script>

<style lang="scss">
.main--contact {
  .contact-form {
    margin-top: 24px;
  }
}
</style>
