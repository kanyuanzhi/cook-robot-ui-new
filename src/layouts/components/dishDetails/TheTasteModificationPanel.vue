<template>
  <q-tab-panel  :name="name" style="padding-left: 4px;padding-right: 4px;">
    <q-list dense separator>
      <q-scroll-area
        :thumb-style="thumbStyle"
        style="height: 350px;" :visible="false">
        <q-item class="row no-padding q-mb-sm rounded-borders custom-item"
                v-for="(seasoningStep,index) in seasoningSteps"
                :key="seasoningStep.uuid">
          <div class="col-3 flex flex-center text-white bg-teal-6 text-weight-regular" style="font-size: 14px;">
            第{{ index + 1}}次加料
          </div>
          <q-separator vertical/>
          <template v-if="seasoningStep.instructionType!=='seasoning'">
            <div class="col-9 q-py-sm">
              <TheTasteWeightInput :seasoning-map="seasoningMap" :seasoning="seasoningStep" @update="onUpdate"/>
            </div>
          </template>
          <template v-else>
            <div class="col-9 column q-gutter-y-sm q-py-sm ">
              <TheTasteWeightInput v-for="seasoning in seasoningStep.seasonings" :key="seasoning.key"
                                   :seasoning-map="seasoningMap" :seasoning="seasoning" @update="onUpdate"/>
            </div>
          </template>
        </q-item>
      </q-scroll-area>
    </q-list>
  </q-tab-panel>
</template>

<script setup>
import { onMounted, ref } from "vue";
import TheTasteWeightInput from "layouts/components/dishDetails/TheTasteWeightInput.vue";

const props = defineProps(["customTaste", "name", "seasoningMap"]);

const seasoningSteps = ref([]);

onMounted(() => {
  for (let i = 0; i < props.customTaste.dish.steps.length; i++) {
    if (["water", "oil", "seasoning"].includes(props.customTaste.dish.steps[i].instructionType)) {
      seasoningSteps.value.push(props.customTaste.dish.steps[i]);
    }
  }
});

const onUpdate = (weight, seasoning) => {
  seasoning.weight = weight;
};

const thumbStyle = {
  right: "2px",
  borderRadius: "5px",
  backgroundColor: "#009688",
  width: "5px",
  opacity: "0.75"
};

</script>

<style lang="scss" scoped>
.q-item__section--main + .q-item__section--main {
  margin-left: 0;
}

.custom-item {
  border: 1px rgba(0, 0, 0, 0.1) solid;
  white-space: nowrap;
}
</style>
