<template>
  <div class="floor">
    <CallElevatorButton :floor-id="floorId" />
  </div>
</template>

<script setup lang="ts">
import { appConfig } from "@/app.config";
import { FloorId } from "@/helpers/types";
import CallElevatorButton from "./CallElevatorButton.vue";

defineProps<{ floorId: FloorId }>();

const floorHeight = `${appConfig.floorHeight}px`;
</script>

<style scoped>
.floor {
  height: v-bind(floorHeight);
  width: 100%;
  position: relative;
}

.floor::before {
  position: absolute;
  display: block;
  width: 1000vw;
  bottom: 0%;
  right: -50%;
  height: 1px;
  content: "";
  background-color: var(--complimentary);
  z-index: -10;
}
</style>
