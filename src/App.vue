<template>
  <main class="main">
    <Building />
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Building from "./components/Building.vue";
import { useElevatorStore } from "./store/elevator";
import { useFloorStore } from "./store/floor";
import { useQueueStore } from "./store/queue";

// import queue to continue work after page reload
// eslint-disable-next-line
const queueStore = useQueueStore();
const elevatorStore = useElevatorStore();
const floorStore = useFloorStore();

onMounted(() => {
  if (localStorage.getItem("trueconf_elevators") === "[]") {
    elevatorStore.populateElevatorList();
  }
  if (localStorage.getItem("trueconf_floors") === "[]") {
    floorStore.populateFloorList();
  }
});
</script>

<style scoped>
.main {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
