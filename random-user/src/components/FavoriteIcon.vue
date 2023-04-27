<script setup lang="ts">
const props = defineProps<{
  checked?: boolean;
}>();

const emit = defineEmits<{
  (e: "click"): void;
}>();
</script>

<template lang="pug">
div(class="[&>svg]:text-violet-500 cursor-pointer p-2" @click.stop="emit('click')")
  v-icon(v-if="checked" name="ri-heart-fill")
  v-icon(v-else name="ri-heart-line")
</template>
