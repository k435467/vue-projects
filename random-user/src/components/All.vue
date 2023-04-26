<script setup lang="ts">
import Card from "./Card.vue";
import { useUserStore } from "@/store/user";
import Pagination from "./Pagination.vue";
import { usePagination } from "@/utils";

const userStore = useUserStore();
const { curPage, tPages } = usePagination();
</script>

<template lang="pug">
div
  div(class="gap-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5")
    Card(v-for="userId in userStore.ids" :key="userId" :userId="userId" )
  div(class="py-8 flex justify-center")
    Pagination(:curPage="curPage" :tPages="tPages")/
</template>
