<template>
  <NavBar v-model.navbarHeight="navbarHeight" />
  <RouterView
    :style="
      'min-height: calc(100vh - ' +
      navbarHeight +
      'px); min-height: calc(var(--vh, 1vh) * 100 - ' +
      navbarHeight +
      'px);'
    "
    class="bg-base-200"
  />
</template>

<script>
import appsettings from '@/appsettings.json';
import NavBar from '@/components/NavBar.vue';
import _ from 'lodash';
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
  mounted() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    _.debo;
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
::-webkit-scrollbar {
  width: 20px;
}
::-webkit-scrollbar-track {
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
}
</style>
