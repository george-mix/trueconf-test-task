<template>
  <div class="shaft">
    <Elevator />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useFloorStore } from "@/store/floor";
import { appConfig } from "@/app.config";
import Elevator from "./Elevator.vue";

const { getFloorQuantity } = useFloorStore();
const shaftHeight = computed(() => {
  const height = getFloorQuantity * appConfig.floorHeight;
  return `${height}px`;
});
const shaftWidth = `${appConfig.elevatorWidth}px`;
</script>

<style scoped>
.shaft {
  box-sizing: content-box;
  width: v-bind(shaftWidth);
  height: v-bind(shaftHeight);
  border-left: 2px solid var(--complimentary);
  border-right: 2px solid var(--complimentary);
  display: flex;
  flex-direction: column-reverse;
}
</style>
