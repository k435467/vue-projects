<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{
  keyName: string;
  value: Object | string;
}>();

const vIsStr = computed(() => typeof props.value === "string");

const expand = ref<boolean>(true);
</script>

<template lang="pug">
div(v-if="vIsStr" class="text-lg")
  span(class="font-bold mr-1") {{ keyName }}
  span :
  span(class="text-rose-300 ml-3") {{ value }}
div(v-else class="text-lg")
  div(@click="expand = !expand" class="cursor-pointer")
    span(class="font-bold mr-1") {{ keyName }}
    span {{ expand ? '[-]' : '[+]' }}
  div(v-show="expand" class="pl-8")
    Tree(v-for="k in Object.keys(value)" :key="k" :keyName="k" :value="value[k]")
</template>
