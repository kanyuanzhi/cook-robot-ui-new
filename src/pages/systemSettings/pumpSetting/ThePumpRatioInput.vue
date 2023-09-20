<template>
  <q-item class="row">
    <q-item-section class="col-2 " :class="[isWarning?'bg-red-6':'bg-teal-6']">
      <q-item-label class="text-white text-subtitle2 text-center">
        <span>{{ "" + seasoning.pump + "号泵" }}</span>
      </q-item-label>
    </q-item-section>
    <q-item-section class="col-3">
      <q-item-label class="text-teal-6 text-subtitle2 text-center">
        <span>{{ seasoning.name }}</span>
      </q-item-label>
    </q-item-section>
    <q-item-section class="col-6">
      <q-input :model-value="seasoning.editingRatio" :input-style="inputStyle" color="teal-6"
               :readonly="!Platform.is.win" dense
               :disable="disable">
        <template v-slot:prepend>
          <q-btn round dense flat icon="remove" color="teal-6" size="12px" @click="onMinus"/>
        </template>
        <template v-slot:append>
          <q-btn round dense flat icon="add" color="teal-6" size="12px" @click="onPlus"/>
        </template>
      </q-input>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { defineProps, ref, watch, defineModel } from "vue";
import { Notify, Platform } from "quasar";

const props = defineProps(["seasoning", "disable", "isWarning"]);

const onMinus = () => {
  if (props.seasoning.editingRatio <= 0) {
    // eslint-disable-next-line vue/no-mutating-props
    props.seasoning.editingRatio = 0;
    Notify.create("比例不能小于0");
    return;
  }
  // eslint-disable-next-line vue/no-mutating-props
  props.seasoning.editingRatio--;
};

const onPlus = () => {
  // eslint-disable-next-line vue/no-mutating-props
  props.seasoning.editingRatio++;
};

const inputStyle = {
  textAlign: "center",
  // fontSize: "14px",
  color: "#009688"
};

</script>

<style lang="scss" scoped>

</style>
