<template>
  <div class="flex flex-col w-4/5 h-screen mx-auto">
    <div class="text-center mt-20">
      <h1 class="text-3xl font-bold mb-4 textmarker">
        <slot name="title"></slot>
      </h1>
      <p class="text-gray-600 max-w-2xl mx-auto">
        <slot name="description"></slot>
      </p>
    </div>
    <div
      class="grid h-[calc(100%-8rem)]"
      :class="['gap-4 md:gap-20', 'grid-cols-1 md:grid-cols-12']"
    >
      <div :class="[leftColumnClasses, 'flex justify-center items-center']">
        <slot name="left"></slot>
      </div>
      <div :class="[centerColumnClasses, 'flex justify-center items-center']">
        <slot name="center"></slot>
      </div>
      <div :class="[rightColumnClasses, 'flex justify-center items-center']">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const columnClassMap = {
  1: 'md:col-span-1',
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  4: 'md:col-span-4',
  5: 'md:col-span-5',
  6: 'md:col-span-6',
  7: 'md:col-span-7',
  8: 'md:col-span-8',
  9: 'md:col-span-9',
  10: 'md:col-span-10',
  11: 'md:col-span-11',
  12: 'md:col-span-12',
};

const props = defineProps({
  leftRatio: {
    type: Number,
    default: 4,
    validator: (value) => value > 0 && value <= 12,
  },
  centerRatio: {
    type: Number,
    default: 4,
    validator: (value) => value > 0 && value <= 12,
  },
  rightRatio: {
    type: Number,
    default: 4,
    validator: (value) => value > 0 && value <= 12,
  },
});

// Add validation to ensure the sum of ratios equals 12
if (props.leftRatio + props.centerRatio + props.rightRatio !== 12) {
  console.warn('The sum of column ratios should equal 12');
}

const leftColumnClasses = computed(() => columnClassMap[props.leftRatio]);
const centerColumnClasses = computed(() => columnClassMap[props.centerRatio]);
const rightColumnClasses = computed(() => columnClassMap[props.rightRatio]);
</script>
