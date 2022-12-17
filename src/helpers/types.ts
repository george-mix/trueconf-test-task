export interface Elevator {
  id: number;
  currentFloor: number;
  status: "idle" | "up" | "down";
  isOnPause: boolean;
  destinationFloor: number;
}

export interface Floor {
  id: number;
  isWaitingElevator: boolean;
  hasElevator: boolean;
}
