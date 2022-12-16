<template>
  <div class="floor-list">
    <Floor v-for="floor in floors" :key="floor.id" :floor-id="floor.id" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useFloorStore } from "@/store/floor";
import Floor from "./Floor.vue";

const { floors } = storeToRefs(useFloorStore());
</script>

<style scoped>
.floor-list {
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
  width: 100%;
}
</style>
