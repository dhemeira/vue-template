<template>
  <main class="hero">
    <div class="hero-content text-center max-w-full break-words">
      <div>
        <h1 class="font-bold">{{ settings.APP_NAME }}</h1>
        <h2 class="text-xl py-6">This is a template!</h2>
        <LinkShadow to="/404">Default CTA</LinkShadow>
      </div>
    </div>
  </main>
</template>

<script lang="js">
import appsettings from '@/appsettings.json';
import LinkShadow from '../components/LinkShadow.vue';
export default {
  data() {
    return {
      settings: appsettings,
    };
  },
  components: { LinkShadow }
};
</script>

<style scoped>
h1 {
  font-size: clamp(2rem, 1.286rem + 3.571vw, 4.5rem);
  line-height: 1;
}

h2 {
  font-size: clamp(1.125rem, 1.089rem + 0.179vw, 1.25rem);
  line-height: 1.75rem;
}
</style>
