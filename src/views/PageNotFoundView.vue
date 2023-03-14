<template>
  <div class="items-center flex justify-center flex-col lg:gap-16 lg:flex-row gap-8 bg-base-200">
    <p class="text-center font-extrabold text-9xl lg:text-[14em]">404</p>
    <div>
      <div class="text-center lg:text-left">
        <h1 class="my-2 font-bold text-2xl">Ez az oldal nem található</h1>
        <p class="my-2 w-96">
          Elnézésedet kérjük! Látogasd meg a kezdőlapot, hogy megtaláld amit keresel.
        </p>
        <router-link class="btn btn-primary w-full font-bold" to="/"
          >Vissza a Kezdőlapra</router-link
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn {
  transition: all 200ms ease-in-out;
  box-shadow: 2px 5px 0 0 black;
}

.btn:hover,
.btn:active {
  transform: translateY(4px) translateX(2px);
  box-shadow: 0 0 0 0 black;
}
</style>
