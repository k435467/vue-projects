<script setup lang="ts">
import { onBeforeMount } from "vue";
import Card from "./Card.vue";
import { useUserStore } from "@/store/user";

const userStore = useUserStore();

onBeforeMount(() => {
  userStore.fetch();
});
</script>

<template lang="pug">
div(class="gap-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5")
  Card(v-for="userId in userStore.ids" :key="userId" :userId="userId" )
</template>
