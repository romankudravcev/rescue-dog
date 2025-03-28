<template>
  <OneColumnSection>
    <template v-slot:title>Suchende Süsis</template>
    <template v-slot:description>
      Diese Süsis suchen ein neues Heim. Bitte adoptiert sie.
    </template>
    <template v-slot:content>
      <div
        class="grid grid-cols-[repeat(auto-fit,300px)] w-full gap-10 justify-center grid-rows-[450px]"
      >
        <DogCard v-for="dog in dogs" :key="dog.name" :dog="dog" />
      </div>
    </template>
  </OneColumnSection>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import DogCard from "~/components/DogCard.vue";
import OneColumnSection from "~/components/sections/OneColumnSection.vue";
import { DogPreview } from "~/server/models/dog.js";

const dogs = ref<DogPreview[]>([]);

const fetchDogs = async () => {
  const response = await fetch("/api/dogs");
  if (response.ok) {
    dogs.value = await response.json();
  } else {
    console.error("Failed to fetch dogs");
  }
};

onMounted(fetchDogs);
</script>
