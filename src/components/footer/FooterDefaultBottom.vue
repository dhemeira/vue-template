<template>
  <div class="footer px-10 py-4 max-w-[1400px] gap-7 mx-auto max-md:footer-center">
    <div class="items-center grid-flow-col">
      <p class="flex max-sm:flex-col gap-1 items-center">
        <slot> Made by Dhemeira </slot>
      </p>
    </div>
    <div class="md:place-self-center md:justify-self-end">
      <div class="grid grid-flow-col gap-4">
        <a
          class="flex items-center gap-2 md:gap-0 link link-hover"
          :href="href"
          target="_blank"
          aria-label="Github link"
        >
          <IconGithub v-once />
          <span>Github</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import IconGithub from '@/components/icons/IconGithub.vue';
export default {
  props: {
    href: String,
  },
  components: {
    IconGithub,
  },
};
</script>
