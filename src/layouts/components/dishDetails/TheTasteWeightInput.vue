<template>
  <q-item-section class="col">
    <q-input :input-style="inputStyle" hide-bottom-space readonly v-model="weightValue" dense>
      <template v-slot:before>
        <span class="text-subtitle2 text-center text-teal-6 q-py-sm tex" style="width: 100px">{{ seasoningName }}</span>
      </template>
      <template v-slot:prepend>
        <q-btn round dense flat icon="remove" color="teal-6" size="12px" @click="onWeightMinus"/>
      </template>
      <template v-slot:append>
        <q-btn round dense flat icon="add" color="teal-6" size="12px" @click="onWeightPlus"/>
      </template>
    </q-input>
  </q-item-section>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { Notify } from "quasar";

const props = defineProps(["seasoning", "seasoningMap"]);

const weightValue = ref(props.seasoning.editingWeight);
const seasoningName = ref(props.seasoningMap[props.seasoning.pumpNumber]);

watch(weightValue, () => {
  // eslint-disable-next-line vue/no-mutating-props
  props.seasoning.editingWeight = weightValue.value;
});

const onWeightMinus = () => {
  if (weightValue.value === 0) {
    Notify.create("调料分量不能小于0");
    return;
  }
  weightValue.value--;
};

const onWeightPlus = () => {
  weightValue.value++;
};

const inputStyle = {
  textAlign: "center",
  color: "#009688"
};

</script>

<style lang="scss" scoped>

</style>
