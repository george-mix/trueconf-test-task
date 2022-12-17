import { defineStore } from "pinia";
import { Elevator } from "@/helpers/types";
import { appConfig } from "@/app.config";
import { useFloorStore } from "./floor";

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
  getters: {
    getIddleLength: (state) => {
      return state.elevators.filter((elevator) => elevator.status === "idle")
        .length;
    },
    getClosestElevator: (state) => (floor: number) => {
      const idleElevators = state.elevators.filter(
        (elevator) => elevator.status === "idle"
      );
      const closestElevators = idleElevators.sort((a, b) => {
        return a.currentFloor - floor - (b.currentFloor - floor);
      });

      return closestElevators[0];
    },
    getElevatorById: (state) => (id: number) => {
      const test = state.elevators.find((elevator) => elevator.id === id);
      return test;
    },
  },
  actions: {
    changeDestinationFloor(destinationFloor: number) {
      const floorStore = useFloorStore();

      const elevator = this.getClosestElevator(destinationFloor);
      const isDestinationFloorHeigher =
        destinationFloor > elevator.currentFloor;

      elevator.status = isDestinationFloorHeigher ? "up" : "down";
      elevator.destinationFloor = destinationFloor;
      floorStore.setFloorHasElevatorToFalse(elevator.currentFloor);
    },
  },
});
