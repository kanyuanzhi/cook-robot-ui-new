<template>
  <q-dialog v-model="shown" transition-show="scale" transition-hide="scale">
    <q-card style="width: 600px">
      <q-card-section class="bg-teal-6 text-white q-py-sm">
        <div class="text-h6 text-weight-bold">{{ dish.name }}</div>
      </q-card-section>
      <q-card-section class="text-grey-8">
        <div class="row">
          <div class="col-6">
            <q-img
              :src="'data:image/png;base64,'+dish.image"
              fit="fill"
              :ratio="4/3"
            />
          </div>
          <div class="col-6">
            <div class="q-pl-md">
              <p>
                <span class="text-weight-bold">食材</span><br>
                <span> {{ ingredientSummary }}</span>
              </p>
              <p>
                <span class="text-weight-bold">调料</span><br>
                <span> {{ seasoningSummary }}</span>
              </p>
            </div>

            <!--            <q-item>-->
            <!--              <q-item-section avatar class="text-weight-bold">食材</q-item-section>-->
            <!--              <q-item-section>-->
            <!--               -->
            <!--              </q-item-section>-->
            <!--            </q-item>-->
            <!--            <q-item>-->
            <!--              <q-item-section avatar class="text-weight-bold">调料</q-item-section>-->
            <!--              <q-item-section>-->
            <!--                {{ seasoningSummary }}-->
            <!--              </q-item-section>-->
            <!--            </q-item>-->

          </div>
        </div>

        <q-item style="padding:15px 0 0 0">
          <q-item-section avatar class="text-weight-bold">选择口味</q-item-section>
          <q-item-section class="q-gutter-sm">
            <q-option-group
              :options="tasteOptions"
              type="radio"
              inline
              v-model="taste"
            />
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-actions class="bg-white text-teal-6 q-pa-none">
        <q-btn-group spread square unelevated class="full-width">
          <q-btn color="teal-6" class="text-weight-bold text-subtitle1" label="大厨编辑" style="padding: 8px 8px"
                 v-close-popup @click="openDishEditPage"/>
          <q-separator vertical/>
          <q-btn color="teal-6" class="text-weight-bold text-subtitle1" label="调整口味" style="padding: 8px 8px"
                 v-close-popup/>
          <q-separator vertical/>
          <q-btn color="teal-6" class="text-weight-bold text-subtitle1" label="开始炒制" style="padding: 8px 8px"
                 v-close-popup @click="openRunningControlPage"/>
        </q-btn-group>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import { getCustomDishes, getDish } from "src/api/dish";
import { getSeasonings } from "src/api/seasoning";
import { sum } from "lodash";
import { UseAppStore } from "stores/appStore";
import { useRouter } from "vue-router";
import { UseControllerStore } from "stores/controllerStore";
import { Notify } from "quasar";

const useControllerStore = UseControllerStore();
const useAppStore = UseAppStore();
const router = useRouter();

const dish = ref({});
const customDishes = ref(null);

const shown = ref(false);
const ingredientSummary = ref("");
const seasoningSummary = ref("");

const seasoningMap = ref(null);

const taste = ref("");
const tasteOptions = ref([
  {
    label: "原味",
    value: "",
    color: "teal-6"
  },
  {
    label: "口味1",
    value: "",
    color: "blue"
  },
  {
    label: "口味2",
    value: "",
    color: "red"
  },
  {
    label: "口味3",
    value: "",
    color: "orange"
  }
]);
const customDishUUIDToSteps = {};

const show = async (uuid) => {
  shown.value = true;
  const dishData = await getDish(uuid);
  dish.value = dishData.data.data;
  taste.value = dishData.data.data.uuid;
  tasteOptions.value[0].value = dishData.data.data.uuid;
  customDishUUIDToSteps[dishData.data.data.uuid] = dishData.data.data.steps;

  const customDishesData = await getCustomDishes(uuid);
  customDishes.value = customDishesData.data.data;
  for (let i = 0, len = customDishes.value.length; i < len; i++) {
    tasteOptions.value[i + 1].value = customDishes.value[i].uuid;
    customDishUUIDToSteps[customDishes.value[i].uuid] = customDishes.value[i].steps;
  }

  const seasoningData = await getSeasonings();
  seasoningMap.value = seasoningData.data.data;
  ingredientFormat(dish.value.steps);
  seasoningFormat(dish.value.steps);

  watch(taste, () => {
    ingredientFormat(customDishUUIDToSteps[taste.value]);
    seasoningFormat(customDishUUIDToSteps[taste.value]);
  });
};

const ingredientFormat = (steps) => {
  const ingredientList = [];
  for (let step of steps) {
    if (step.instructionType === "ingredient") {
      ingredientList.push(step.name + step.weight + "克");
    }
  }
  ingredientSummary.value = ingredientList.join("，");
};

const seasoningFormat = (steps) => {
  const seasoningInfo = {};
  for (let pumpNumber in seasoningMap.value) {
    seasoningInfo[pumpNumber] = {
      label: seasoningMap.value[pumpNumber],
      weight: []
    };
  }
  for (let step of steps) {
    if (step.instructionType === "water" || step.instructionType === "oil") {
      seasoningInfo[step.pumpNumber].weight.push(step.weight);
    }
    if (step.instructionType === "seasoning") {
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
  seasoningSummary.value = seasoningList.join("，");
};

const openRunningControlPage = () => {
  dish.value.steps = customDishUUIDToSteps[taste.value];
  if (useControllerStore.isCooking) {
    Notify.create("当前有菜品正在炒制，请稍后");
  } else {
    useAppStore.setRunningDish(dish.value);
  }
  useAppStore.showRunningControl();
};

const openDishEditPage = () => {
  useAppStore.setEditingDish(dish.value);
  router.push("/dishEdit");
};

defineExpose({
  show
});
</script>

<style lang="scss" scoped>

</style>
