import { computed, ComputedRef } from "vue";
import { Elevator } from "@/helpers/types";
import { appConfig } from "@/app.config";

export const useElevatorTransition = (elevator: ComputedRef<Elevator>) => {
  const destinationFloor = computed(() => {
    return elevator.value?.destinationFloor || -1;
  });

  const currentFloor = computed(() => {
    return elevator.value?.currentFloor || -1;
  });

  const transitionTime = computed(() => {
    const [biggerFloor, smallerFloor] =
      currentFloor.value > destinationFloor.value
        ? [currentFloor, destinationFloor]
        : [destinationFloor, currentFloor];

    return `${
      (biggerFloor.value - smallerFloor.value) / appConfig.speedCoefficient
    }s`;
  });

  const transitionDestination = computed(
    () => `-${destinationFloor.value - 1}00%`
  );

  const initialPlace = computed(() => `-${currentFloor.value - 1}00%`);

  return {
    destinationFloor,
    transitionTime,
    transitionDestination,
    initialPlace,
  };
};
