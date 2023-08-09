<template>
  <q-dialog v-model="shown" position="standard" class="inherit-dialog ">
    <q-card style="width: 520px;height: 200px" class="">
      <q-card-section class="text-center bg-teal-6 q-pa-sm">
        <div class="text-subtitle1 text-white">加热温度</div>
      </q-card-section>
      <q-card-section>
        <div class=" text-center">
          <q-chip class="text-subtitle2 text-weight-bold" :color="colorDisplay" text-color="white">
            <span style="width: 30px">{{ temperature }}</span>℃
          </q-chip>
        </div>
        <q-item class="q-mt-lg">
          <q-item-section>
            <q-slider
              v-model="temperature"
              :min="0"
              :max="220"
              :step="1"
              :color="colorDisplay"
              @change="onTemperatureChange"/>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref } from "vue";
import { UseControllerStore } from "stores/controllerStore";
import { sendCommand } from "layouts/components/command";

const useControllerStore = UseControllerStore();

const shown = ref(false);

const temperature = ref(0);

const show = () => {
  shown.value = true;
  temperature.value = useControllerStore.currentHeatingTemperature;
};

const colorDisplay = computed(() => {
  return getTemperatureColor(temperature.value);
});

const getTemperatureColor = (temperature) => {
  if (temperature <= 35) {
    return "teal-6";
  } else if (temperature <= 100) {
    return "orange-7";
  } else {
    return "red-6";
  }
};

const onTemperatureChange = async (val) => {
  await sendCommand("heat", String(val));
};

defineExpose({
  show
});
</script>

<style lang="scss" scoped>
@import "src/css/custom";
//:deep(.q-dialog__backdrop){
//  background-color: rgba(0, 0, 0, 0) !important;
//}
//
//.q-dialog__backdrop{
//  background-color: rgba(0, 0, 0, 0) !important;
//
//}
</style>
