<template>
  <div class="floor-list">
    <Floor v-for="floor in mockData.floors" :key="floor.id" />
  </div>
</template>

<script setup lang="ts">
import Floor from "./Floor.vue";
import { mockData } from "@/app.config";
</script>

<style scoped>
.floor-list {
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
  width: 100%;
}
</style>
