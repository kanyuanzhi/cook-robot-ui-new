<template>
  <q-linear-progress animation-speed="1000" rounded size="25px" :value="progress" color="teal-6">
    <div class="absolute-full flex flex-center">
      <q-badge color="white" text-color="teal-6" :label="progressLabel"/>
    </div>
  </q-linear-progress>
</template>

<script setup>
import { UseAppStore } from "stores/appStore";
import { UseControllerStore } from "stores/controllerStore";
import { toString } from "lodash";
import { computed, ref } from "vue";

const useAppStore = UseAppStore();
const useControllerStore = UseControllerStore();

const progress = computed(() => {
  return (useControllerStore.currentInstructionInfo.index) / (useAppStore.runningDish.steps.length + 2.0);
});

const progressLabel = computed(() => {
  return "" + useControllerStore.currentInstructionInfo.index + "/" + (useAppStore.runningDish.steps.length + 2);
});

</script>

<style lang="scss" scoped>

</style>
