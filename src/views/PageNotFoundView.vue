<template>
  <main
    class="items-center max-w-[100vw] flex justify-center flex-col lg:gap-16 lg:flex-row gap-8 pb-4 px-6"
  >
    <p class="text-center font-extrabold text-9xl lg:text-[14em]">404</p>
    <div class="text-center lg:text-left w-96 max-w-full">
      <h1 class="my-2 font-bold text-2xl">This page is not found</h1>
      <p class="my-2 w-96 max-w-[100%]">
        Sorry about that! Please visit our hompage to get where you need to go.
      </p>
      <router-link class="btn btn-primary w-full font-bold" to="/">Back to Homepage</router-link>
    </div>
  </main>
</template>

<style scoped>
.btn {
  transition: all 200ms ease-in-out;
  box-shadow: 2px 5px 0 0 black;
}
.font-extrabold {
  font-size: clamp(6.5rem, 4.357rem + 10.714vw, 14rem);
}
h1 {
  font-size: clamp(1.125rem, 1.018rem + 0.536vw, 1.5rem);
}
p:not(.font-extrabold) {
  font-size: clamp(0.875rem, 0.839rem + 0.179vw, 1rem);
}
.btn:hover,
.btn:active {
  transform: translateY(4px) translateX(2px);
  box-shadow: 0 0 0 0 black;
}
</style>
