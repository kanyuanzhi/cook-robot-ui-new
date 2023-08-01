<template>
  <q-dialog v-model="shown" transition-show="scale" transition-hide="scale" persistent>
    <q-card style="width: 400px">
      <q-card-section class="bg-teal-6 text-white q-py-md">
        <div class="text-subtitle1 text-weight-bold text-center">{{ dishName }}口味调整（单位：克）</div>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-tab-panels v-model="taste">
          <TheTasteModificationPanel v-for="customTaste in customTastes" :key="customTaste.dish.uuid"
                                     :custom-taste="customTaste" :name="customTaste.dish.uuid"
                                     :seasoning-map="seasoningMap"/>
        </q-tab-panels>
      </q-card-section>

      <q-card-section class="q-pa-none">
        <q-tabs
          v-model="taste"
          active-bg-color="white"
          active-color="teal-6"
          class="text-grey-7"
          indicator-color="teal-6"
          switch-indicator
        >
          <q-tab v-for="customTaste in customTastes" :key="customTaste.dish.uuid" :name="customTaste.dish.uuid"
                 :label="customTaste.label"/>
        </q-tabs>
      </q-card-section>
      <q-card-actions class="bg-white text-teal-6 q-pa-none">
        <q-btn-group spread square unelevated class="full-width">
          <q-btn color="teal-6" class="text-weight-bold text-subtitle1" label="取消" style="padding: 8px 8px"
                 v-close-popup @click="onCancel"/>
          <q-separator vertical/>
          <q-btn color="teal-6" class="text-weight-bold text-subtitle1" label="保存" style="padding: 8px 8px"
                 v-close-popup @click="onConfirm"/>
        </q-btn-group>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import { cloneDeep } from "lodash/lang";
import TheTasteModificationPanel from "pages/dishSelect/components/TheTasteModificationPanel.vue";
import { seasoningFormat } from "pages/dishSelect/components/displayFormat";
import { updateCustomDish } from "src/api/dish";

const props = defineProps(["dishName", "seasoningMap"]);

const shown = ref(false);

const taste = ref("");
const customTastes = ref([]);

const dish = ref({});

const show = async (tasteValue, customTastesValue) => {
  shown.value = true;
  taste.value = tasteValue;
  customTastes.value = customTastesValue;
};
watch(taste, () => {

});

const onCancel = () => {
  for (let i = 0; i < customTastes.value.length; i++) {
    for (let j = 0, stepLen = customTastes.value[i].dish.steps.length; j < stepLen; j++) {
      if (["water", "oil"].includes(customTastes.value[i].dish.steps[j].instructionType)) {
        customTastes.value[i].dish.steps[j].editingWeight = customTastes.value[i].dish.steps[j].weight;
      } else if (customTastes.value[i].dish.steps[j].instructionType === "seasoning") {
        for (let k = 0, kLen = customTastes.value[i].dish.steps[j].seasonings.length; k < kLen; k++) {
          customTastes.value[i].dish.steps[j].seasonings[k].editingWeight = customTastes.value[i].dish.steps[j].seasonings[k].weight;
        }
      }
    }
  }
};

const onConfirm = async () => {
  const uuidToSteps = {}
  for (let i = 0; i < customTastes.value.length; i++) {
    for (let j = 0; j < customTastes.value[i].dish.steps.length; j++) {
      if (["water", "oil"].includes(customTastes.value[i].dish.steps[j].instructionType)) {
        customTastes.value[i].dish.steps[j].weight = customTastes.value[i].dish.steps[j].editingWeight;
        customTastes.value[i].dish.steps[j].instructionName = "添加" + props.seasoningMap[customTastes.value[i].dish.steps[j].pumpNumber] + customTastes.value[i].dish.steps[j].weight + "克";
      } else if (customTastes.value[i].dish.steps[j].instructionType === "seasoning") {
        const stepNames = [];
        for (let k = 0; k < customTastes.value[i].dish.steps[j].seasonings.length; k++) {
          customTastes.value[i].dish.steps[j].seasonings[k].weight = customTastes.value[i].dish.steps[j].seasonings[k].editingWeight;
          stepNames.push(props.seasoningMap[customTastes.value[i].dish.steps[j].seasonings[k].pumpNumber] + customTastes.value[i].dish.steps[j].seasonings[k].weight + "克");
        }
        customTastes.value[i].dish.steps[j].instructionName = "添加" + stepNames.join("，");
      }
    }
    customTastes.value[i]["summary"] = seasoningFormat(customTastes.value[i].dish.steps, props.seasoningMap);
    uuidToSteps[customTastes.value[i].dish.uuid] = customTastes.value[i].dish.steps
  }

  const {data} = await updateCustomDish(uuidToSteps)
  console.log(data)
};

defineExpose({
  show
});
</script>

<style lang="scss" scoped>
//@media (min-width: 600px){
//  .q-dialog__inner--minimized > div {
//    max-width: 600px;
//  }
//}
</style>
