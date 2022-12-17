import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { FloorId } from "@/helpers/types";
import { useElevatorStore } from "./elevator";

export const useQueueStore = defineStore("queue", () => {
  const elevatorStore = useElevatorStore();
  const queue = ref<FloorId[]>([]);

  watch([() => queue.value.length, () => elevatorStore.getIddleLength], () => {
    if (queue.value.length > 0 && elevatorStore.getIddleLength > 0) {
      startTask();
    }
  });

  const pushFloorIdToQueue = (floorId: FloorId) => {
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
