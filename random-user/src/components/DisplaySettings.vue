<script setup lang="ts">
import { initResults, resultOpts, useDisplay, useResults } from "@/utils";

const { results, onResultSelectChange } = useResults();
const { display, changeDisplayMode } = useDisplay();
</script>

<template lang="pug">
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
</template>
