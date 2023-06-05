<template>
  <div
    class="drawer-side"
    :aria-hidden="!hamburgerOpen"
    tabindex="-1"
    :open="hamburgerOpen ? true : null"
  >
    <label
      for="my-drawer-3"
      class="drawer-overlay"
    ></label>
    <ul
      class="menu p-4 w-[300px] bg-base-100 gap-1 pt-16"
      data-cy="hamburger-menu"
    >
      <li
        v-for="menuItem in filteredMenuItems"
        :key="menuItem.url"
        :ref="'hamburger-items-' + menuItem.url"
      >
        <router-link
          class="p-0 focus:outline focus:outline-2 focus:outline-current"
          :to="menuItem.url"
          :tabindex="hamburgerOpen ? 2 : -1"
          @keypress="closeKb"
        >
          <span
            class="w-full pl-6 pr-6 py-2 font-semibold"
            @click="close()"
            role="link"
            >{{ menuItem.name }}</span
          >
        </router-link>
      </li>
    </ul>
    <div
      class="fixed top-0 left-0 z-[99999] close-icon w-[300px] flex items-center p-1 justify-between border-b-[1px] bg-base-200"
    >
      <div class="text-base pl-5 font-semibold">
        {{ settings.APP_NAME }}
      </div>
      <button
        class="btn btn-ghost btn-md btn-circle hamburger-close"
        @keypress="closeKb"
        @click="close()"
        :tabindex="hamburgerOpen ? 1 : -1"
        aria-label="Menü bezárása"
      >
        <XMarkIcon
          v-once
          class="h-8 w-8"
          aria-hidden="true"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { XMarkIcon } from '@heroicons/vue/20/solid';
export default {
  data() {
    return {
      lastElement: null as HTMLElement | null,
    };
  },
  props: ['menuItems', 'hamburgerOpen'],
  emits: ['update-hamburger-open'],
  computed: {
    filteredMenuItems() {
      return this.menuItems.filter(() => {
        //change true to condition for filtering if needed
        return true;
      });
    },
  },
  mounted() {
    document.addEventListener('keydown', (e) => {
      if (this.hamburgerOpen) {
        if (e.ctrlKey || e.metaKey || e.altKey) {
          return;
        }
        if (this.lastElement == null && this.menuItems != null) {
          this.lastElement = (
            this.$refs['hamburger-items-' + this.menuItems[this.menuItems.length - 1].url] as any
          )[0];
        }
        switch (e.key) {
          case 'Escape':
            this.close();
            (document.querySelector('.hamburger-open') as HTMLElement).focus();
            e.preventDefault();
            break;
          case 'Tab':
            if (e.shiftKey) {
              if (e.target === document.querySelector('.hamburger-close')) {
                if (this.lastElement != null) this.lastElement.querySelector('a')?.focus();
                e.preventDefault();
              }
            } else {
              if (this.lastElement != null && e.target === this.lastElement.querySelector('a')) {
                (document.querySelector('.hamburger-close') as HTMLElement).focus();
                e.preventDefault();
              }
            }
            break;
        }
      }
    });
  },
  watch: {
    hamburgerOpen() {
      if (this.menuItems != null) {
        this.lastElement = (
          this.$refs['hamburger-items-' + this.menuItems[this.menuItems.length - 1].url] as any
        )[0];
      }
      if (this.hamburgerOpen) (document.querySelector('.hamburger-close') as HTMLElement).focus();
    },
  },
  methods: {
    close() {
      (document.querySelector('#my-drawer-3') as HTMLInputElement).checked = false;
      this.$emit('update-hamburger-open', false);
    },
    closeKb(e: KeyboardEvent) {
      if (e.key == 'Enter') {
        this.close();
        const hamburgerOpen: HTMLInputElement | null = document.querySelector('.hamburger-open');
        if (hamburgerOpen != null) hamburgerOpen.focus();
      }
    },
  },
  components: { XMarkIcon },
};
</script>
<style scoped>
.drawer-side .router-link-exact-active {
  @apply active;
}

.drawer-toggle ~ .drawer-side .close-icon {
  --tw-translate-x: -100%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate))
    skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x))
    scaleY(var(--tw-scale-y));
  transition-property: all;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.drawer-toggle:checked ~ .drawer-side .close-icon {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate))
    skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x))
    scaleY(var(--tw-scale-y));
}
</style>
