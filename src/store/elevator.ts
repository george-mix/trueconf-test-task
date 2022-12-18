import { Ref } from "vue";
import { defineStore } from "pinia";
import { Elevator, ElevatorId, FloorId } from "@/helpers/types";
import { useFloorStore } from "./floor";
import { sortDescendingTwoNumbers } from "@/helpers/mathUtils";
import { useSaveToLS } from "@/helpers/useSaveToLS";
import { populateElevatorList } from "@/helpers/dataHelpers";

interface ElevatorState {
  elevators: Ref<Elevator[]>;
}

export const useElevatorStore = defineStore({
  id: "elevator",
  state: (): ElevatorState => ({
    elevators: useSaveToLS<Elevator[]>("elevators", []),
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
      const elevatorIndex = this.getElevatorIndexById(elevatorId);

      this.elevators[elevatorIndex].status = "idle";
    },

    changeStatusToPause(elevatorId: ElevatorId) {
      const elevator = this.getElevatorById(elevatorId);
      const elevatorIndex = this.getElevatorIndexById(elevatorId);

      this.changePauseFlag(elevatorId, true);
      this.elevators[elevatorIndex].currentFloor = elevator.destinationFloor;
    },

    changePauseFlag(elevatorId: ElevatorId, value: Elevator["isOnPause"]) {
      const elevatorIndex = this.getElevatorIndexById(elevatorId);
      this.elevators[elevatorIndex].isOnPause = value;
    },

    populateElevatorList() {
      this.elevators = populateElevatorList();
    },
  },
});
