import { defineStore } from "pinia";
import { Elevator } from "@/helpers/types";
import { appConfig } from "@/app.config";

interface ElevatorState {
  elevators: Elevator[];
}

const populateElevatorList = () => {
  const elevatorList: Elevator[] = [];
  for (let i = 0; i < appConfig.shaftQuantity; i++) {
    elevatorList.push({
      id: i + 1,
      currentFloor: 1,
      destinationFloor: 1,
      status: "idle",
    });
  }
  return elevatorList;
};

export const useElevatorStore = defineStore({
  id: "elevator",
  state: (): ElevatorState => ({
    elevators: populateElevatorList(),
  }),
});
