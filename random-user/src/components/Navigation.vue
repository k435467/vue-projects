<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { path } from "@/router";

const router = useRouter();
const route = useRoute();

const goTo = (path: string) => {
  // keep query except page
  router.push({
    path,
    query: { ...route.query, page: 1 },
  });
};
</script>

<template lang="pug">
div(class="flex space-x-4")
  a(
    @click="goTo(path?.home)"
    class="opacity-50 text-lg underline text-violet-700 cursor-pointer"
    :class="{'!opacity-100': $route.path === path.home}"
  ) All
  a(
    @click="goTo(path?.favorite)"
    class="opacity-50 text-lg underline text-violet-700 cursor-pointer"
    :class="{'!opacity-100': $route.path === path.favorite}"
  ) Favorite
</template>
