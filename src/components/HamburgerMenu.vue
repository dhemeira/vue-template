<template>
  <div class="drawer-side" :aria-hidden="!hamburgerOpen">
    <label for="my-drawer-3" class="drawer-overlay"></label>
    <ul class="menu p-4 w-80 bg-base-100 gap-1 pt-16" data-cy="hamburger-menu">
      <li v-for="menuItem in filteredMenuItems" :key="menuItem.url">
        <router-link class="p-0 focus:outline focus:outline-2 focus:outline-current" :to="menuItem.url" tabindex="2"
          @keypress="closeKb">
          <span class="w-full pl-6 pr-6 py-2 font-semibold" @click="close()" role="link">{{
            menuItem.name
          }}</span>
        </router-link>
      </li>
    </ul>
    <div
      class="fixed top-0 left-0 z-[99999] close-icon w-80 flex items-center p-1 justify-between border-b-[1px] bg-base-200">
      <div class="text-base pl-5 font-semibold">
        {{ settings.APP_NAME }}
      </div>
      <button class="btn btn-ghost btn-md btn-circle hamburger-close" @keypress="closeKb" @click="close()" tabindex="1"
        aria-label="Menü bezárása">
        <XMarkIcon v-once class="h-8 w-8" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>

<script>
import { XMarkIcon } from '@heroicons/vue/20/solid';
export default {
  props: ['menuItems', 'hamburgerOpen'],
  emits: ['update:hamburgerOpen'],
  computed: {
    filteredMenuItems() {
      return this.menuItems.filter((e) => {
        //change true to condition for filtering if needed
        return true;
      });
    }
  },
  methods: {
    close() {
      document.querySelector("#my-drawer-3").checked = false
      this.$emit('update:hamburgerOpen', false);
    },
    closeKb(e) {
      var code = e.which;
      // 13 = Return
      if ((code === 13)) {
        this.close();
        document.querySelector(".hamburger-open").focus()
      }
    },
  },
  components: { XMarkIcon },
}
</script>
<style scoped>
.drawer-side .router-link-exact-active {
  @apply active;
}

.drawer-toggle~.drawer-side .close-icon {
  --tw-translate-x: -100%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  transition-property: all;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.drawer-toggle:checked~.drawer-side .close-icon {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
</style>