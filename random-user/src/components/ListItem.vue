<script setup lang="ts">
import { useUserStore } from "@/store/user";
import { getName } from "@/utils/user";
import { computed } from "vue";
import { inject } from "vue";
import { userModalKey } from "@/utils/user";

const props = defineProps<{
  userId: string;
  isMobile?: boolean;
}>();
const userStore = useUserStore();

const user = computed(() => userStore.getById(props.userId));
const name = computed(() => getName(user.value));

const openUserModal = inject(userModalKey)!.openUserModal;
</script>

<template lang="pug">
tr(
  v-if="user && !isMobile"
  class="h-20 odd:bg-white even:bg-slate-50 [&>td]:py-2"
  @click="openUserModal(userId)"
)
  td
    img(
      class="w-16 aspect-square rounded"
      :src="user?.picture.large"
      alt=""
    )
  td
    p(class="font-bold") {{ name }}
  td
    p {{ user.email }}
  td
    p {{ user.phone }}
div(
  v-else-if="user && isMobile"
  class="py-2 w-full odd:bg-white even:bg-slate-50"
  @click="openUserModal(userId)"
)
  img(
    class="w-16 aspect-square rounded"
    :src="user?.picture.large"
    alt=""
  )
  p(class="font-bold") {{ name }}
  p {{ user.email }}
  p {{ user.phone }}
</template>
