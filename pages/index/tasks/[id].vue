<script setup>
import { useBoardStore } from "~/stores/boardStore";

const route = useRoute();
const router = useRouter();

const boardStore = useBoardStore();

const task = computed(() => {
  return boardStore.getTask(route.params.id);
});
function deleteTask() {
  boardStore.deleteTask(route.params.id);
  router.push("/");
}
</script>

<template>
  <div class="task-container">
    <section v-if="task">
      <UFormGroup label="Name" class="mx-5 my-5">
        <UInput type="text" v-model="task.name" />
      </UFormGroup>
      <UFormGroup label="Description" class="mx-5 my-5">
        <UTextarea v-model="task.description" />
      </UFormGroup>
      <UButton
        @click="deleteTask"
        icon="i-heroicons-trash"
        color="red"
        class="ml-5"
      >
        Delete task
      </UButton>
    </section>
    <section v-else>Task not found.</section>
  </div>
</template>
