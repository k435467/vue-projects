<script setup lang="ts"></script>

<template lang="pug">
div(class="container mx-auto p-8")
  div(class="flex justify-between")
    div(class="flex space-x-4")
      router-link(to="/") All
      router-link(to="/favorite") Favorite
    div something 
  div
    router-view/
</template>
