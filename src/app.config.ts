interface Elevator {
  id: number;
  currentFloor: number;
  status: "idle" | "up" | "down" | "pause";
  destinationFloor: number;
}

interface Floor {
  id: number;
  isWaitingElevator: boolean;
}

interface MockData {
  elevators: Elevator[];
  floors: Floor[];
}

export const mockData: MockData = {
  elevators: [
    { id: 1, currentFloor: 1, status: "idle", destinationFloor: 1 },
    { id: 2, currentFloor: 1, status: "idle", destinationFloor: 1 },
  ],
  floors: [
    { id: 1, isWaitingElevator: false },
    { id: 2, isWaitingElevator: false },
  ],
};

export const appConfig = {
  floorHeight: 100, // px
  elevatorWidth: 100, // px
};
