<template>
  <MainNavbar v-model.navbarHeight="navbarHeight" :variant="this.settings.NAVBAR_VARIANT"
    :shouldHideOnScroll="this.settings.NAVBAR_HIDEONSCROLL" />
  <div class="wrapper">
    <RouterView :style="
      'min-height: calc(100 * var(--vh) - ' + navbarHeight + 'px - ' + footerHeight + 'px);'
    " class="bg-base-200 px-6" />
    <MainFooter v-model.footerHeight="footerHeight" href="https://github.com/dhemeira/vue-template" />
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
@media only screen and (min-width: 640px) {
  :root {
    --scrollbar-color: #b2b8bb;
  }

  ::-webkit-scrollbar {
    width: 22px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-color);
    border-radius: 20px;
    border: 7px solid transparent;
    background-clip: content-box;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: rgb(105, 117, 119);
  }
}
</style>
