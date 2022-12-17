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
      isOnPause: false,
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
      const elevator = state.elevators.find((elevator) => elevator.id === id);
      return elevator || ({} as Elevator);
    },

    getElevatorIndexById: (state) => (id: number) => {
      const elevatorIndex = state.elevators.findIndex(
        (elevator) => elevator.id === id
      );
      return elevatorIndex;
    },

    getElevatorQuantityByFloor: (state) => (floorId: number) => {
      const floorQuantity = state.elevators.reduce(
        (acc, elevator) =>
          acc +
          (elevator.currentFloor === floorId && elevator.status === "idle"
            ? 1
            : 0),
        0
      );
      return floorQuantity;
    },
  },
  actions: {
    changeDestinationFloor(destinationFloor: number) {
      const floorStore = useFloorStore();
      const elevator = this.getClosestElevator(destinationFloor);

      if (this.getElevatorQuantityByFloor(elevator.currentFloor) === 1) {
        floorStore.setFloorHasElevatorToFalse(elevator.currentFloor);
      }

      const index = this.getElevatorIndexById(elevator.id);
      const isGoingUp = destinationFloor > elevator.currentFloor;

      this.elevators[index].status = isGoingUp ? "up" : "down";
      this.elevators[index].destinationFloor = destinationFloor;
    },

    changeStatusToIdle(elevatorId: number) {
      const elevator = this.getElevatorById(elevatorId);
      const elevatorIndex = this.getElevatorIndexById(elevatorId);

      this.elevators[elevatorIndex].currentFloor = elevator.destinationFloor;
      this.elevators[elevatorIndex].status = "idle";
    },

    changePauseFlag(elevatorId: number, value: boolean) {
      const elevatorIndex = this.getElevatorIndexById(elevatorId);
      this.elevators[elevatorIndex].isOnPause = value;
    },
  },
});
