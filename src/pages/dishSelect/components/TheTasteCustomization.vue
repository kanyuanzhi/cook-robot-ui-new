<template>
  <q-dialog v-model="shown" transition-show="scale" transition-hide="scale">
    <q-card style="width: 540px">
      <q-card-section class="bg-teal-6 text-white q-py-sm">
        <div class="text-h6 text-weight-bold">{{ dish.name }}口味调整</div>
      </q-card-section>
      <q-card-section class="q-pa-none" style="height: 400px">
        <q-tab-panels v-model="taste" animated>
          <q-tab-panel v-for="dish in customDishes" :key="dish.uuid" :name="dish.uuid">
            <div class="text-h6">Mails</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>

        <!--        <q-separator />-->
      </q-card-section>

      <q-card-section class="q-pa-none">
        <q-tabs
          v-model="taste"
          active-bg-color="teal-6"
          active-color="white"
          class="text-teal-6"
          indicator-color="orange"
        >
          <q-tab v-for="taste in tasteOptions" :key="taste.value" :name="taste.value" :label="taste.label"/>
        </q-tabs>
      </q-card-section>

      <q-card-actions class="bg-white text-teal-6 q-pa-none">
        <q-btn-group spread square unelevated class="full-width">
          <q-btn color="teal-6" class="text-weight-bold text-subtitle1" label="取消" style="padding: 8px 8px"
                 v-close-popup/>
          <q-separator vertical/>
          <q-btn color="teal-6" class="text-weight-bold text-subtitle1" label="保存" style="padding: 8px 8px"
                 v-close-popup/>
        </q-btn-group>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import { cloneDeep } from "lodash/lang";

const props = defineProps(["seasoningMap"]);

const shown = ref(false);

const taste = ref("");
const tasteOptions = ref([]);

const dish = ref({});
const customDishes = ref(null);
const show = async (tasteValue, tasteOptionsValue, dishValue, customDishesValue, customDishUUIDToDish) => {
  console.log(tasteValue);
  shown.value = true;
  taste.value = tasteValue;
  tasteOptions.value = cloneDeep(tasteOptionsValue);
  tasteOptions.value.splice(0, 1);
  dish.value = dishValue;
  customDishes.value = customDishesValue;
  console.log(customDishUUIDToDish);

  if (tasteValue in customDishUUIDToDish){
    const steps = customDishUUIDToDish[tasteValue].steps;
    for (let i = 0; i < steps.length; i++) {
      if (["water", "oil", "seasoning"].indexOf(steps[i].instructionType) > -1) {
        console.log(steps[i]);
      }
    }
  }else {
    console.log("原味")
  }


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
