<template>
  <div class="hero">
    <div class="hero-content text-center">
      <div>
        <h1 class="text-7xl font-bold">{{ settings.APP_NAME }}</h1>
        <h2 class="text-xl py-6">Az oldal átalakítás alatt!</h2>
      </div>
    </div>
  </div>
</template>

<script>
import appsettings from '@/appsettings.json';
export default {
  data() {
    return {
      settings: appsettings,
    };
  },
};
</script>
