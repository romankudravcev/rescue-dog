<template>
  <NuxtLink
    :to="{ name: 'dogs-id', params: { id: dog.id } }"
    class="link-reset text-inherit bg-orange-50 border-1 border-orange-200 h-[450px] w-[300px] rounded-4xl cursor-pointer transition-transform transition-filter duration-300 hover:scale-105 hover:brightness-95"
  >
    <img
      :src="dog.photoUrl"
      class="rounded-t-4xl h-3/5 w-full object-cover object-center"
      :alt="dog.name"
    />
    <div class="flex flex-col m-4">
      <div class="flex justify-between mx-4 mb-3 items-center">
        <h2 class="text-xl font-bold">{{ dog.name }}</h2>
        <p class="text-sm text-gray-700">{{ dog.breed }}</p>
      </div>
      <span
        ><i class="bi bi-gender-ambiguous text-primary-500 mr-1"></i
        ><strong>Geschlecht:</strong> {{ dog.gender }}</span
      >
      <span
        ><i class="bi bi-cake2-fill text-primary-500 mr-1"></i
        ><strong>Geburtstag:</strong> {{ dog.age }}</span
      >
      <span
        ><i class="bi bi-rulers text-primary-500 mr-1"></i
        ><strong>Größe:</strong> {{ dog.size }}</span
      >
      <span
        ><i class="bi bi-scissors text-primary-500 mr-1"></i
        ><strong>Kastriert:</strong> {{ dog.neutered ? "Ja" : "Nein" }}</span
      >
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { DogPreview } from "~/server/models/dog";

defineProps<{
  dog: DogPreview;
}>();
</script>

<style scoped>
.link-reset {
  text-decoration: none;
  color: inherit;
}

.link-reset:hover {
  text-decoration: none;
  color: inherit;
}
</style>
