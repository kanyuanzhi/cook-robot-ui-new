<template>
  <div>
    <q-dialog v-model="shown" @hide="onHide">
      <q-card style="width: 400px" class="q-mt-md">
        <q-card-section class="bg-teal-6 text-white q-py-sm">
          <div class="text-h6">{{ $t("dishEdit.oilDialog.title") }}</div>
        </q-card-section>
        <q-card-section>
          <NumberSelect ref="numberSelect" :label="$t('dishEdit.oilDialog.weight')"
                        :unit="$t('dishEdit.oilDialog.unit')" :min="1" :max="100" :step="1"
                        :number="weight" @update="(v)=>weight=v"/>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="teal-6">{{ $t("common.cancel") }}</q-btn>
          <q-btn color="teal-6" unelevated @click="onSubmit">{{ $t("common.submit") }}</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { onUnmounted, ref } from "vue";
import NumberSelect from "pages/dishEdit/components/select/NumberSelect.vue";
import { newOilStep } from "pages/dishEdit/components/dialogs/newStep";

const emits = defineEmits(["update", "submit"]);

const shown = ref(false);

const weight = ref(0);

let isUpdate = false;
let stepIndex = 0;

const show = (index = -1) => {
  shown.value = true;
  stepIndex = index;
};

const updateDialogShow = (step, index) => {
  shown.value = true;
  isUpdate = true;
  stepIndex = index;
  weight.value = step.weight;
};

const onSubmit = () => {
  try {
    const newStep = newOilStep(weight.value);
    emits(isUpdate ? "update" : "submit", newStep, stepIndex);
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
  updateDialogShow
});
</script>

<style lang="scss" scoped></style>
