<template>
  <header
    :class="[
      settings.NAVBAR_VARIANT == 'sticky' ? 'sticky top-0' : '',
      settings.NAVBAR_VARIANT == 'floating' ? 'sticky top-0 pt-3 px-6' : '',
      settings.NAVBAR_HIDEONSCROLL == 'true' ? 'hideonscroll' : '',
      'z-50 transition-[top] duration-300',
      smallscreen ? 'smallscreen' : settings.NAVBAR_HIDEONLYONPHONE == 'true' ? '' : 'smallscreen',
    ]"
  >
    <nav
      :class="[
        'bg-base-100 shadow-md outline-none',
        settings.NAVBAR_VARIANT == 'floating' ? 'max-w-[1376px] mx-auto rounded-lg' : '',
      ]"
      tabindex="-1"
    >
      <div
        :class="[settings.NAVBAR_VARIANT != 'floating' ? 'max-w-[1376px] mx-auto' : '', 'navbar']"
      >
        <div class="flex-1 ml-3">
          <router-link
            class="btn btn-ghost normal-case text-base md:text-xl"
            to="/"
            >{{ settings.APP_NAME }}</router-link
          >
        </div>
        <div class="flex-none">
          <ul
            id="nav-menu"
            class="menu menu-horizontal px-1 gap-1 mr-3"
            data-cy="desktop-menu"
          >
            <li
              v-for="menuItem in menuItems"
              :key="menuItem.url"
            >
              <router-link
                :to="menuItem.url"
                class="focus-visible:outline-black"
                >{{ menuItem.name }}</router-link
              >
            </li>
          </ul>
          <label
            v-if="smallscreen"
            for="my-drawer-3"
            class="btn btn-square btn-ghost hamburger-open"
            tabindex="0"
            role="button"
            @keypress="open"
            aria-label="Menü kinyitása"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-6 h-6 stroke-current"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
export default {
  data() {
    return {
      prevScrollpos: 0,
    };
  },
  props: {
    smallscreen: Boolean,
    menuItems: Array<MenuItem>,
  },
  emits: ['update-navbar-height', 'update-hamburger-open'],
  computed: {
    filteredMenuItems() {
      return this.menuItems?.filter(() => {
        //change true to condition for filtering if needed
        return true;
      });
    },
  },
  mounted() {
    this.$emit('update-navbar-height', document.querySelector('header')?.offsetHeight);
    const drawerContent: HTMLElement | null = document.querySelector('.drawer-content');
    const hideOnScrollSmall: HTMLElement | null = document.querySelector(
      '.hideonscroll.smallscreen'
    );
    const hideOnScrolll: HTMLElement | null = document.querySelector('.hideonscroll');
    if (drawerContent != null && hideOnScrollSmall != null) {
      this.prevScrollpos = drawerContent.scrollTop;
      drawerContent.scroll = () => {
        if (document.querySelector('.hideonscroll.smallscreen')) {
          var currentScrollPos = drawerContent.scrollTop;
          hideOnScrollSmall.style.top = this.prevScrollpos > currentScrollPos ? '0' : '-77px';
          this.prevScrollpos = currentScrollPos;
        } else if (hideOnScrolll) {
          hideOnScrolll.style.top = '0';
        }
      };
    }
  },
  methods: {
    open(e: KeyboardEvent) {
      var code = e.key;
      if (code == 'Enter') {
        const drawer: HTMLInputElement | null = document.querySelector('#my-drawer-3');
        if (drawer != null) drawer.checked = true;
        this.$emit('update-hamburger-open', true);
        const hamburgerClose: HTMLElement | null = document.querySelector('.hamburger-close');
        if (hamburgerClose != null) hamburgerClose.focus();
      }
    },
  },
};
</script>

<style scoped>
.router-link-exact-active {
  @apply active;
}

.navbar .menu li {
  @apply font-semibold;
}

@media (max-width: 767.9px) {
  #nav-menu {
    @apply hidden;
  }
}
</style>
