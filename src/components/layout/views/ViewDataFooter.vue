<template>
  <div class="view-data-footer">
    <router-link :to="getRoute()">
      Comunicar datos incorrectos o faltantes
    </router-link>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  instance: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const getRoute = () => {
  const query = {
    topic: 'data',
    instanceType: props.type,
    instanceId: props.instance.id,
    instanceName: props.instance.name,
  };

  if (props.type === 'person') {
    query.instanceName = props.instance.full_name;
  }

  return { name: 'contact', query };
};
</script>

<style lang="scss">
.view-data-footer {
  margin: 20px 0 10px;
  display: flex;
  justify-content: center;
  font-size: 12px;
  a {
    color: var(--text-color-lighter);
    &:hover {
      color: var(--primary-color-default);
    }
  }
}
</style>
