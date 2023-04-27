<script setup lang="ts">
const props = defineProps<{
  visible: boolean;
  title: string;
  okText: string;
}>();

const emit = defineEmits<{
  (e: "update:visible", value: boolean): void;
  (e: "ok"): void;
}>();
</script>

<template lang="pug">
Teleport(to="body")
  transition(
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  )
    div(
      v-show="visible"
      @click.self="emit('update:visible', false)"
      class="transition duration-300 fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
    )
      div(class="max-w-2xl p-6 mx-4 bg-white rounded-md shadow-xl")
        div(class="flex items-center justify-between")
          h3( class="text-2xl") {{ props.title }}
          v-icon(
            @click="emit('update:visible', false)"
            name="ri-close-fill"
            class="text-violet-700 cursor-pointer"
          )
        div(class="my-4")
          slot/
        button(
          @click="emit('update:visible', false)"
          class="px-6 py-2 border text-violet-700 border-violet-700 rounded"
        ) Cancel
        button(
          @click="emit('ok')"
          class="px-6 py-2 ml-2 text-white bg-violet-700 rounded"
        ) {{ props.okText }}
</template>
