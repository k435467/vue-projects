<script setup lang="ts">
import { useDisplay, useResults } from "@/utils";

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
        :class="{'!opacity-100': $route.path === path?.home}"
      ) All
      router-link(
        :to="path?.favorite"
        class="opacity-50 text-lg underline text-violet-700"
        :class="{'!opacity-100': $route.path === path?.favorite}"
      ) Favorite
    div(class="flex space-x-2 items-center")
      select(class="border rounded" :value="results.toString()" @change="onResultSelectChange($event)")
        option(value="10") 10
        option(value="30") 30
        option(value="50") 50
      button(@click="changeDisplayMode('list')")
        v-icon(name="ri-menu-fill" class="text-violet-700")
      button(@click="changeDisplayMode('grid')")
        v-icon(name="ri-layout-grid-line" class="text-violet-700")
  div
    router-view/
</template>
