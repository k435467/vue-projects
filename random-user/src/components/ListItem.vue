<script setup lang="ts">
import { useUserStore } from "@/store/user";
import { getName } from "@/utils/user";
import { computed } from "vue";

const props = defineProps<{
  userId: string;
}>();
const userStore = useUserStore();

const user = computed(() => userStore.getById(props.userId));
const name = computed(() => getName(user.value));
</script>

<template lang="pug">
div(
  v-if="user"
  class="p-4 w-full flex gap-4 flex-wrap"
)
  div(
    class="w-16 aspect-square bg-no-repeat bg-cover rounded"
    :style="{backgroundImage: `url(${user?.picture.large})`}"
  )
  div
    p(class="font-bold") {{ name }}
    p {{ user.email }}
    p {{ user.phone }}
</template>
