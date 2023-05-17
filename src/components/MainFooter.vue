<template>
  <footer class="bg-base-100 text-base-content">
    <MainFooterTop />
    <MainFooterBottom :href="href">
      <span>© 2023 {{ currentYear != 2023 ? ' - ' + currentYear : '' }}</span><span
        class="max-sm:hidden">|</span><span>Made by Dhemeira</span>
    </MainFooterBottom>
  </footer>
</template>

<script>
import MainFooterTop from '@/components/MainFooterTop.vue';
import MainFooterBottom from '@/components/MainFooterBottom.vue';
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
    MainFooterBottom,
    MainFooterTop
  },
};
</script>
