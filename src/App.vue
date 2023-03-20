<template>
  <MainNavbar v-model.navbarHeight="navbarHeight" :sticky="this.settings.NAVBAR_STICKY" />
  <div class="wrapper" :style="'height: calc(100vh - ' + navbarHeight + 'px);'">
    <RouterView
      :style="'min-height: calc(100vh - ' + navbarHeight + 'px - ' + footerHeight + 'px);'"
      class="bg-base-200"
    />
    <MainFooter
      v-model.footerHeight="footerHeight"
      href="https://github.com/dhemeira/vue-template"
    />
  </div>
</template>

<script>
import appsettings from '@/appsettings.json';
import MainNavbar from '@/components/MainNavbar.vue';
import MainFooter from '@/components/MainFooter.vue';
import _ from 'lodash';
export default {
  data() {
    return {
      navbarHeight: 0,
      footerHeight: 0,
      settings: appsettings,
    };
  },
  components: {
    MainNavbar,
    MainFooter,
  },
  name: 'App',
  watch: {
    $route: {
      handler(to) {
        document.title = (to.meta.title ?? this.settings.APP_NAME) + ' | ' + this.settings.APP_NAME;
      },
      immediate: true,
    },
  },
  mounted() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.addEventListener(
      'resize',
      _.debounce(() => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }, 250)
    );
  },
};
</script>
<style>
:root {
  --scrollbar-color: #00000000;
}

*:hover,
*:focus,
*:focus-within {
  --scrollbar-color: #b2b8bb !important;
}
::-webkit-scrollbar {
  width: 20px;
}
::-webkit-scrollbar-track {
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-color);
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgb(105, 117, 119);
}
</style>
