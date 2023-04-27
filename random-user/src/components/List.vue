<script setup lang="ts">
import ListItem from "./ListItem.vue";

const props = defineProps<{
  ids: string[];
}>();
</script>

<template lang="pug">
table(v-if="$screen.width > 768" class="w-full")
  ListItem(
    v-for="id in props.ids"
    :key="id"
    :userId="id"
  )
div(v-else class="w-full")
  ListItem(
    v-for="id in props.ids"
    :key="id"
    :userId="id"
    isMobile
  )
</template>
