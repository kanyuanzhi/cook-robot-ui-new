<template>
  <div class="row">
    <TheSeasoningSelect class="col" ref="theSeasoningSelect" :seasoning="seasoning"
                        :seasoning-options="seasoningOptions" @update="onSeasoningUpdate"/>
    <NumberSelect class="col" label="分量" unit="克" :number="seasoning.weight" :min="minWeight" :max="maxWeight"
                  :step="weightStep" @update="onWeightUpdate"/>
    <q-btn size="xs" flat icon="clear" text-color="grey-8" @click="emits('delete')"></q-btn>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import TheSeasoningSelect from "pages/dishEdit/components/select/TheSeasoningSelect.vue";
import NumberSelect from "pages/dishEdit/components/select/NumberSelect.vue";

const props = defineProps(["seasoning", "seasoningOptions"]);
const emits = defineEmits(["delete"]);

onMounted(() => {
  generateWeightSelectInfo(props.seasoning.pumpNumber);
});

const minWeight = ref(1);
const maxWeight = ref(10);
const weightStep = ref(1);

const generateWeightSelectInfo = (pumpNumber) => {
  if ([1, 2, 3, 4, 5, 6].indexOf(pumpNumber) > -1) {
    minWeight.value = 1;
    maxWeight.value = 100;
    weightStep.value = 1;
  } else if ([7, 8].indexOf(pumpNumber) > -1) {
    minWeight.value = 5;
    maxWeight.value = 150;
    weightStep.value = 5;
  } else {
    minWeight.value = 1;
    maxWeight.value = 20;
    weightStep.value = 1;
  }
};

const onSeasoningUpdate = (val) => {
  // eslint-disable-next-line vue/no-mutating-props
  props.seasoning.label = val.label;
  // eslint-disable-next-line vue/no-mutating-props
  props.seasoning.pumpNumber = val.pumpNumber;
  generateWeightSelectInfo(val.pumpNumber);
};

const onWeightUpdate = (val) => {
  // eslint-disable-next-line vue/no-mutating-props
  props.seasoning.weight = val;
};
</script>

<style lang="scss" scoped></style>
