export interface Elevator {
  id: number;
  currentFloor: number;
  status: "idle" | "up" | "down" | "pause";
  destinationFloor: number;
}

export interface Floor {
  id: number;
  isWaitingElevator: boolean;
  hasElevator: boolean;
}
