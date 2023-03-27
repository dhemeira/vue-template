<template>
  <footer class="bg-neutral text-neutral-content">
    <div class="footer items-center py-4 grid-flow-col px-6 max-w-[1400px] mx-auto">
      <div class="items-center grid-flow-col gap-4">
        <IconHashtag />
        <p>
          <slot>Made by Dhemeira</slot>
        </p>
      </div>
      <div class="grid-flow-col gap-4 place-self-center justify-self-end">
        <a :href="href" target="_blank">
          <IconGithub />
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
import IconGithub from '@/components/IconGithub.vue';
import IconHashtag from '@/components/IconHashtag.vue';
export default {
  props: {
    modelValue: Number,
    href: String,
  },
  components: {
    IconGithub,
    IconHashtag,
  },
  emits: ['update:modelValue'],
  mounted() {
    this.$emit('update:modelValue', document.querySelector('footer').offsetHeight);
  },
};
</script>
