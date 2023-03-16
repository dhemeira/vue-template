<template>
  <NavBar v-model.navbarHeight="navbarHeight" />
  <RouterView :style="'min-height: calc(100vh - ' + navbarHeight + 'px)'" class="bg-base-200" />
</template>

<script>
import appsettings from '@/appsettings.json';
import NavBar from '@/components/NavBar.vue';
export default {
  data() {
    return {
      navbarHeight: 0,
      settings: appsettings,
    };
  },
  components: {
    NavBar,
  },
  name: 'App',
  watch: {
    $route: {
      handler(to, from) {
        document.title = (to.meta.title ?? this.settings.APP_NAME) + ' | ' + this.settings.APP_NAME;
      },
      immediate: true,
    },
  },
};
</script>
