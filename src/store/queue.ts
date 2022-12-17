import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { useElevatorStore } from "./elevator";

export const useQueueStore = defineStore("queue", () => {
  const elevatorStore = useElevatorStore();

  const queue = ref<number[]>([]);

  watch([() => queue.value.length, () => elevatorStore.getIddleLength], () => {
    if (queue.value.length > 0 && elevatorStore.getIddleLength > 0) {
      startTask();
    }
  });

  const pushFloorIdToQueue = (floorId: number) => {
    queue.value.push(floorId);
  };

  const startTask = () => {
    const floor = queue.value.shift();

    if (floor) {
      elevatorStore.changeDestinationFloor(floor);
    }
  };

  return { pushFloorIdToQueue };
});
