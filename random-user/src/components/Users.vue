<script setup lang="ts">
import Card from "./Card.vue";
import List from "./List.vue";
import { useDisplay } from "@/utils";

const props = defineProps<{
  ids: string[];
}>();

const { display } = useDisplay();
</script>

<template lang="pug">
div(v-if="ids.length > 0")
  div(
    v-if="display === 'grid'"
    class="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
  )
    Card(v-for="userId in ids" :key="userId" :userId="userId" )
  div(v-else)
    List(:ids="ids")
p(v-else class="text-slate-400 text-center") Empty
</template>
