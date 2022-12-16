<template>
  <div class="shaft">
    <Elevator />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useFloorStore } from "@/store/floor";
import { appConfig } from "@/app.config";
import Elevator from "./Elevator.vue";

const { floors } = storeToRefs(useFloorStore());
const shaftHeight = computed(() => {
  const height = floors.value.length * appConfig.floorHeight;
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
