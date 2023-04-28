<script setup lang="ts">
import { getBtnArr, usePage } from "@/utils/index";
import { computed } from "vue";

const props = defineProps<{
  curPage?: number;
  tPages: number;
}>();

const pages = computed(() => {
  return getBtnArr(props.tPages, props.curPage);
});

// --

const page = usePage();

const goToPage = (p: number | string) => {
  if (props.curPage) {
    if (p === "prev") p = Math.max(props.curPage - 1, 1);
    if (p === "next") p = Math.min(props.curPage + 1, props.tPages);
  }
  if (typeof p === "number") page.value = p;
};
</script>

<template lang="pug">
div(v-if="tPages > 0" class="flex space-x-2")
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
