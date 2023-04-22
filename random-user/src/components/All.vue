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
div(class="p-4 flex gap-4")
  Card(v-for="userId in userStore.ids" :userId=userId)
</template>
