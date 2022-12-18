import { watch } from "vue";
import { defineStore } from "pinia";
import { FloorId } from "@/helpers/types";
import { useElevatorStore } from "./elevator";
import { useSaveToLS } from "@/helpers/useSaveToLS";

export const useQueueStore = defineStore("queue", () => {
  const elevatorStore = useElevatorStore();
  const queue = useSaveToLS<FloorId[]>(`queue`, []);

  watch([() => queue.value.length, () => elevatorStore.getIddleLength], () => {
    if (queue.value.length > 0 && elevatorStore.getIddleLength > 0) {
      startTask();
    }
  });

  const pushFloorIdToQueue = (floorId: FloorId) => {
    queue.value.push(floorId);
  };

  const startTask = () => {
    const floorId = queue.value.shift();

    if (floorId) {
      elevatorStore.changeDestinationFloor(floorId);
    }
  };

  return { pushFloorIdToQueue };
});
