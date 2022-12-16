<template>
  <div class="building">
    <Shaft v-for="elevator in mockData.elevators" :key="elevator.id" />
    <FloorList />
  </div>
</template>

<script setup lang="ts">
import Shaft from "./Shaft.vue";
import FloorList from "./FloorList.vue";
import { mockData } from "@/app.config";
</script>

<style scoped>
.building {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}
</style>
