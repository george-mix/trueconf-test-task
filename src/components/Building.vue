<template>
  <div class="building">
    <Shaft v-for="elevator in elevators" :key="elevator.id" />
    <FloorList />
  </div>
</template>

<script setup lang="ts">
import Shaft from "./Shaft.vue";
import FloorList from "./FloorList.vue";
import { useElevatorStore } from "@/store/elevator";
import { storeToRefs } from "pinia";

const { elevators } = storeToRefs(useElevatorStore());
</script>

<style scoped>
.building {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}
</style>
