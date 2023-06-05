<template>
  <div class="drawer">
    <input
      id="my-drawer-3"
      type="checkbox"
      class="drawer-toggle"
      aria-hidden="true"
      @change="hamburgerOpen = !hamburgerOpen"
      tabindex="-1"
    />
    <div
      class="drawer-content flex flex-col"
      tabindex="-1"
    >
      <NavbarDefault
        @update-navbar-height="(e) => (navbarHeight = e)"
        :smallscreen="smallscreen"
        :menuItems="menuItems"
        @update-hamburger-open="(e) => (hamburgerOpen = e)"
      />
      <main>
        <RouterView
          @show-error="openErrorToast"
          @show-success="openSuccessToast"
          :style="
            'min-height: calc(100vh - ' +
            navbarHeight +
            'px); min-height: calc(100dvh - ' +
            navbarHeight +
            'px);'
          "
          class="px-6 sm:px-12 max-w-[1400px] mx-auto"
        />
      </main>
      <FooterDefault href="https://github.com/dhemeira/vue-template" />
    </div>
    <NavbarHamburgerMenu
      :menuItems="menuItems"
      :hamburgerOpen="hamburgerOpen"
      @update-hamburger-open="(e: boolean) => (hamburgerOpen = e)"
    />
    <div class="absolute top-auto right-0 bottom-0 left-0 w-full pointer-events-none p-4">
      <TransitionGroup
        name="fade"
        tag="ul"
        class="flex flex-col items-end"
      >
        <AlertMessage
          v-for="message in messages"
          class="pointer-events-auto md:w-max max-w-[calc(100vw-2rem)]"
          :message="message.message"
          :type="message.type"
          :key="message.id"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue';
import NavbarPlaceholder from '@/components/navbar/NavbarPlaceholder.vue';
import { errorHandler } from '@/helpers';
interface Message {
  id: number;
  message: string;
  type: string;
}
export default {
  data() {
    return {
      navbarHeight: 0,
      smallscreen: false,
      menuItems: [
        { url: '/', name: 'Home' },
        { url: '/404', name: '404' },
      ],
      hamburgerOpen: false,
      messages: [] as Message[],
      timeOutId: 0,
    };
  },
  components: {
    NavbarDefault: defineAsyncComponent({
      loader: () => import('@/components/navbar/NavbarDefault.vue'),
      loadingComponent: NavbarPlaceholder,
    }),
    FooterDefault: defineAsyncComponent(() => import('@/components/footer/FooterDefault.vue')),
    NavbarHamburgerMenu: defineAsyncComponent(
      () => import('@/components/navbar/NavbarHamburgerMenu.vue')
    ),
    AlertMessage: defineAsyncComponent(() => import('@/components/AlertMessage.vue')),
  },
  name: 'App',
  watch: {
    $route: {
      handler(to) {
        document.title = (to.meta.title ?? this.settings.APP_NAME) + ' | ' + this.settings.APP_NAME;
        document.querySelector('nav')?.focus();

        if (to.meta.metaTags) {
          to.meta.metaTags.forEach(
            (metaTag: { content: string; name?: string; property?: string }) => {
              if (metaTag.name)
                document
                  .querySelector(`meta[name="${metaTag.name}"]`)
                  ?.setAttribute('content', metaTag.content);
              if (metaTag.property)
                document
                  .querySelector(`meta[property="${metaTag.property}"]`)
                  ?.setAttribute('content', metaTag.content);
            }
          );
        }
      },
      immediate: true,
    },
  },
  methods: {
    openSuccessToast(e: { message: string; time: number } | string) {
      if (e == '') return;
      var id = this.timeOutId++;
      var timeInMs: number;
      if (typeof e !== 'string') {
        this.messages.push({ id, message: e.message, type: 'alert-success' });
        timeInMs = e.time;
      } else {
        this.messages.push({ id, message: e, type: 'alert-success' });
        timeInMs = 5000;
      }
      setTimeout(() => {
        this.messages.splice(0, 1);
      }, timeInMs);
    },
    openErrorToast(e: { message: string; time: number } | string) {
      if (e == '') return;
      var id = this.timeOutId++;
      var timeInMs: number;
      if (typeof e !== 'string') {
        this.messages.push({ id, message: e.message, type: 'alert-error' });
        timeInMs = e.time;
      } else {
        this.messages.push({ id, message: e, type: 'alert-error' });
        timeInMs = 5000;
      }
      setTimeout(() => {
        this.messages.splice(0, 1);
      }, timeInMs);
    },
    debounce(func: TimerHandler, time: number): EventListenerOrEventListenerObject {
      var timer: number;
      return function (event: Event) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, time, event);
      };
    },
  },
  mounted() {
    // await import('@/helpers/debugUtils').then((e) => e.logActiveElement());
    this.smallscreen = window.innerWidth < 640;
    if (window.innerWidth < 300) this.openErrorToast(errorHandler({ code: 'too-small-screen' }));

    window.addEventListener(
      'resize',
      this.debounce(() => {
        this.smallscreen = window.innerWidth < 640;
        if (window.innerWidth < 300)
          this.openErrorToast(errorHandler({ code: 'too-small-screen' }));
      }, 500)
    );
  },
};
</script>
<style>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-30px, 0);
}

body {
  @apply bg-base-200;
}

@supports (overflow: overlay) {
  .drawer-content {
    overflow: overlay !important;
  }
}

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
