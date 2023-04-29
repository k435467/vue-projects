<script setup lang="ts">
import { reactive } from "vue";
import type { Pair } from "./types";
import { v4 as uuid } from "uuid";

const initInput: Pair[] = [
  {
    id: uuid(),
    key: "nav.header.creator",
    value: "3D Fabric Creator",
  },
  {
    id: uuid(),
    key: "nav.icon",
    value: "icon name",
  },
];

const input: Pair[] = reactive(initInput);

const addPair = () => {
  input.push({
    id: uuid(),
    key: "",
    value: "",
  });
};

const removePair = (id: string) => {
  const idx = input.findIndex((v) => v.id === id);
  if (idx >= 0) input.splice(idx, 1);
};
</script>

<template lang="pug">
div(class="container mx-auto p-4")
  h1(class="text-2xl font-bold mb-2") Nested Key-Value Pair Tree Viewer
  div(class="grid grid-cols-2 gap-6")
    div(class="border border-slate-500 p-3 space-y-4")
      div(class="flex justify-end")
        button(class="text-slate-800 bg-slate-200 p-2 font-bold" @click="addPair") + Add New Pair
      div(v-for="pair in input" :key="pair.id" class="grid grid-cols-[1fr_1fr_min(10%,3rem)] gap-3")
        input(class="w-full bg-transparent border border-slate-500 outline-none px-2 py-1")
        input(class="w-full bg-transparent border border-slate-500 outline-none px-2 py-1")
        button(class="w-full text-slate-800 bg-slate-200" @click="removePair(pair.id)") -
    div(class="border border-slate-500 p-3") 2
</template>
