import { defineStore } from "pinia";
import { Floor } from "@/helpers/types";
import { appConfig } from "@/app.config";
import { useQueueStore } from "./queue";

interface FloorState {
  floors: Floor[];
}

const populateFloorList = (): Floor[] => {
  const floorList = [];
  for (let i = 0; i < appConfig.floorQuantity; i++) {
    floorList.push({
      id: i + 1,
      isWaitingElevator: false,
      hasElevator: i === 0 ? true : false,
    });
  }
  return floorList;
};

export const useFloorStore = defineStore({
  id: "floor",
  state: (): FloorState => ({
    floors: populateFloorList(),
  }),
  getters: {
    getFloorById: (state) => (floorId: number) => {
      return state.floors.find((floor) => floor.id === floorId);
    },
  },
  actions: {
    callElevator(floorId: number) {
      const { pushFloorIdToQueue } = useQueueStore();
      const floor = this.getFloorById(floorId);

      if (floor && !floor.isWaitingElevator && !floor.hasElevator) {
        floor.isWaitingElevator = true;
        pushFloorIdToQueue(floor.id);
      }
    },
  },
});
