import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

import boardData from "~/data/board.json";

export const useBoardStore = defineStore("boardStore", () => {
  const board = useStorage("board", boardData);
  const deleteColumn = (columnIndex) =>
    board.value.columns.splice(columnIndex, 1);

  const addColumn = (columnName) =>
    board.value.columns.push({ name: columnName, tasks: [] });
  return {
    addColumn,
    board,
    deleteColumn,
  };
});
