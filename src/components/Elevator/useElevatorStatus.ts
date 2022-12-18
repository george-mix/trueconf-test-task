import { computed, ComputedRef, onMounted, ref, watch } from "vue";
import { Elevator } from "@/helpers/types";

export const useElevatorStatus = (elevator: ComputedRef<Elevator>) => {
  const isUp = computed(() => elevator.value.status === "up");

  const isDown = computed(() => elevator.value.status === "down");

  const isIdle = computed(() => elevator.value.status === "idle");

  const isMoving = ref(false);

  // bug workaround: transition won't start automatically after page reload
  onMounted(() => {
    if (isUp.value || isDown.value) {
      setTimeout(() => (isMoving.value = true), 0);
    }
  });

  watch([() => isUp.value, () => isDown.value], () => {
    if (isUp.value || isDown.value) {
      setTimeout(() => (isMoving.value = true), 0);
    }
  });

  return {
    isDown,
    isUp,
    isIdle,
    isMoving,
  };
};
