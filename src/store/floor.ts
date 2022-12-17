import { defineStore } from "pinia";
import { Floor, FloorId } from "@/helpers/types";
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
    getFloorById: (state) => (floorId: FloorId) => {
      return (
        state.floors.find((floor) => floor.id === floorId) || ({} as Floor)
      );
    },

    getFloorIndexById: (state) => (floorId: FloorId) => {
      const floorIndex = state.floors.findIndex(
        (floor) => floor.id === floorId
      );
      return floorIndex;
    },

    getFloorQuantity: (state) => {
      return state.floors.length;
    },
  },
  actions: {
    callElevator(floorId: FloorId) {
      const { pushFloorIdToQueue } = useQueueStore();
      const floor = this.getFloorById(floorId);

      if (floor && !floor.isWaitingElevator && !floor.hasElevator) {
        floor.isWaitingElevator = true;
        pushFloorIdToQueue(floor.id);
      }
    },

    setFloorPropertiesById<T extends keyof Floor>(
      floorId: number,
      property: T,
      value: Floor[T]
    ) {
      const floorIndex = this.getFloorIndexById(floorId);
      if (floorIndex >= 0) {
        this.floors[floorIndex][property] = value;
      }
    },

    setFloorHasElevatorToFalse(floorId: FloorId) {
      this.setFloorPropertiesById(floorId, "hasElevator", false);
    },

    setElevatorArrived(floorId: FloorId) {
      this.setFloorPropertiesById(floorId, "hasElevator", true);
      this.setFloorPropertiesById(floorId, "isWaitingElevator", false);
    },
  },
});
