import { computed, ComputedRef } from "vue";
import { Elevator } from "@/helpers/types";
import { appConfig } from "@/app.config";
import { sortDescendingTwoNumbers } from "@/helpers/mathUtils";

export const useElevatorTransition = (elevator: ComputedRef<Elevator>) => {
  const destinationFloor = computed(() => {
    return elevator.value.destinationFloor || -1;
  });

  const currentFloor = computed(() => {
    return elevator.value.currentFloor || -1;
  });

  const transitionTime = computed(() => {
    const [biggerFloor, smallerFloor] = sortDescendingTwoNumbers(
      currentFloor.value,
      destinationFloor.value
    );

    return `${(biggerFloor - smallerFloor) / appConfig.speedCoefficient}s`;
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
