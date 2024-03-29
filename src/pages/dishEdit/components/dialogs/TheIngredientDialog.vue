<template>
  <div>
    <q-dialog v-model="shown" @hide="onHide" position="top">
      <q-card style="width: 400px" class="q-mt-md">
        <q-card-section class="bg-teal-6 text-white q-py-sm">
          <div class="text-h6">{{ $t("dishEdit.ingredientDialog.title") }}</div>
        </q-card-section>
        <q-card-section>
          <q-item>
            <q-item-section avatar>{{ $t("dishEdit.ingredientDialog.ingredient") }}</q-item-section>
            <q-item-section>
              <q-input
                  v-model="name"
                  filled
                  dense
                  @blur="onInputBlur($event, 'name')"
                  @focus="onInputFocus($event, 'name')"
              >
                <template v-slot:after>
                  <q-btn round dense flat icon="toc" @click="theIngredientNameSelectionDialog.show()"/>
                </template>
              </q-input>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>{{ $t("dishEdit.ingredientDialog.shape") }}</q-item-section>
            <q-item-section>
              <q-input
                  v-model="shape"
                  filled
                  dense
                  @blur="onInputBlur($event, 'shape')"
                  @focus="onInputFocus($event, 'shape')"
              >
                <template v-slot:after>
                  <q-btn round dense flat icon="toc" @click="theIngredientShapeSelectionDialog.show()"/>
                </template>
              </q-input>
            </q-item-section>
          </q-item>

          <NumberSelect ref="numberSelect" :label="$t('dishEdit.ingredientDialog.weight')"
                        :unit="$t('dishEdit.ingredientDialog.unit')" :min="0" :max="500" :step="5"
                        :number="weight" @update="(v)=>weight=v"/>

          <SlotRadio ref="slotRadio" :slotNumber="slotNumber" :label="$t('dishEdit.ingredientDialog.slot')"
                     :slot-count="4" @update="(v)=>slotNumber=v"/>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn v-close-popup flat color="teal-6">{{ $t("common.cancel") }}</q-btn>
          <q-btn color="teal-6" unelevated @click="onSubmit">{{ $t("common.submit") }}</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
        v-model="shown"
        persistent
        position="bottom"
        no-focus
        no-refocus
        seamless
        full-width
    >
      <CustomKeyboard ref="customKeyboard" @change="onChange" @enter="onSubmit"/>
    </q-dialog>
    <TheIngredientNameSelectionDialog ref="theIngredientNameSelectionDialog" @select="(val)=>name=val"/>
    <TheIngredientShapeSelectionDialog ref="theIngredientShapeSelectionDialog" @select="(val)=>shape=val"/>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CustomKeyboard from "pages/dishEdit/components/CustomKeyboard.vue";
import TheIngredientNameSelectionDialog from "pages/dishEdit/components/dialogs/TheIngredientNameSelectionDialog.vue";
import TheIngredientShapeSelectionDialog
  from "pages/dishEdit/components/dialogs/TheIngredientShapeSelectionDialog.vue";
import SlotRadio from "pages/dishEdit/components/SlotRadio.vue";
import NumberSelect from "pages/dishEdit/components/select/NumberSelect.vue";
import { Notify } from "quasar";
import { newIngredientStep } from "pages/dishEdit/components/dialogs/newStep";

const emits = defineEmits(["update", "submit"]);

const shown = ref(false);

const name = ref("");
const shape = ref("");
const weight = ref(0);
const slotNumber = ref("1");

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
  name.value = step.name;
  shape.value = step.shape;
  weight.value = step.weight;
  slotNumber.value = step.slotNumber;
};

const inputNameToPara = {
  name,
  shape,
};

const customKeyboard = ref(null);
const onInputFocus = (e, inputName) => {
  customKeyboard.value.setInputName(inputName);
  customKeyboard.value.setInput(e.target.value, inputName);
};

const onInputBlur = (e, inputName) => {
};

import * as OpenCC from 'opencc-js';
const converter = OpenCC.Converter({ from: 'cn', to: 'tw' });
const onChange = (input, inputName) => {
  inputNameToPara[inputName].value = converter(input);
};

const theIngredientNameSelectionDialog = ref(null);
const theIngredientShapeSelectionDialog = ref(null);

const onSubmit = () => {
  if (name.value.trim() === "") {
    Notify.create("请添加食材");
    return;
  }
  try {
    const newStep = newIngredientStep(name.value.trim(), shape.value.trim(), weight.value, slotNumber.value);
    emits(isUpdate ? "update" : "submit", newStep, stepIndex);
  } catch (e) {
    return;
  }
  isUpdate = false;
  stepIndex = 0;
  shown.value = false;
};

const onHide = () => {
  name.value = "";
  shape.value = "";
  weight.value = 0;
  slotNumber.value = "1";
};

defineExpose({
  show,
  updateDialogShow,
});
</script>

<style lang="scss" scoped></style>
