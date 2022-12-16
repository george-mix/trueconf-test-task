import { defineStore } from "pinia";
import { Floor } from "@/helpers/types";
import { appConfig } from "@/app.config";

interface FloorState {
  floors: Floor[];
}

const populateFloorList = (): Floor[] => {
  const floorList = [];
  for (let i = 0; i < appConfig.floorQuantity; i++) {
    floorList.push({
      id: i + 1,
      isWaitingElevator: false,
      hasElevator: true,
    });
  }
  return floorList;
};

export const useFloorStore = defineStore({
  id: "floor",
  state: (): FloorState => ({
    floors: populateFloorList(),
  }),
});
