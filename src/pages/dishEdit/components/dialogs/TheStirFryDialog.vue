<template>
  <div>
    <q-dialog v-model="shown" persistent @hide="onHide">
      <q-card style="width: 500px" class="q-px-sm q-mt-md">
        <q-card-section>
          <div class="text-h6">添加翻炒</div>
        </q-card-section>

        <GearSlider ref="gearSlider" :gear="gear" label="档位" color="amber-10" :gear-min="0" :gear-max="5"
                    @update="(v)=>{gear=v}"/>

        <DurationSelect ref="durationSelect" :duration="duration" @update="(v)=>{duration=v}"/>

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="">取消</q-btn>
          <q-btn flat color="primary" @click="onSubmit">提交</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import GearSlider from "pages/dishEdit/components/select/GearSlider.vue";
import DurationSelect from "pages/dishEdit/components/select/DurationSelect.vue";

const emits = defineEmits(["update", "submit"]);

const shown = ref(false);

const gear = ref(0);
const duration = ref(0);

const gearSlider = ref(null);
const timeSelect = ref(null);

let isUpdate = false;
let stepIndex = 0;

const show = (step, index) => {
  shown.value = true;
  setTimeout(() => {
    if (step !== undefined) {
      isUpdate = true;
      stepIndex = index;
      gearSlider.value.setGear(step.gear);
      timeSelect.value.setTime(step.time);
    }
  }, 100);
};

const onSubmit = () => {
  try {
    const newStep = {
      name: "翻炒" + gear.value + "档",
      gear: gear.value,
      duration: duration.value,
      key: Date.now(),
      type: "stir_fry"
    };
    if (isUpdate) {
      emits("update", newStep, stepIndex);
    } else {
      emits("submit", newStep);
    }
  } catch (e) {
    return;
  }
  isUpdate = false;
  stepIndex = 0;
  shown.value = false;
};

const onHide = () => {
  gear.value = 0;
  duration.value = 0;
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped></style>
