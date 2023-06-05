<template>
  <footer class="bg-base-100 text-base-content">
    <FooterDefaultTop />
    <FooterDefaultBottom :href="href">
      <span>© 2023 {{ currentYear != 2023 ? ' - ' + currentYear : '' }}</span
      ><span class="max-sm:hidden">|</span><span>Made by Dhemeira</span>
    </FooterDefaultBottom>
  </footer>
</template>

<script lang="ts">
import FooterDefaultTop from '@/components/footer/FooterDefaultTop.vue';
import FooterDefaultBottom from '@/components/footer/FooterDefaultBottom.vue';
export default {
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
  props: {
    href: {
      type: String,
      required: true,
    },
  },
  components: {
    FooterDefaultBottom,
    FooterDefaultTop,
  },
};
</script>
