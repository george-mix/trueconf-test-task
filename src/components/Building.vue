<template>
  <div class="building">
    <Shaft
      v-for="elevator in elevators"
      :key="elevator.id"
      :elevator-id="elevator.id"
    />
    <FloorList />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useElevatorStore } from "@/store/elevator";
import Shaft from "./Shaft.vue";
import FloorList from "./FloorList.vue";

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
