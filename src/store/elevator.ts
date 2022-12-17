import { defineStore } from "pinia";
import { Elevator, ElevatorId, FloorId } from "@/helpers/types";
import { appConfig } from "@/app.config";
import { useFloorStore } from "./floor";
import { sortDescendingTwoNumbers } from "@/helpers/mathUtils";

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

    getClosestElevator: (state) => (floor: FloorId) => {
      const idleElevators = state.elevators.filter(
        (elevator) => elevator.status === "idle"
      );

      const closestElevators = idleElevators.sort((a, b) => {
        const [biggerNumberFirst, smallerNumberFirst] =
          sortDescendingTwoNumbers(floor, a.currentFloor);
        const firstDistance = biggerNumberFirst - smallerNumberFirst;

        const [biggerNumberSecond, smallerNumberSecond] =
          sortDescendingTwoNumbers(floor, b.currentFloor);
        const secondDistance = biggerNumberSecond - smallerNumberSecond;

        return firstDistance - secondDistance;
      });

      return closestElevators[0];
    },

    getElevatorById: (state) => (id: ElevatorId) => {
      const elevator = state.elevators.find((elevator) => elevator.id === id);
      return elevator || ({} as Elevator);
    },

    getElevatorIndexById: (state) => (id: ElevatorId) => {
      const elevatorIndex = state.elevators.findIndex(
        (elevator) => elevator.id === id
      );
      return elevatorIndex;
    },

    getElevatorQuantityByFloor: (state) => (floorId: FloorId) => {
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
    changeDestinationFloor(destinationFloor: FloorId) {
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

    changeStatusToIdle(elevatorId: ElevatorId) {
      const elevator = this.getElevatorById(elevatorId);
      const elevatorIndex = this.getElevatorIndexById(elevatorId);

      this.elevators[elevatorIndex].currentFloor = elevator.destinationFloor;
      this.elevators[elevatorIndex].status = "idle";
    },

    changePauseFlag(elevatorId: ElevatorId, value: Elevator["isOnPause"]) {
      const elevatorIndex = this.getElevatorIndexById(elevatorId);
      this.elevators[elevatorIndex].isOnPause = value;
    },
  },
});
