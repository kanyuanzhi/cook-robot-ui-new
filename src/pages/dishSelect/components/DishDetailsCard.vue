<template>
  <q-dialog v-model="shown" transition-show="scale" transition-hide="scale">
    <q-card class="bg-teal-6 text-white" style="width: 400px">
      <q-card-section>
        <div class="text-h6">{{ dish.name }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <span class="text-subtitle1 text-weight-bold">食材<br></span>
        {{ ingredientIntro }}
      </q-card-section>

      <q-card-section class="q-pt-none">
        <span class="text-subtitle1 text-weight-bold">调料<br></span>
        {{ seasoningIntro }}
      </q-card-section>

      <q-card-actions align="around" class="bg-white text-teal-6">
        <q-btn flat color="teal-6" label="大厨编辑" v-close-popup @click="openDishEditPage"/>
        <q-btn flat color="teal-6" label="调整口味" v-close-popup/>
        <q-btn flat color="teal-6" label="开始炒制" v-close-popup @click="openRunningControlPage"/>
<!--        <q-btn-group spread outline class="full-width">-->

<!--        </q-btn-group>-->

      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getDish } from "src/api/dish";
import { getSeasonings } from "src/api/seasoning";
import { sum } from "lodash";
import { UseAppStore } from "stores/appStore";
import { useRouter } from "vue-router";

const useAppStore = UseAppStore();
const router = useRouter()

const props = defineProps([]);
const dish = ref({});

const shown = ref(false);
const ingredientIntro = ref("");
const seasoningIntro = ref("");

const show = async (uuid) => {
  shown.value = true;
  const dishData = await getDish(uuid);
  dish.value = dishData.data.data;
  const seasoningData = await getSeasonings();
  const seasoningMap = seasoningData.data.data;
  ingredientFormat(dish.value.steps);
  seasoningFormat(dish.value.steps, seasoningMap);
};
const ingredientFormat = (steps) => {
  const ingredientList = [];
  for (let step of steps) {
    if (step.type === "ingredient") {
      ingredientList.push(step.name + step.weight + "克");
    }
  }
  ingredientIntro.value = ingredientList.join("，");
};

const seasoningFormat = (steps, seasoningMap) => {
  const seasoningInfo = {};
  for (let pumpNumber in seasoningMap) {
    seasoningInfo[pumpNumber] = {
      label: seasoningMap[pumpNumber],
      weight: []
    };
  }
  for (let step of steps) {
    if (step.type === "water" || step.type === "oil") {
      seasoningInfo[step.pumpNumber].weight.push(step.weight);
    }
    if (step.type === "seasoning") {
      for (let seasoning of step.seasonings) {
        seasoningInfo[seasoning.pumpNumber].weight.push(seasoning.weight);
      }
    }
  }
  const seasoningList = [];
  for (let pumpNumber in seasoningInfo) {
    if (seasoningInfo[pumpNumber].weight.length !== 0) {
      seasoningList.push(seasoningInfo[pumpNumber].label + sum(seasoningInfo[pumpNumber].weight) + "克");
    }
  }
  seasoningIntro.value = seasoningList.join("，");
};

const openRunningControlPage = ()=>{
  useAppStore.setRunningDish(dish.value)
  useAppStore.showRunningControl()
}

const openDishEditPage = ()=>{
  useAppStore.setEditingDish(dish.value)
  router.push("/dishEdit")
}

defineExpose({
  show
});
</script>

<style lang="scss" scoped>

</style>
