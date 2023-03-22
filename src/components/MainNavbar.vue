<template>
  <header :class="[sticky == 'true' ? 'sticky top-0' : '', 'bg-base-100 z-50']">
    <nav>
      <div class="navbar max-w-full">
        <div class="flex-1">
          <RouterLink class="btn btn-ghost normal-case text-base md:text-xl" to="/">{{
            settings.APP_NAME
          }}</RouterLink>
        </div>
        <div class="flex-none">
          <ul id="nav-menu" class="menu menu-horizontal px-1 gap-1">
            <li v-for="menuItem in menuItems">
              <RouterLink :to="menuItem.url">{{ menuItem.name }}</RouterLink>
            </li>
          </ul>

          <Menu as="div" class="sm:hidden inline-block text-left" v-slot="{ open, close }">
            <MenuButton class="inline-flex w-full px-2 justify-center rounded-[1.9rem] btn btn-ghost">
              <label :class="['swap swap-rotate', open ? 'swap-active' : '']">
                <Bars3Icon class="h-8 w-8 swap-off fill-current" aria-hidden="true" />
                <XMarkIcon class="h-8 w-8 swap-on fill-current" aria-hidden="true" />
              </label>
              {{ (menuOpen = open) == null ? '' : '' }}
            </MenuButton>

            <transition enter-active-class="transition duration-150 ease-out"
              enter-from-class="transform -translate-x-32 opacity-0" enter-to-class="transform translate-x-0 opacity-100"
              leave-active-class="transition duration-100 ease-in" leave-from-class="transform translate-x-0 opacity-100"
              leave-to-class="transform -translate-x-32 opacity-0">
              <MenuItems
                class="max-h-full fixed z-[99999] left-0 h-full top-0 minmaxclamp origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="flex flex-col h-16 text-base items-start pl-5 justify-center font-semibold">
                  {{ settings.APP_NAME }}
                </div>
                <div class="px-1 py-1 scroller" style="max-height: calc(100% - 45px)">
                  <MenuItem v-for="menuItem in menuItems">
                  <router-link
                    class="hamburger-menu-items group flex items-center rounded-md text-sm font-semibold mt-1 mr-6"
                    :to="menuItem.url">
                    <span class="w-full pl-6 pr-6 py-2" @click="close()" role="link">{{
                      menuItem.name
                    }}</span>
                  </router-link>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/20/solid';
import appsettings from '@/appsettings.json';
export default {
  data() {
    return {
      settings: appsettings,
      menuOpen: null,
      menuItems: [
        { url: '/', name: 'Home' },
        { url: '/404', name: '404' },
      ],
    };
  },
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    Bars3Icon,
    XMarkIcon,
  },
  props: {
    modelValue: Number,
    sticky: [Boolean, String],
  },
  watch: {
    menuOpen: {
      handler() {
        const mainDiv = document.querySelector('.wrapper');
        if (mainDiv != null) {
          mainDiv.style.overflow = this.menuOpen
            ? 'hidden'
            : window.CSS.supports('overflow', 'overlay')
              ? 'overlay'
              : 'auto';
          mainDiv.style.pointerEvents = this.menuOpen ? 'none' : 'initial';
          if (this.menuOpen) mainDiv.classList.add('overlay');
          else mainDiv.classList.remove('overlay');
        }
      },
      immediate: true,
    },
  },
  emits: ['update:modelValue'],
  mounted() {
    this.$emit('update:modelValue', document.querySelector('header').offsetHeight);
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

@media (max-width: 639.9px) {
  #nav-menu {
    @apply hidden;
  }
}

.minmaxclamp {
  width: calc(100% - 64px - 25px);
  max-width: 100vw;
  min-width: fit-content;
}

.hamburger-menu-items {
  border-radius: var(--rounded-btn, 0.5rem);
}

.hamburger-menu-items.router-link-exact-active {
  background-color: #d1c1d7;
  color: #341141;
}

.hamburger-menu-items:not(.router-link-exact-active):hover {
  --tw-border-opacity: 0;
  background-color: hsl(var(--bc) / var(--tw-bg-opacity));
  --tw-bg-opacity: 0.2;
}

.minmaxclamp .scroller {
  overflow-y: auto;
}

@supports (overflow: overlay) {
  .minmaxclamp .scroller {
    overflow-y: overlay;
  }
}

.minmaxclamp {
  -webkit-backdrop-filter: grayscale(1);
  backdrop-filter: grayscale(1);
}
</style>
<style>
body {
  overflow: hidden;
}

.wrapper {
  overflow-x: hidden;
}

@supports (overflow: overlay) {
  .wrapper {
    overflow-y: overlay;
  }
}

.wrapper.overlay {
  opacity: 0.6;
}
</style>
