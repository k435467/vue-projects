<script setup lang="ts">
import Card from "./Card.vue";
import ListItem from "./ListItem.vue";
import { useUserStore } from "@/store/user";
import Pagination from "./Pagination.vue";
import { useDisplay, usePagination } from "@/utils";

const userStore = useUserStore();
const { curPage, tPages } = usePagination();
const { display } = useDisplay();
</script>

<template lang="pug">
div
  div(
    class="grid"
    :class="display === 'grid' ?'gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5' : 'grid-cols-1 divide-y'"
  )
    Card(v-if="display === 'grid'" v-for="userId in userStore.ids" :key="userId" :userId="userId" )
    ListItem(v-else v-for="userId in userStore.ids" :key="'listItem' + userId" :userId="userId" )
  div(class="py-8 flex justify-center")
    Pagination(:curPage="curPage" :tPages="tPages")/
</template>
