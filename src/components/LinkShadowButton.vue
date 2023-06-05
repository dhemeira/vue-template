<template>
  <router-link
    class="btn btn-primary w-full font-bold"
    :to="to"
  >
    <slot></slot>
  </router-link>
</template>
<script lang="ts">
export default {
  props: {
    to: { type: [String, Object], default: '/' },
    color: { type: String, default: 'black' },
  },
};
</script>
<style scoped>
.btn {
  transition: all 200ms ease-in-out;
  box-shadow: 2px 5px 0 0 v-bind(color);
}

.btn:hover,
.btn:active {
  transform: translateY(4px) translateX(2px);
  box-shadow: 0 0 0 0 v-bind(color);
}
</style>
