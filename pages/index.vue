<script setup>
import { useBoardStore } from "~/stores/boardStore";

const boardStore = useBoardStore();

const newColumnName = ref("");
const addColumn = () => {
  boardStore.addColumn(newColumnName.value);
  newColumnName = "";
};
</script>
<template>
  <div class="board-container">
    <main class="board">
      <BoardColumn
        v-for="(column, columnIndex) in boardStore.board.columns"
        :key="column.id"
        :column="column"
        :columnIndex="columnIndex"
      />

      <UContainer class="column">
        <UInput
          icon="i-heroicons-plus-circle-solid"
          type="text"
          placeholder="Create new column"
          @keyup.enter="addColumn"
          v-model="newColumnName"
        />
      </UContainer>
    </main>
  </div>
</template>
