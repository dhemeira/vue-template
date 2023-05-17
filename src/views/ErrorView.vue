<template>
  <div class="items-center max-w-[100vw] flex justify-center flex-col lg:gap-16 lg:flex-row gap-8 pb-8 px-6">
    <p class="text-center font-extrabold text-9xl lg:text-[14em] select-none">{{ statusCode ?? 404 }}</p>
    <div class="text-center lg:text-left w-96 max-w-full flex flex-col gap-8">
      <div class="flex flex-col gap-2">
        <h1 class="font-bold text-2xl">{{ statusMessage }}</h1>
        <p class="w-96 max-w-[100%]">
          Sorry about that! Please visit our hompage to get where you need to go.
        </p>
      </div>
      <LinkShadowButton to="/" color="black">Back to Homepage</LinkShadowButton>
    </div>
  </div>
</template>
<script>
import LinkShadowButton from '@/components/LinkShadowButton.vue';
export default {
  components: { LinkShadowButton },
  computed: {
    statusCode() {
      var statusEl = document.querySelector('#app')
      if (statusEl) {
        var status = statusEl.dataset.status;
        if (status == '200') return '404'
        else return status
      }
      return '404'
    },
    statusMessage() {
      switch (this.statusCode) {
        case '403':
          return "You don't have permission to view this page"
        case '400':
        case '401':
          return 'This page is currently not available'
        case '500':
          return 'Server error'
        default:
          return 'This page is not found'
      }
    },
  },
  mounted() {
    document.title = (this.statusCode ?? 404) + ' | ' + this.settings.APP_NAME;
  },
};
</script>
<style scoped>
.font-extrabold {
  font-size: clamp(7.5rem, 5rem + 10vw, 14rem);
}

h1 {
  font-size: clamp(1.375rem, 1.231rem + 0.577vw, 1.75rem);
}
</style>