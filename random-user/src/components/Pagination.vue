<script setup lang="ts">
import { useUserStore } from "@/store/user";
import { useResults } from "@/utils/index";
import { computed, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";

const userStore = useUserStore();
const { results } = useResults();

// compute the pages array for render btns

const curPage = computed(() => {
  return userStore.meta?.page;
});
const tPages = computed(() => {
  const totalUsers = 3010;
  return Math.floor(totalUsers / results.value);
});
const pages = computed(() => {
  if (!curPage.value) return [];
  const a: (string | number)[] = [];

  let btnCt = 5;
  if (curPage.value < btnCt) {
    for (let i = 1; i <= btnCt; ++i) a.push(i);
    a.push("...", tPages.value);
  } else if (tPages.value - curPage.value < btnCt) {
    a.push(1, "...");
    for (let i = tPages.value - 5; i <= tPages.value; ++i) a.push(i);
  } else {
    a.push(1, "...");
    for (
      let i = curPage.value - Math.floor(btnCt / 2);
      i <= curPage.value + Math.ceil(btnCt / 2);
      ++i
    )
      a.push(i);
    a.push("...", tPages.value);
  }

  return a;
});

// --

const router = useRouter();
const route = useRoute();

const goToPage = (page: number | string) => {
  if (curPage.value) {
    if (page === "prev") page = Math.max(curPage.value - 1, 1);
    if (page === "next") page = Math.min(curPage.value + 1, tPages.value);
  }
  if (Number.isInteger(page)) {
    router.replace({
      path: route.path,
      query: { ...route.query, page },
    });
  }
};

watchEffect(() => {
  // watch the page qs and then fetch users
  const page = parseInt((route.query.page ?? "") as string);
  if (Number.isInteger(page)) {
    userStore.fetch(page, results.value);
  }
});
</script>

<template lang="pug">
div(class="flex space-x-2")
  button(
    class="p-2 text-sm text-gray-900 hover:bg-gray-50 border rounede flex justify-center items-center"
    @click="goToPage('prev')"
  )
    v-icon(name="ri-arrow-drop-left-line")
  button(
    v-for="v in pages" 
    :key="v" 
    class="px-4 py-2 text-sm text-gray-900 hover:bg-gray-50 border rounede flex justify-center items-center"
    :class="{'bg-violet-700 !text-white hover:bg-violet-400': v === curPage}"
    @click="goToPage(v)"
    :disabled="v === '...'"
  ) {{ v }}
  button(
    class="p-2 text-sm text-gray-900 hover:bg-gray-50 border rounede flex justify-center items-center"
    @click="goToPage('next')"
  )
    v-icon(name="ri-arrow-drop-right-line")
</template>
