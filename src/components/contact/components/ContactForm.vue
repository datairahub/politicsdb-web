<template>
  <el-form class="contact-form" label-position="top">

    <el-form-item label="Tu email">
      <el-input
        v-model="state.from"
        placeholder="lorem@ipsum.com"
        :class="{'has-errors': fromHasErrors}"
      />
      <div v-if="fromHasErrors" class="el-form-item__error">
        <div v-if="state.from === ''">
          Campo obligatorio
        </div>
        <div v-else-if="!isValidEmail">
          No es un email válido
        </div>
      </div>
    </el-form-item>

    <el-form-item label="Asunto">
      <el-input
        v-model="state.subject"
        placeholder="Asunto"
        :class="{'has-errors': state.subject === ''}"
      />
      <div v-if="state.subject === ''" class="el-form-item__error">
        Campo obligatorio
      </div>
    </el-form-item>

    <el-form-item label="Mensaje">
      <el-input
        v-model="state.message"
        :autosize="{ minRows: 6, maxRows: 10 }"
        type="textarea"
        placeholder="Mensaje"
        :class="{'has-errors': state.message === ''}"
      />
      <div v-if="state.message === ''" class="el-form-item__error">
        Campo obligatorio
      </div>
    </el-form-item>

    <el-form-item class="buttons">
      <el-button
        type="primary"
        :disabled="!isValidForm"
        @click="emit('send')"
        >
        Enviar
      </el-button>
    </el-form-item>

  </el-form>
</template>

<script setup>
import { computed, reactive } from 'vue';
import Check from '@/services/check/Check';

const emit = defineEmits(['update:modelValue', 'send']);
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    default: () => ({
      from: '',
      subject: '',
      message: '',
    }),
  },
});

const state = reactive({
  fromHasErrors: false,
  from: computed({
    get() {
      return props.modelValue.from;
    },
    set(val) {
      emit('update:modelValue', { ...props.modelValue, from: val });
    },
  }),
  subject: computed({
    get() {
      return props.modelValue.subject;
    },
    set(val) {
      emit('update:modelValue', { ...props.modelValue, subject: val });
    },
  }),
  message: computed({
    get() {
      return props.modelValue.message;
    },
    set(val) {
      emit('update:modelValue', { ...props.modelValue, message: val });
    },
  }),
});

const isValidEmail = computed(() => {
  return Check.isValidEmail(state.from);
});

const fromHasErrors = computed(() => {
  return state.from === '' || !Check.isValidEmail(state.from);
});

const isValidForm = computed(() => {
  return state.from !== '' &&
    isValidEmail &&
    state.subject !== '' &&
    state.message !== '';
});
</script>
