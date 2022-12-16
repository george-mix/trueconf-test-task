import { ref } from "vue";
import { defineStore } from "pinia";

export const useQueueStore = defineStore("queue", () => {
  const queue = ref<number[]>([]);

  const pushFloorIdToQueue = (floorId: number) => {
    queue.value.push(floorId);
  };

  return { pushFloorIdToQueue };
});
