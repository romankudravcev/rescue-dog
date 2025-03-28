<template>
  <div class="w-full min-h-screen relative flex flex-col">
    <div class="paw-container">
      <div
        v-for="(position, index) in pawPositions"
        :key="index"
        class="paw"
        :style="{
          left: `${position.left}px`,
          top: `${position.top}px`,
          transform: position.transform,
        }"
      ></div>
    </div>
    <Navbar />
    <div class="flex-1 mt-[80px]">
      <!-- Add margin-top equal to navbar height -->
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const pawPositions = ref([]);

const generateNonOverlappingPositions = (count) => {
  const positions = [];
  const size = 50; // Width and height of paw
  const minDistance = 100; // Minimum distance between paws
  const maxAttempts = 100; // Maximum attempts to place each paw

  const isOverlapping = (x, y) => {
    return positions.some((pos) => {
      const distance = Math.sqrt(
        Math.pow(pos.left - x, 2) + Math.pow(pos.top - y, 2)
      );
      return distance < minDistance;
    });
  };

  // Get the document height instead of window height
  const docHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight
  );

  for (let i = 0; i < count; i++) {
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < maxAttempts) {
      const x = Math.random() * (window.innerWidth - size);
      const y = Math.random() * (docHeight - size); // Use document height instead of window height

      if (!isOverlapping(x, y)) {
        positions.push({
          left: x,
          top: y,
          transform: `rotate(${Math.random() * 360}deg)`,
        });
        placed = true;
      }
      attempts++;
    }
  }

  return positions;
};

onMounted(() => {
  // Wait for the content to be rendered
  setTimeout(() => {
    pawPositions.value = generateNonOverlappingPositions(40);
  }, 100);
});
</script>

<style>
.paw-container {
  position: absolute; /* Changed from fixed to absolute */
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: visible; /* Changed from hidden to visible */
  pointer-events: none;
}

.paw {
  position: absolute; /* Changed from fixed to absolute */
  width: 40px;
  height: 40px;
  background-image: url('/paw-print.png');
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0.2;
  filter: brightness(0) sepia(100%) drop-shadow(0 0 0 #588157);
}
</style>
