<template>
  <div
    class="elevator"
    :class="{ move: isUp || isDown, pause: elevator.isOnPause }"
    @transitionend="onArriveToDestination"
    @animationend="onPauseEnd"
  >
    <div v-if="!isIdle" class="status">
      <Icon v-if="isUp" icon="mdi:arrow-top" class="icon" />
      <Icon v-if="isDown" icon="mdi:arrow-down" class="icon" />
      <span class="floor-label">{{ destinationFloor }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Icon } from "@iconify/vue";
import { appConfig } from "@/app.config";
import { useElevatorStore } from "@/store/elevator";
import { useFloorStore } from "@/store/floor";
import { useElevatorTransition } from "./useElevatorTransition";
import { useElevatorStatus } from "./useElevatorStatus";

const props = defineProps<{ elevatorId: number }>();
const elevator = computed(() => getElevatorById(props.elevatorId));

const { getElevatorById, changeStatusToIdle, changePauseFlag } =
  useElevatorStore();
const { setElevatorArrived } = useFloorStore();
const {
  destinationFloor,
  transitionTime,
  initialPlace,
  transitionDestination,
} = useElevatorTransition(elevator);
const { isDown, isUp, isIdle } = useElevatorStatus(elevator);

const elevatorWidth = `${appConfig.elevatorWidth}px`;
const elevatorHeight = `${appConfig.floorHeight}px`;
const pauseLength = `${appConfig.waitTime}`;

const onArriveToDestination = () => {
  setElevatorArrived(destinationFloor.value);
  changePauseFlag(elevator.value.id, true);
};

const onPauseEnd = () => {
  changePauseFlag(elevator.value.id, false);
  changeStatusToIdle(elevator.value.id);
};
</script>

<style scoped>
.elevator {
  width: v-bind(elevatorWidth);
  height: v-bind(elevatorHeight);
  background-color: var(--primary);
  display: flex;
  justify-content: center;
  transition-duration: v-bind(transitionTime);
  transform: translateY(v-bind(initialPlace));
  transition-timing-function: linear;
}

.pause {
  opacity: 1;
  animation: fade 1s v-bind(pauseLength) linear;
}

.move {
  transform: translateY(v-bind(transitionDestination));
}

@keyframes fade {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

.status {
  max-width: 40%;
  min-width: 30%;
  min-height: 20%;
  max-height: 30%;
  display: flex;
  padding: 4%;
  justify-content: center;
  align-items: center;
  background-color: var(--text);
}

.icon {
  width: 100%;
  color: var(--background);
}

.floor-label {
  color: var(--background);
}
</style>
