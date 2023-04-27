<script setup lang="ts">
import Modal from "./Modal.vue";
import { computed, inject } from "vue";
import { getName, userModalKey } from "@/utils/user";
import { useUserStore } from "@/store/user";

const userModal = inject(userModalKey)!.userModal;

const userStore = useUserStore();
const user = computed(() => userStore.getById(userModal.id));
const name = computed(() => getName(user.value) ?? "");
</script>

<template lang="pug">
Modal(
  v-model:visible="userModal.show"
  :title="name"
  okText="Add to Favorite"
)
  div 123
</template>
