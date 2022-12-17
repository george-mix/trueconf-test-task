import { computed, ComputedRef } from "vue";
import { Elevator } from "@/helpers/types";

export const useElevatorStatus = (elevator: ComputedRef<Elevator>) => {
  const isUp = computed(() => {
    return elevator.value.status === "up";
  });

  const isDown = computed(() => {
    return elevator.value.status === "down";
  });

  const isIdle = computed(() => {
    return elevator.value.status === "idle";
  });

  return {
    isDown,
    isUp,
    isIdle,
  };
};
