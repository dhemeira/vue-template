<template>
  <footer class="footer items-center p-4 bg-neutral text-neutral-content grid-flow-col">
    <div class="items-center grid-flow-col gap-4">
      <IconHashtag />
      <p><slot>Made by Dhemeira</slot></p>
    </div>
    <div class="grid-flow-col gap-4 place-self-center justify-self-end">
      <a :href="href" target="_blank"><IconGithub /></a>
    </div>
  </footer>
</template>

<script>
import IconGithub from '@/components/IconGithub.vue';
import IconHashtag from '@/components/IconHashtag.vue';
export default {
  props: {
    href: String,
  },
  components: {
    IconGithub,
    IconHashtag,
  },
};
</script>
