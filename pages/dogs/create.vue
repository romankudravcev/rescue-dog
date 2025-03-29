<template>
  <div>
    <input v-model="name" type="text" placeholder="name" /><br />
    <input v-model="breed" type="text" placeholder="breed" /><br />
    <input v-model="age" type="number" placeholder="age" /><br />
    <input v-model="gender" type="text" placeholder="gender" /><br />
    <input v-model="size" type="text" placeholder="size" /><br />
    <input v-model="neutered" type="checkbox" /><label>Neutered</label><br />
    <input
      v-model="vaccination_status"
      type="text"
      placeholder="vaccination_status"
    /><br />
    <input
      v-model="adoption_status"
      type="text"
      placeholder="adoption_status"
    /><br />
    <input v-model="description" type="text" placeholder="description" /><br />
    <input
      v-model="preview_photo_url"
      type="text"
      placeholder="preview_photo_url"
    /><br />
    <input
      v-model="special_needs"
      type="text"
      placeholder="special_needs"
    /><br />
    <button @click="submit">Add</button>
    <hr />
  </div>
  {{ dog }}
</template>

<script setup lang="ts">
import { ref } from "vue";

const name = ref("");
const breed = ref("");
const age = ref<number>(0);
const gender = ref("");
const size = ref("");
const neutered = ref<boolean>(false);
const vaccination_status = ref("");
const adoption_status = ref("");
const description = ref("");
const preview_photo_url = ref("");
const special_needs = ref<string | null>(null);

const dog = ref<any>({});

function submit() {
  $fetch("/api/dogs", {
    method: "POST",
    body: {
      name: name.value,
      breed: breed.value,
      age: age.value,
      gender: gender.value,
      size: size.value,
      neutered: neutered.value,
      vaccination_status: vaccination_status.value,
      adoption_status: adoption_status.value,
      description: description.value,
      preview_photo_url: preview_photo_url.value,
      special_needs: special_needs.value,
    },
  }).then(async () => {
    dog.value = await $fetch("/api/dogs");
  });
}
</script>

<style scoped></style>
