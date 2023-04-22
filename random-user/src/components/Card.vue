<script setup lang="ts">
import { User, useUserStore } from "@/store/user";
import { ref, onBeforeMount } from "vue";

const props = defineProps<{
  userId: string;
}>();
const userStore = useUserStore();

const user = ref<User>();

onBeforeMount(() => {
  user.value = userStore.getById(props.userId);
});
</script>

<template lang="pug">
div(class="p-4 w-12 h-12" :class="`bg-[url${user?.picture}]`")
</template>
