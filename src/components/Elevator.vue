<template>
  <div class="elevator pause">
    <div class="status">
      <Icon icon="mdi:arrow-top" class="icon" />
      <span class="floor-label">2</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { appConfig } from "@/app.config";
import { Icon } from "@iconify/vue";

const elevatorWidth = `${appConfig.elevatorWidth}px`;
const elevatorHeight = `${appConfig.floorHeight}px`;
const pauseLength = `${appConfig.waitTime}`;
</script>

<style scoped>
.elevator {
  width: v-bind(elevatorWidth);
  height: v-bind(elevatorHeight);
  background-color: var(--primary);
  display: flex;
  justify-content: center;
}

.pause {
  opacity: 1;
  animation: fade 1s v-bind(pauseLength) linear;
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
