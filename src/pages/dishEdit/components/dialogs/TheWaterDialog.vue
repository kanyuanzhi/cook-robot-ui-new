<template>
  <div>
    <q-dialog v-model="shown" persistent @hide="onHide">
      <q-card style="width: 400px" class="q-px-sm">
        <q-card-section>
          <div class="text-h6">添加水</div>
        </q-card-section>

        <NumberSelect ref="numberSelect" label="分量" unit="克（毫升）" :min="0" :max="220" :step="5"
                      :number="weight" @update="(v)=>weight=v"/>

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
import NumberSelect from "pages/dishEdit/components/select/NumberSelect.vue";

const emits = defineEmits(["update", "submit"]);

const shown = ref(false);

const weight = ref(0);

let isUpdate = false;
let stepIndex = 0;

const show = (step, index) => {
  shown.value = true;
  // setTimeout(() => {
  //   if (step !== undefined) {
  //     isUpdate = true;
  //     stepIndex = index;
  //     name.value = step.name;
  //     shape.value = step.shape;
  //     weightSelect.value.setWeight(step.weight);
  //     slotRadio.value.setSlot(step.slot);
  //     timeSelect.value.setTime(step.time);
  //   }
  // }, 100);
};

const onSubmit = () => {
  try {
    const newStep = {
      name: "水",
      weight: weight.value,
      pumpNumber: 7,
      key: Date.now(),
      type: "water"
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
  weight.value = 0;
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped></style>
