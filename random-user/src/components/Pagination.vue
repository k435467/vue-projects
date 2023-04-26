<script setup lang="ts">
import { getBtnArr } from "@/utils/index";
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const props = defineProps<{ curPage?: number; tPages: number }>();

const pages = computed(() => {
  return getBtnArr(props.tPages, props.curPage);
});

// --

const router = useRouter();
const route = useRoute();

const goToPage = (page: number | string) => {
  if (props.curPage) {
    if (page === "prev") page = Math.max(props.curPage - 1, 1);
    if (page === "next") page = Math.min(props.curPage + 1, props.tPages);
  }
  if (Number.isInteger(page)) {
    router.replace({
      path: route.path,
      query: { ...route.query, page },
    });
  }
};
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
