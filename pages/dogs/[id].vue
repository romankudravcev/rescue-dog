<template>
  <img
    :src="dog?.photoUrl"
    class="rounded-t-4xl h-3/5 w-full object-cover object-center"
    :alt="dog?.name"
  />
  <div class="flex flex-col m-4">
    <div class="flex justify-between mx-4 mb-3 items-center">
      <h2 class="text-xl font-bold">{{ dog?.name }}</h2>
      <p class="text-sm text-gray-700">{{ dog?.breed }}</p>
    </div>
    <span
      ><i class="bi bi-gender-ambiguous text-primary-500 mr-1"></i
      ><strong>Geschlecht:</strong> {{ dog?.gender }}</span
    >
    <span
      ><i class="bi bi-cake2-fill text-primary-500 mr-1"></i
      ><strong>Geburtstag:</strong> {{ dog?.age }}</span
    >
    <span
      ><i class="bi bi-rulers text-primary-500 mr-1"></i
      ><strong>Größe:</strong> {{ dog?.size }}</span
    >
    <span
      ><i class="bi bi-scissors text-primary-500 mr-1"></i
      ><strong>Kastriert:</strong> {{ dog?.neutered ? "Ja" : "Nein" }}</span
    >
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { DogExtended } from "~/server/models/dog";

const route = useRoute();

const dog = ref<DogExtended | null>(null);

const fetchDog = async () => {
  const response = await fetch("/api/dogs/" + route.params.id);
  if (response.ok) {
    dog.value = await response.json();
  } else {
    console.error("Failed to fetch dogs");
  }
};

onMounted(fetchDog);
</script>

<style scoped></style>
