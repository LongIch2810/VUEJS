<template>
  <button
    :class="[
      color,
      'px-4 py-2 rounded flex items-center justify-center gap-1',
      $attrs.class,
    ]"
    :type="type"
    @click="onClick"
  >
    <slot></slot>
    <slot name="icon" />
  </button>
</template>
<script setup>
defineOptions({
  inheritAttrs: false,
});
const props = defineProps({
  type: {
    type: String,
    default: "button",
  },
  color: {
    type: String,
    default: "bg-primary",
  },
  onClick: {
    type: Function,
    default: () => {},
  },
});
</script>
