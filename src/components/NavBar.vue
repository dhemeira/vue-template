<template>
  <header>
    <nav>
      <div class="navbar bg-base-100">
        <div class="flex-1">
          <RouterLink class="btn btn-ghost normal-case text-base md:text-xl" to="/">{{
            settings.APP_NAME
          }}</RouterLink>
        </div>
        <div class="flex-none">
          <ul id="nav-menu" class="menu menu-horizontal px-1 gap-1">
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/404">404</RouterLink></li>
          </ul>

          <Menu as="div" class="sm:hidden inline-block text-left" v-slot="{ open, close }">
            <div>
              <MenuButton class="inline-flex w-full justify-center rounded-[1.9rem] btn btn-ghost">
                {{ (menuOpen = open) == null ? '' : '' }}
                <Bars3Icon class="h-7 w-7" aria-hidden="true" />
              </MenuButton>
            </div>

            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems
                class="fixed z-[99999] left-0 h-screen top-0 minmaxclamp origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="flex flex-col absolute right-2 top-0">
                  <button
                    class="group inline-block self-end items-center rounded-md text-sm font-semibold px-2 py-2 text-gray-900"
                    @click="close()"
                  >
                    <XMarkIcon class="h-7 w-7" aria-hidden="true" />
                  </button>
                </div>
                <div class="px-1 py-1 overflow-y-hidden hover:overflow-y-auto max-h-screen">
                  <MenuItem>
                    <router-link
                      class="hamburger-menu-items group flex w-full items-center rounded-md text-sm font-semibold mt-10"
                      to="/"
                    >
                      <span class="w-full pl-6 pr-2 py-2" @click="close()" role="link">Home</span>
                    </router-link>
                  </MenuItem>
                  <MenuItem>
                    <router-link
                      class="hamburger-menu-items group flex w-full items-center rounded-md text-sm font-semibold mt-1"
                      to="/404"
                    >
                      <span class="w-full pl-6 pr-2 py-2" @click="close()" role="link">404</span>
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
  },
  watch: {
    menuOpen: {
      handler(to, from) {
        document.querySelector('body').style.overflow = this.menuOpen ? 'hidden' : 'auto';
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
  width: 66vw;
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
</style>
