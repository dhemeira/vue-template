<template>
  <header
    :class="[settings.NAVBAR_VARIANT == 'sticky' ? 'sticky top-0' : '',
    settings.NAVBAR_VARIANT == 'floating' ? 'sticky top-0 pt-3 px-6' : '',
    settings.NAVBAR_HIDEONSCROLL == 'true' ? 'hideonscroll' : '',
      'z-50 transition-[top] duration-300', smallscreen ? 'smallscreen' : (settings.NAVBAR_HIDEONLYONPHONE == 'true' ? '' : 'smallscreen')]">
    <nav :class="['bg-base-100 shadow-md',
      settings.NAVBAR_VARIANT == 'floating' ? 'max-w-[1376px] mx-auto rounded-lg' : '']">
      <div :class="[settings.NAVBAR_VARIANT != 'floating' ? 'max-w-[1376px] mx-auto' : '', 'navbar']">
        <div class="flex-1 ml-3">
          <router-link class="btn btn-ghost normal-case text-base md:text-xl" to="/">{{
            settings.APP_NAME
          }}</router-link>
        </div>
        <div class="flex-none">
          <ul id="nav-menu" class="menu menu-horizontal px-1 gap-1 mr-3" data-cy="desktop-menu">
            <li v-for="menuItem in filteredMenuItems" :key="menuItem.url">
              <router-link class="px-3" v-if="menuItem.name == 'Profile' || menuItem.name == 'Profil'" :to="menuItem.url"
                :aria-label="menuItem.name" :title="menuItem.name">
                <UserCircleIcon v-once class="h-8 w-8" aria-hidden="true" />
              </router-link>
              <router-link v-else :to="menuItem.url">{{ menuItem.name }}</router-link>
            </li>
          </ul>
          <label v-if="smallscreen" for="my-drawer-3" class="btn btn-square btn-ghost hamburger-open" tabindex="0"
            role="button" @keypress="open" aria-label="Menü kinyitása">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              class="inline-block w-6 h-6 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { UserCircleIcon } from '@heroicons/vue/20/solid';
export default {
  data() {
    return {
      prevScrollpos: 0,
    };
  },
  props: {
    smallscreen: Boolean,
    menuItems: [Array, String],
  },
  emits: ["update-navbar-height", 'update-hamburger-open'],
  computed: {
    filteredMenuItems() {
      return this.menuItems.filter((e) => {
        //change true to condition for filtering if needed
        return true;
      });
    }
  },
  mounted() {
    this.$emit("update-navbar-height", document.querySelector("header").offsetHeight);
    this.prevScrollpos = document.querySelector(".drawer-content").scrollTop;
    document.querySelector(".drawer-content").onscroll = function () {
      if (document.querySelector(".hideonscroll.smallscreen")) {
        var currentScrollPos = document.querySelector(".drawer-content").scrollTop;
        document.querySelector(".hideonscroll.smallscreen").style.top = this.prevScrollpos > currentScrollPos ? "0" : "-77px";
        this.prevScrollpos = currentScrollPos;
      }
      else if (document.querySelector(".hideonscroll")) {
        document.querySelector(".hideonscroll").style.top = "0";
      }
    };
  },
  methods: {
    open(e) {
      var code = e.which;
      // 13 = Return
      if ((code === 13)) {
        document.querySelector("#my-drawer-3").checked = true;
        this.$emit("update-hamburger-open", true);
        document.querySelector(".hamburger-close").focus();
      }
    },
  },
  components: { UserCircleIcon }
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
