<script setup lang="ts">
import { useUserStore } from "@/store/user";
import type { User } from "@/store/user";
import { ref, onBeforeMount, computed } from "vue";

const props = defineProps<{
  userId: string;
}>();
const userStore = useUserStore();

const user = ref<User>();
const name = computed(() => {
  if (user.value) {
    const { title, first, last } = user.value.name;
    return `${title} ${first} ${last}`;
  }
});

onBeforeMount(() => {
  user.value = userStore.getById(props.userId);
});
</script>

<template lang="pug">
div(
  v-if="user"
  class="group transition duration-300 relative w-full aspect-square bg-no-repeat bg-cover rounded overflow-hidden"
  :style="{backgroundImage: `url(${user?.picture.large})`}"
)
  div(class="absolute top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transition duration-300")
  p(class="opacity-0 group-hover:opacity-100 transition duration-300 mx-4 absolute text-white top-1/2 right-0 left-0 translate-y-[-50%] text-center") {{ name }}
</template>
