import { appConfig } from "@/app.config";
import { Elevator, Floor } from "./types";

export const populateElevatorList = () => {
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

export const populateFloorList = (): Floor[] => {
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
