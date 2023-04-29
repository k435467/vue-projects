<script setup lang="ts">
import { useFavoritePagination, useResults, useUserPagination } from "@/utils";
import { computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import Pagination from "./components/Pagination.vue";
import { useFavoriteStore } from "./store/favorite";
import { useUserStore } from "./store/user";
import Users from "./components/Users.vue";
import { path } from "@/router";
import DisplaySettings from "./components/DisplaySettings.vue";
import Navigation from "./components/Navigation.vue";

const route = useRoute();

// -- pagination

const userPagination = useUserPagination();
const favoritePagination = useFavoritePagination();

const pagination = computed(() => {
  const p = route.path === path.home ? userPagination : favoritePagination;
  return {
    curPage: p.curPage.value,
    tPages: p.tPages.value,
  };
});

// -- user ids

const { results } = useResults();
const userStore = useUserStore();
const favoriteStore = useFavoriteStore();

const ids = computed(() => {
  if (route.path === path.home) {
    return userStore.ids;
  } else {
    const startId = (pagination.value.curPage - 1) * results.value;
    return favoriteStore.ids.slice(startId, startId + results.value);
  }
});

// -- fetch

watchEffect(() => {
  // fetch users when route and qs change
  if (route.path === path.home)
    userStore.fetch(userPagination.curPage.value, results.value);
});
</script>

<template lang="pug">
div(class="container mx-auto p-8")
  div(class="flex justify-between items-center mb-8")
    Navigation/
    DisplaySettings/
  div
    Users(:ids="ids" :loading="userStore.loading")/
  div(class="py-8 flex justify-center")
    Pagination(v-bind="pagination")/
</template>
