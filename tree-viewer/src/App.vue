<script setup lang="ts">
import { useInputs } from "./utils";
import Tree from "./components/Tree.vue";

const { pairs, parsedObj, addPair, removePair } = useInputs();
</script>

<template lang="pug">
div(class="container mx-auto p-4 pb-8 h-screen flex flex-col")
  h1(class="text-2xl font-bold mb-2") Nested Key-Value Pair Tree Viewer
  div(class="grid grid-cols-2 gap-6 grow")
    div(class="border border-slate-500 p-3 space-y-4")
      div(class="flex justify-end")
        button(class="text-slate-800 bg-slate-200 p-2 font-bold" @click="addPair") + Add New Pair
      div(
        v-for="pair in pairs"
        :key="pair.id"
        class="grid grid-cols-[1fr_1fr_min(10%,3rem)] gap-3 px-2"
      )
        input(
          v-model="pair.key"
          class="w-full bg-transparent border border-slate-500 outline-none px-2 py-1"
          placeholder="Key"
        )
        input(
          v-model="pair.value"
          class="w-full bg-transparent border border-slate-500 outline-none px-2 py-1"
          placeholder="Value"
        )
        button(
          class="w-full text-slate-800 bg-slate-200"
          @click="removePair(pair.id)"
        ) -
    div(v-if="parsedObj" class="border border-slate-500 p-6")
      Tree(v-for="k in Object.keys(parsedObj)" :key="k" :keyName="k" :value="parsedObj[k]")/
</template>
