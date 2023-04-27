<script setup lang="ts">
import { useUserStore } from "@/store/user";
import { useFavoriteStore } from "@/store/favorite";
import { getName } from "@/utils/user";
import { computed, inject } from "vue";
import { userModalKey } from "@/utils/user";
import FavoriteIcon from "./FavoriteIcon.vue";

const props = defineProps<{
  userId: string;
}>();
const userStore = useUserStore();
const favoriteStore = useFavoriteStore();

const isFavorite = computed(() => favoriteStore.has(props.userId));

const user = computed(() =>
  isFavorite.value
    ? favoriteStore.getById(props.userId)
    : userStore.getById(props.userId)
);
const name = computed(() => getName(user.value));

const openUserModal = inject(userModalKey)!.openUserModal;
</script>

<template lang="pug">
div(
  v-if="user"
  class="group transition duration-300 relative w-full aspect-square bg-no-repeat bg-cover rounded overflow-hidden cursor-pointer"
  :style="{backgroundImage: `url(${user?.picture.large})`}"
  @click="openUserModal(userId)"
)
  div(class="absolute top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transition duration-300")
  p(class="opacity-0 group-hover:opacity-100 transition duration-300 mx-4 absolute text-white top-1/2 right-0 left-0 translate-y-[-50%] text-center") {{ name }}
  div(
    class="absolute right-0 bottom-0 transition duration-300"
    :class="{'opacity-0 group-hover:!opacity-100': !isFavorite}"
  )
    FavoriteIcon(:checked="isFavorite" @click="favoriteStore.toggle(userId, user)")/
</template>
