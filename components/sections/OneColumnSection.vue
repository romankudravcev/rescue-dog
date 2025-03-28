<template>
  <div class="flex flex-col w-4/5 h-screen mx-auto">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold mb-4 textmarker">
        <slot name="title"></slot>
      </h1>
      <p class="text-gray-600 max-w-2xl mx-auto">
        <slot name="description"></slot>
      </p>
    </div>
    <div class="grid h-[calc(100%-8rem)]">
      <slot name="content"></slot>
    </div>
  </div>
</template>
