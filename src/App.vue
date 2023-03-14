<template>
  <header>
    <nav>
      <div class="navbar bg-base-100">
        <div class="flex-1">
          <RouterLink class="btn btn-ghost normal-case text-xl" to="/">{{
            settings.APP_NAME
          }}</RouterLink>
        </div>
        <div class="flex-none">
          <ul class="menu menu-horizontal px-1 gap-1">
            <li><RouterLink to="/">Kezdőlap</RouterLink></li>
            <li><RouterLink to="/404">404</RouterLink></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <RouterView :style="'min-height: calc(100vh - ' + headerHeight + 'px)'" class="bg-base-200" />
</template>

<script>
import appsettings from './appsettings.json';
export default {
  data() {
    return {
      headerHeight: 0,
      settings: appsettings,
    };
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
    this.headerHeight = document.querySelector('header').offsetHeight;
  },
};
</script>

<style lang="css" scoped>
.router-link-exact-active {
  @apply active;
}

.navbar .menu li {
  @apply uppercase font-semibold;
}
</style>
