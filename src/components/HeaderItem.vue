<template>
  <div class="p-2">
    <router-link :to="link" :class="['hover:text-indigo-400']" v-bind="$attrs">
      <div class="flex items-center gap-x-1">
        <span v-if="name">
          {{ name }}
        </span>
        <slot name="icon"></slot>
      </div>
    </router-link>
  </div>
</template>
<script setup>
defineOptions({ inheritAttrs: false });

const props = defineProps({
  name: {
    type: String,
    required: false,
  },
  link: {
    type: String,
    required: true,
  },
});
</script>
