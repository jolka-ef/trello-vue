<script setup>
import { useBoardStore } from "~/stores/boardStore";

const route = useRoute();

const boardStore = useBoardStore();
const taskId = route.params.id;

const task = computed(() => {
  return boardStore.getTask(route.params.id);
});
</script>

<template>
  <div class="task-container">
    <h3>{{ task.name }}</h3>
    <p>{{ task.description }}</p>
  </div>
</template>
