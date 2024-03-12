<script setup>
import { useBoardStore } from "../stores/boardStore";

defineProps({
  column: {
    type: Object,
    required: true,
  },
  columnIndex: {
    type: Number,
    required: true,
  },
});
const boardStore = useBoardStore();
const editNameState = ref(false);
const deleteColumn = (columnIndex) => {
  boardStore.deleteColumn(columnIndex);
};
</script>

<template>
  <UContainer class="column">
    <div class="column-header mb-5">
      <div>
        <UInput v-if="editNameState" type="text" v-model="column.name" />
        <h2 v-else>{{ column.name }}</h2>
      </div>
      <div>
        <UButton
          @click="editNameState = !editNameState"
          class="mr-2"
          icon="i-heroicons-pencil-square"
          color="blue"
        />
        <UButton
          @click="deleteColumn(columnIndex)"
          icon="i-heroicons-trash"
          color="red"
        />
      </div>
    </div>

    <ul>
      <li v-for="task in column.tasks" :key="task.id">
        <UCard class="mb-5">
          <strong>{{ task.name }}</strong>
          <p>{{ task.description }}</p>
        </UCard>
      </li>
    </ul>
  </UContainer>
</template>
