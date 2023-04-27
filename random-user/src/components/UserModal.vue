<script setup lang="ts">
import Modal from "./Modal.vue";
import { computed, inject } from "vue";
import { getName, userModalKey } from "@/utils/user";
import { useUserStore } from "@/store/user";
import { useFavoriteStore } from "@/store/favorite";
import dayjs from "dayjs";

const userModal = inject(userModalKey)?.userModal;

const userStore = useUserStore();
const user = computed(() => userStore.getById(userModal?.id));
const name = computed(() => getName(user.value) ?? "");

const favoriteStore = useFavoriteStore();
const isFavorite = computed(() => favoriteStore.has(userModal?.id));
</script>

<template lang="pug">
Modal(
  v-if="userModal && user"
  v-model:visible="userModal.show"
  title="User Details"
  :okText="isFavorite ? 'Remove from Favorite': 'Add to Favorite'"
  @ok="favoriteStore.toggle(userModal.id, user)"
)
  div(class="flex flex-col items-center gap-4")
    img(
      class="w-36 aspect-square rounded"
      :src="user.picture.large"
      alt=""
    )
    p(class="font-bold text-lg") {{ name }}
    p {{ user.gender }}
    p {{ `${dayjs(user?.dob.date).format('YYYY/MM/DD')} (${user.dob.age})` }}
    p {{ user.email }}
    p {{ user.phone }}
    p {{ `${user.location.country} ${user.location.city}` }}
</template>
