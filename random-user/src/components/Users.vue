<script setup lang="ts">
import { provide, reactive } from "vue";
import Card from "./Card.vue";
import List from "./List.vue";
import { useDisplay } from "@/utils";
import { userModalKey } from "@/utils/user";
import UserModal from "@/components/UserModal.vue";

const props = defineProps<{
  ids: string[];
  loading?: boolean;
}>();

const { display } = useDisplay();

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
div(
  v-if="ids.length > 0"
  class="tansition duration-300"
  :class="loading ? 'opacity-30 pointer-events-none' : 'opacity-100'"
)
  div(
    v-if="display === 'grid'"
    class="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
  )
    Card(v-for="userId in ids" :key="userId" :userId="userId")
  div(v-else)
    List(:ids="ids")
p(v-else class="text-slate-400 text-center") Empty
UserModal/
</template>
