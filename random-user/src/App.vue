<script setup lang="ts">
import { initResults, resultOpts, useDisplay, useResults } from "@/utils";
import Pagination from "@/components/Pagination.vue";

const path = {
  home: "/",
  favorite: "/favorite",
};

const { results, onResultSelectChange } = useResults();
const { display, changeDisplayMode } = useDisplay();
</script>

<template lang="pug">
div(class="container mx-auto p-8")
  div(class="flex justify-between items-center mb-8")
    div(class="flex space-x-4")
      router-link(
        :to="path?.home"
        class="opacity-50 text-lg underline text-violet-700"
        :class="{'!opacity-100': $route.path === path.home}"
      ) All
      router-link(
        :to="path?.favorite"
        class="opacity-50 text-lg underline text-violet-700"
        :class="{'!opacity-100': $route.path === path.favorite}"
      ) Favorite
    div(class="flex space-x-2 items-center")
      select(class="border rounded" :value="results.toString()" @change="onResultSelectChange($event)")
        option(v-for="v in resultOpts" :value="v" :selected="v === initResults") {{ v }}
      button(@click="changeDisplayMode('list')")
        v-icon(
          name="ri-menu-fill"
          class="text-violet-700 opacity-50"
          :class="{'!opacity-100': display === 'list'}"
        )
      button(@click="changeDisplayMode('grid')")
        v-icon(
          name="ri-layout-grid-line"
          class="text-violet-700 opacity-50"
          :class="{'!opacity-100': display === 'grid'}"
        )
  div
    router-view/
  div(class="py-8 flex justify-center")
    Pagination/
</template>
