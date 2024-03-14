<script setup>
import { useBoardStore } from '../stores/boardStore';
const router = useRouter();
const props = defineProps({
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

const newTaskName = ref('');

function addTask() {
  boardStore.addTask({
    taskName: newTaskName.value,
    columnIndex: props.columnIndex,
  });
  newTaskName.value = '';
}

function deleteColumn(columnIndex) {
  boardStore.deleteColumn(columnIndex);
}

function dropItem(event, toColumnIndex) {
  const fromColumnIndex = event.dataTransfer.getData('from-column-index');
  console.log(fromColumnIndex);
  const type = event.dataTransfer.getData('type');

  if (type === 'task') {
    const fromTaskIndex = event.dataTransfer.getData('from-task-index');
    boardStore.moveTask({
      fromColumnIndex,
      taskIndex: fromTaskIndex,
      toColumnIndex,
    });
  } else if (type === 'column') {
    boardStore.moveColumn({
      fromColumnIndex,
      toColumnIndex,
    });
  }
}

function goToTask(taskId) {
  router.push(`/tasks/${taskId}`);
}

function pickUpTheTask(event, { fromColumnIndex, fromTaskIndex }) {
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.dropEffect = 'move';
  event.dataTransfer.setData('type', 'task');
  event.dataTransfer.setData('from-column-index', fromColumnIndex);
  event.dataTransfer.setData('from-task-index', fromTaskIndex);
}

function pickUpColumn(event, fromColumnIndex) {
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.dropEffect = 'move';
  event.dataTransfer.setData('type', 'column');
  event.dataTransfer.setData('from-column-index', fromColumnIndex);
}
</script>

<template>
  <UContainer
    class="column"
    draggable="true"
    @dragstart.self="pickUpColumn($event, columnIndex)"
    @dragenter.prevent
    @dragover.prevent
    @drop.stop="dropItem($event, columnIndex)"
  >
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
      <li v-for="(task, taskIndex) in column.tasks" :key="task.id">
        <UCard
          class="mb-5"
          @click="goToTask(task.id)"
          draggable="true"
          @dragstart="
            pickUpTheTask($event, {
              fromColumnIndex: columnIndex,
              fromTaskIndex: taskIndex,
            })
          "
        >
          <strong>{{ task.name }}</strong>
          <p>{{ task.description }}</p>
        </UCard>
      </li>
    </ul>
    <UInput
      v-model="newTaskName"
      icon="i-heroicons-plus-circle-solid"
      type="text"
      placeholder="Create new task"
      @keyup.enter="addTask"
    />
  </UContainer>
</template>
