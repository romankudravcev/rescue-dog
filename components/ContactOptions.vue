<template>
  <div class="grid grid-cols-1 justify-items-center text-center gap-5">
    <i class="text-5xl bi" :class="icon"></i>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <a :href="link">{{ link }}</a>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: 'bi-envelope',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});
</script>
