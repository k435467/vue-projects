<script setup lang="ts">
import ListItem from "./ListItem.vue";
import { mobileWidth } from "@/utils";

const props = defineProps<{
  ids: string[];
}>();
</script>

<template lang="pug">
//- desktop: table
table(v-if="$screen.width > mobileWidth" class="w-full")
  ListItem(
    v-for="id in ids"
    :key="id"
    :userId="id"
  )
//- mobile
div(v-else class="w-full")
  ListItem(
    v-for="id in ids"
    :key="id"
    :userId="id"
    isMobile
  )
</template>
