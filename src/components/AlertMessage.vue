<template>
  <div :class="['alert shadow-lg my-2', type]" v-if="message">
    <div>
      <IconError v-if="type == 'alert-error'" />
      <IconWarning v-if="type == 'alert-warning'" />
      <IconInfo :class="type == '' ? 'stroke-info' : ''" v-if="type == 'alert-info' || type == ''" />
      <IconSuccess v-if="type == 'alert-success'" />
      <span class="break-words">{{ message }}</span>
    </div>
  </div>
</template>
<script>
import IconError from '@/components/icons/IconError.vue';
import IconWarning from '@/components/icons/IconWarning.vue';
import IconInfo from '@/components/icons/IconInfo.vue';
import IconSuccess from '@/components/icons/IconSuccess.vue';
export default {
  props: {
    message: { default: "Siker" },
    type: {
      validator(value) {
        return ["alert-success", "alert-warning", "alert-info", "alert-error", ""].includes(value);
      },
      default: ""
    }
  },
  components: { IconError, IconWarning, IconInfo, IconSuccess }
}
</script>