<script setup lang="ts">
import Card from "./Card.vue";
import List from "./List.vue";
import { useUserStore } from "@/store/user";
import Pagination from "./Pagination.vue";
import { useDisplay, usePagination } from "@/utils";
import UserModal from "./UserModal.vue";
import { userModalKey } from "@/utils/user";
import { provide, reactive } from "vue";

const userStore = useUserStore();
const { curPage, tPages } = usePagination();
const { display } = useDisplay();

// -- provide

const userModal = reactive({
  id: "",
  show: false,
});

const openUserModal = (id: string) => {
  userModal.id = id;
  userModal.show = true;
};

provide(userModalKey, {
  userModal,
  openUserModal,
});
</script>

<template lang="pug">
div
  div(
    v-if="display === 'grid'"
    class="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
  )
    Card(v-for="userId in userStore.ids" :key="userId" :userId="userId" )
  div(v-else)
    List(:ids="userStore.ids")
  div(class="py-8 flex justify-center")
    Pagination(:curPage="curPage" :tPages="tPages")/
  UserModal/
</template>
