<template>
  <div class="hero h-full relative">
    <div class="hero-content text-center max-w-full break-words">
      <div>
        <h1 class="font-bold">{{ settings.APP_NAME }}</h1>
        <h2 class="text-xl py-6">This is a template!</h2>
        <LinkShadowButton
          to="/404"
          color="black"
          >Default CTA</LinkShadowButton
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import LinkShadowButton from '@/components/LinkShadowButton.vue';
export default {
  components: { LinkShadowButton },
};
</script>

<style scoped>
h1 {
  font-size: clamp(2.25rem, 1.192rem + 4.231vw, 5rem);
  line-height: 1;
}

h2 {
  font-size: clamp(1rem, 0.904rem + 0.385vw, 1.25rem);
  line-height: 1.75rem;
}
</style>
