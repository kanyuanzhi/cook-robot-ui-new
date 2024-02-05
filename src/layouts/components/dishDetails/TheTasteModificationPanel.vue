<template>
  <q-tab-panel class="q-px-sm q-py-none" :name="name">
    <q-list dense separator>
      <q-scroll-area
          :thumb-style="thumbStyle"
          style="height: 350px;" :visible="false">
        <q-item class="row no-padding q-mb-sm rounded-borders custom-item"
                v-for="(seasoningStep,index) in seasoningSteps"
                :key="seasoningStep.uuid">
          <div class="col-3 flex flex-center text-subtitle2 text-white bg-teal-6 text-weight-bold">
            {{ $t("dishDetails.tasteModificationPanel.th") }}{{ index + 1 }}{{
              $t("dishDetails.tasteModificationPanel.addSeasoning")
            }}
          </div>
          <q-separator vertical/>
          <template v-if="seasoningStep.instructionType!=='seasoning'">
            <div class="col-9 q-py-sm q-pr-md">
              <TheTasteWeightInput :seasoning-map="seasoningMap" :seasoning="seasoningStep" @update="onUpdate"/>
            </div>
          </template>
          <template v-else>
            <div class="col-9 column q-gutter-y-sm q-py-sm q-pr-md">
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

const props = defineProps(["steps", "name", "seasoningMap"]);

const seasoningSteps = ref([]);

onMounted(() => {
  for (let i = 0; i < props.steps.length; i++) {
    if (["water", "oil", "seasoning"].includes(props.steps[i].instructionType)) {
      seasoningSteps.value.push(props.steps[i]);
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
  opacity: "0.75",
};

</script>

<style lang="scss" scoped>
.q-item__section--main + .q-item__section--main {
  margin-left: 0;
}

.custom-item {
  border: 1px rgba(0, 0, 0, 0.1) solid;
}
</style>
