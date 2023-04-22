<script setup lang="ts">
const path = {
  home: "/",
  favorite: "/favorite",
};
</script>

<template lang="pug">
div(class="container mx-auto p-8")
  div(class="flex justify-between mb-8")
    div(class="flex space-x-4")
      router-link(:to="path?.home" class="opacity-50 text-lg underline text-violet-700" :class="{'opacity-100': $route.path === path?.home}") All
      router-link(:to="path?.favorite" class="opacity-50 text-lg underline text-violet-700" :class="{'opacity-100': $route.path === path?.favorite}") Favorite
    div something
  div
    router-view/
</template>
