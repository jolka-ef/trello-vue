<script setup>
import { useBoardStore } from '~/stores/boardStore';

const boardStore = useBoardStore();
const route = useRoute();
const router = useRouter();

const isModalOpen = computed(() => {
  return route.name === 'index-tasks-id';
});

const newColumnName = ref('');

function addColumn() {
  boardStore.addColumn(newColumnName.value);
  newColumnName = '';
}

function closeModal() {
  router.push('/');
}
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
    <div v-show="isModalOpen" @click.self="closeModal" class="task-bg">
      <NuxtPage :key="route.fullPath" />
    </div>
  </div>
</template>
