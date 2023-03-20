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
                class="max-h-screen fixed z-[99999] left-0 h-screen top-0 minmaxclamp origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="flex flex-col h-11">
                  <button
                    class="group inline-block self-end items-center rounded-md text-sm font-semibold px-2 py-2 text-gray-900"
                    @click="close()"
                  >
                    <XMarkIcon class="h-7 w-7" aria-hidden="true" />
                  </button>
                </div>
                <div class="px-1 py-1 scroller" style="max-height: calc(100% - 45px)">
                  <MenuItem>
                    <router-link
                      class="hamburger-menu-items group flex w-full items-center rounded-md text-sm font-semibold"
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
    sticky: [Boolean, String],
  },
  watch: {
    menuOpen: {
      handler(to, from) {
        document.querySelector('body').style.overflow = this.menuOpen ? 'hidden' : 'auto';
        const mainDiv = document.querySelector('main');
        if (mainDiv != null) mainDiv.style.pointerEvents = this.menuOpen ? 'none' : 'initial';
        if (this.menuOpen) document.querySelector('body').classList.add('overlay');
        else document.querySelector('body').classList.remove('overlay');
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

.minmaxclamp .scroller {
  overflow-y: hidden;
}
.minmaxclamp:hover .scroller {
  overflow-y: auto;
}

.minmaxclamp {
  -webkit-backdrop-filter: grayscale(1);
  backdrop-filter: grayscale(1);
}
</style>
<style>
body.overlay::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65));
  opacity: 0.6;
}
</style>
