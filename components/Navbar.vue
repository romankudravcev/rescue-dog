<template>
  <div
    class="fixed w-full top-0 transition-transform duration-500 bg-background"
    :class="{ '-translate-y-full': !showNavbar }"
  >
    <div class="grid grid-cols-2 auto-rows-min w-full items-stretch px-10 py-5">
      <div class="flex items-center gap-2">
        <img src="/logo.png" class="h-10" alt="Logo Tierschutzheim" />
        <h1>Tierschutzheim Steinertstraße e.V.</h1>
      </div>
      <div class="flex items-center justify-self-end gap-5">
        <a href="/#team" @click.prevent="scrollToSection('/', 'team')">Team</a>
        <a href="/#kontakt" @click.prevent="scrollToSection('/', 'kontakt')"
          >Kontakt</a
        >
        <a href="/tiere">Spenden</a>
        <button class="bg-primary" @click="navigateTo('/adopt')">
          Adoptieren
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showNavbar = ref(true);
const lastScrollPosition = ref(0);
const scrollThreshold = 200;
const isManualScroll = ref(true);

const handleScroll = () => {
  if (!isManualScroll.value) return;

  const currentScrollPosition = window.scrollY;
  if (
    Math.abs(currentScrollPosition - lastScrollPosition.value) < scrollThreshold
  ) {
    return;
  }
  showNavbar.value =
    currentScrollPosition < lastScrollPosition.value ||
    currentScrollPosition < scrollThreshold;
  lastScrollPosition.value = currentScrollPosition;
};

const scrollToSection = async (page, id) => {
  isManualScroll.value = false;
  if (router.currentRoute.value.path !== page) {
    await router.push(page);
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
  setTimeout(() => {
    isManualScroll.value = true;
    showNavbar.value = originalShowNavbar;
  }, 1000);
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
