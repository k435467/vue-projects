<script setup lang="ts">
import {
  initResults,
  resultOpts,
  useDisplay,
  useFavoritePagination,
  useResults,
  useUserPagination,
} from "@/utils";
import { computed, provide, reactive, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { userModalKey } from "./utils/user";
import Pagination from "./components/Pagination.vue";
import UserModal from "./components/UserModal.vue";
import { useFavoriteStore } from "./store/favorite";
import { useUserStore } from "./store/user";
import Users from "./components/Users.vue";

const path = {
  home: "/",
  favorite: "/favorite",
};

const router = useRouter();
const route = useRoute();

const goTo = (path: string) => {
  // keep query except page
  router.push({
    path,
    query: { ...route.query, page: 1 },
  });
};

const { results, onResultSelectChange } = useResults();
const { display, changeDisplayMode } = useDisplay();

// pagination

const userPagination = useUserPagination();
const favoritePagination = useFavoritePagination();

watchEffect(() => {
  // fetch users when route and qs change
  // TODO - redundant fetch
  if (route.path === path.home)
    userPagination.fetch(userPagination.curPage.value, results.value);
});

const pagination = computed(() => {
  const p = route.path === path.home ? userPagination : favoritePagination;
  return {
    curPage: p.curPage.value,
    tPages: p.tPages.value,
  };
});

// ids

const userStore = useUserStore();
const favoriteStore = useFavoriteStore();

const ids = computed(() => {
  if (route.path === path.home) {
    return userStore.ids;
  } else {
    const startId = (pagination.value.curPage - 1) * results.value;
    return favoriteStore.ids.slice(startId, startId + results.value);
  }
});

// -- provide user modal

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
div(class="container mx-auto p-8")
  div(class="flex justify-between items-center mb-8")
    div(class="flex space-x-4")
      a(
        @click="goTo(path?.home)"
        class="opacity-50 text-lg underline text-violet-700 cursor-pointer"
        :class="{'!opacity-100': $route.path === path.home}"
      ) All
      a(
        @click="goTo(path?.favorite)"
        class="opacity-50 text-lg underline text-violet-700 cursor-pointer"
        :class="{'!opacity-100': $route.path === path.favorite}"
      ) Favorite
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
  div
    Users(:ids="ids" :loading="userStore.loading")/
  div(class="py-8 flex justify-center")
    Pagination(v-bind="pagination")/
  UserModal/
</template>
