<template>
  <label class="label">
    <span class="text">{{ floorId }}</span>
    <input
      type="checkbox"
      class="checkbox-old"
      :checked="!!floor?.isWaitingElevator"
      :disabled="!!floor?.isWaitingElevator || !!floor?.hasElevator"
      @change.prevent="callElevator(floorId)"
    />
    <span class="checkbox-custom"></span>
  </label>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useFloorStore } from "@/store/floor";
import { FloorId } from "@/helpers/types";

const props = defineProps<{ floorId: FloorId }>();

const { callElevator, getFloorById } = useFloorStore();

const floor = computed(() => {
  return getFloorById(props.floorId);
});
</script>

<style scoped>
.label {
  cursor: pointer;
}

.checkbox-old {
  display: none;
}

.checkbox-custom {
  position: relative;
  display: block;
  width: 20px;
  height: 20px;
  border: 1px solid var(--text);
  transition: 0.1s;
}

.checkbox-custom::before {
  position: absolute;
  content: "";
  display: block;
  width: 10px;
  height: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid var(--text);
  border-radius: 50%;
  transition: 0.2s;
}

.checkbox-old:checked + .checkbox-custom::before {
  background-color: var(--secondary);
  border: none;
}
.checkbox-old:checked + .checkbox-custom {
  border: 2px solid var(--secondary);
}
</style>
